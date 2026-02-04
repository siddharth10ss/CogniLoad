import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ActivityChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="glass-panel p-6 rounded-2xl h-[300px] flex items-center justify-center text-muted">
                No data available for visualization
            </div>
        );
    }

    return (
        <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-text mb-6">Cognitive Load Distribution</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis
                            dataKey="name"
                            stroke="#52525b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#52525b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                            contentStyle={{
                                backgroundColor: '#18181b',
                                borderColor: '#27272a',
                                borderRadius: '8px',
                                color: '#f4f4f5'
                            }}
                        />
                        <Bar dataKey="load" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color || '#3b82f6'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
