// Vehicle types
export interface Vehicle {
    id: string;
    year: number;
    make: string;
    model: string;
    lot_location: string;
    check_in_time: string;
    checked_out: boolean;
    fee_paid: number;
}

export interface VehicleCreate {
    year: number;
    make: string;
    model: string;
    lot_location: string;
}

export interface DashboardStats {
    active_vehicles: number;
    total_valeted_today: number;
    revenue_today: number;
}

const API_BASE = 'http://localhost:3006';

// API client functions
export async function getActiveVehicles(): Promise<Vehicle[]> {
    const response = await fetch(`${API_BASE}/vehicles/`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch vehicles');
    return response.json();
}

export async function getVehicle(id: string): Promise<Vehicle> {
    const response = await fetch(`${API_BASE}/vehicles/${id}`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch vehicle');
    return response.json();
}

export async function createVehicle(vehicle: VehicleCreate): Promise<Vehicle> {
    const response = await fetch(`${API_BASE}/vehicles/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicle),
    });
    if (!response.ok) throw new Error('Failed to create vehicle');
    return response.json();
}

export async function checkoutVehicle(id: string, feePaid: number): Promise<Vehicle> {
    const response = await fetch(`${API_BASE}/vehicles/${id}/checkout`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fee_paid: feePaid }),
    });
    if (!response.ok) throw new Error('Failed to checkout vehicle');
    return response.json();
}

export async function getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE}/vehicles/stats/today`, {
        credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    return response.json();
} 