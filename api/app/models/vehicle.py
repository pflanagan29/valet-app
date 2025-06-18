from datetime import datetime
from uuid import UUID, uuid4
from pydantic import BaseModel, Field

class Vehicle(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    year: int
    make: str
    model: str
    lot_location: str
    check_in_time: datetime = Field(default_factory=datetime.now)
    checked_out: bool = False
    fee_paid: float = 0.0

class VehicleCreate(BaseModel):
    year: int
    make: str
    model: str
    lot_location: str

class VehicleUpdate(BaseModel):
    fee_paid: float 