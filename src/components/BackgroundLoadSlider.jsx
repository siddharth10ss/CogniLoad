import React from 'react';
import { usePersistence } from '../hooks/usePersistence';

export function BackgroundLoadSlider({ onChange }) {
    const [backgroundLoad, setBackgroundLoad] = usePersistence('background_load_modifier', 0);

    const handleChange = (value) => {
        setBackgroundLoad(value);
        if (onChange) onChange(value);
    };

    const options = [
        { label: 'Low', value: 0 },
        { label: 'Medium', value: 50 },
        { label: 'High', value: 100 }
    ];

    return (
        <div className="glass-panel p-6 rounded-[2rem] bg-white/50">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-sm font-bold text-text uppercase tracking-widest">Background stress</h3>
                    <p className="text-xs text-muted mt-1">Exam week, poor sleep, etc.</p>
                </div>
            </div>

            <div className="flex gap-2">
                {options.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => handleChange(value)}
                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 ${backgroundLoad === value
                                ? 'bg-lavender-soft text-lavender-dark shadow-md scale-105'
                                : 'bg-gray-100 text-muted hover:bg-gray-200'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
