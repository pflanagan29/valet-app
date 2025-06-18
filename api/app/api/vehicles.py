from datetime import datetime
from typing import List
from uuid import UUID
from fastapi import APIRouter, HTTPException
from ..models.vehicle import Vehicle, VehicleCreate, VehicleUpdate

router = APIRouter(prefix="/vehicles", tags=["vehicles"])

# In-memory storage
vehicles: List[Vehicle] = []

@router.get("/", response_model=List[Vehicle])
async def get_active_vehicles():
    """Return all active (not checked out) vehicles"""
    return [v for v in vehicles if not v.checked_out]

@router.get("/{vehicle_id}", response_model=Vehicle)
async def get_vehicle(vehicle_id: UUID):
    """Return a single vehicle by ID"""
    for vehicle in vehicles:
        if vehicle.id == vehicle_id:
            return vehicle
    raise HTTPException(status_code=404, detail="Vehicle not found")

@router.post("/", response_model=Vehicle)
async def create_vehicle(vehicle: VehicleCreate):
    """Add a new vehicle"""
    new_vehicle = Vehicle(
        year=vehicle.year,
        make=vehicle.make,
        model=vehicle.model,
        lot_location=vehicle.lot_location
    )
    vehicles.append(new_vehicle)
    return new_vehicle

@router.patch("/{vehicle_id}/checkout", response_model=Vehicle)
async def checkout_vehicle(vehicle_id: UUID, update: VehicleUpdate):
    """Mark vehicle as checked out and set fee paid"""
    for vehicle in vehicles:
        if vehicle.id == vehicle_id:
            if vehicle.checked_out:
                raise HTTPException(status_code=400, detail="Vehicle already checked out")
            vehicle.checked_out = True
            vehicle.fee_paid = update.fee_paid
            return vehicle
    raise HTTPException(status_code=404, detail="Vehicle not found")

@router.get("/stats/today", response_model=dict)
async def get_today_stats():
    """Get statistics for today's operations"""
    today = datetime.now().date()
    active_count = len([v for v in vehicles if not v.checked_out])
    checked_out_today = len([
        v for v in vehicles 
        if v.checked_out and v.check_in_time.date() == today
    ])
    revenue_today = sum([
        v.fee_paid for v in vehicles 
        if v.checked_out and v.check_in_time.date() == today
    ])
    
    return {
        "active_vehicles": active_count,
        "total_valeted_today": checked_out_today,
        "revenue_today": revenue_today
    } 