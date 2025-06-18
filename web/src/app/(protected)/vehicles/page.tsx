'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getActiveVehicles, Vehicle } from '@/app/api/vehicles';

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchVehicles() {
            try {
                const data = await getActiveVehicles();
                setVehicles(data);
                setError(null);
            } catch (err) {
                setError('Failed to load vehicles');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchVehicles();
    }, []);

    if (loading) return <div>Loading vehicles...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Active Vehicles</h1>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Add Vehicle
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicles.map((vehicle) => (
                    <Link 
                        key={vehicle.id} 
                        href={`/vehicles/${vehicle.id}`}
                        className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Location: {vehicle.lot_location}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Checked in: {new Date(vehicle.check_in_time).toLocaleString()}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {vehicles.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    No active vehicles found
                </div>
            )}
        </div>
    );
} 