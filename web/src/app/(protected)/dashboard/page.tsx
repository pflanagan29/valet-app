'use client';

import { useEffect, useState } from 'react';
import { getDashboardStats, DashboardStats } from '@/app/api/vehicles';

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const data = await getDashboardStats();
                setStats(data);
                setError(null);
            } catch (err) {
                setError('Failed to load dashboard stats');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) return <div>Loading dashboard stats...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!stats) return null;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Active Vehicles Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-700">Active Vehicles</h2>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                        {stats.active_vehicles}
                    </p>
                </div>

                {/* Vehicles Valeted Today Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-700">Valeted Today</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                        {stats.total_valeted_today}
                    </p>
                </div>

                {/* Revenue Today Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-700">Revenue Today</h2>
                    <p className="text-3xl font-bold text-purple-600 mt-2">
                        ${stats.revenue_today.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
} 