import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from 'recharts';

export default function DailyLoadChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="glass-panel p-6 rounded-2xl h-[300px] flex items-center justify-center text-muted">
                Add tasks with deadlines to see daily forecast
            </div>
        );
    }

    // Define thresholds
    const THRESHOLDS = {
        high: 600,
        medium: 300
    };

    return (
        <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text">Daily Load Forecast</h3>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-muted">Healthy (&lt;300)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span className="text-muted">Moderate (300-600)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-muted">Overload (&gt;600)</span>
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8ba88e" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#8ba88e" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} opacity={0.1} />
                        <XAxis
                            dataKey="date"
                            stroke="#a3a3a3"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        />
                        <YAxis
                            stroke="#a3a3a3"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                borderColor: '#f0f0f0',
                                borderRadius: '16px',
                                color: '#4a4a4a',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                            }}
                            labelFormatter={(date) => new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        />

                        {/* Threshold Lines - Very subtle now */}
                        <ReferenceLine y={THRESHOLDS.medium} stroke="#eab308" strokeDasharray="3 3" opacity={0.15} />
                        <ReferenceLine y={THRESHOLDS.high} stroke="#ef4444" strokeDasharray="3 3" opacity={0.1} />

                        <Area
                            type="monotone"
                            dataKey="load"
                            stroke="#8ba88e"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorLoad)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
