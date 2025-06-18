'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getVehicle, checkoutVehicle, Vehicle } from '@/app/api/vehicles';

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [checkoutFee, setCheckoutFee] = useState<string>('');
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    useEffect(() => {
        async function fetchVehicle() {
            try {
                const data = await getVehicle(params.id);
                setVehicle(data);
                setError(null);
            } catch (err) {
                setError('Failed to load vehicle details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchVehicle();
    }, [params.id]);

    const handleCheckout = async () => {
        if (!vehicle || !checkoutFee) return;
        
        try {
            setIsCheckingOut(true);
            const fee = parseFloat(checkoutFee);
            if (isNaN(fee)) throw new Error('Invalid fee amount');
            
            await checkoutVehicle(vehicle.id, fee);
            router.push('/vehicles');
        } catch (err) {
            setError('Failed to checkout vehicle');
            console.error(err);
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (loading) return <div>Loading vehicle details...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!vehicle) return null;

    return (
        <div className="p-6">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </h1>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="font-semibold">Location:</label>
                            <p>{vehicle.lot_location}</p>
                        </div>
                        
                        <div>
                            <label className="font-semibold">Check-in Time:</label>
                            <p>{new Date(vehicle.check_in_time).toLocaleString()}</p>
                        </div>

                        {!vehicle.checked_out && (
                            <div className="mt-6 pt-6 border-t">
                                <h2 className="text-lg font-semibold mb-4">Checkout Vehicle</h2>
                                <div className="flex gap-4 items-end">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fee Amount ($)
                                        </label>
                                        <input
                                            type="number"
                                            value={checkoutFee}
                                            onChange={(e) => setCheckoutFee(e.target.value)}
                                            placeholder="Enter fee amount"
                                            className="w-full px-3 py-2 border rounded-md"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        disabled={isCheckingOut || !checkoutFee}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                                    >
                                        {isCheckingOut ? 'Processing...' : 'Complete Checkout'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {vehicle.checked_out && (
                            <div className="mt-6 pt-6 border-t">
                                <div className="bg-green-50 text-green-700 p-4 rounded-md">
                                    <p className="font-semibold">Vehicle Checked Out</p>
                                    <p className="mt-1">Fee Paid: ${vehicle.fee_paid.toFixed(2)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 