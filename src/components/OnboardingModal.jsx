import React, { useState, useEffect } from 'react';
import { X, Brain, Check } from 'lucide-react';

export function OnboardingModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem('cogniload_welcomed');
        if (!hasSeenOnboarding) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('cogniload_welcomed', 'true');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="glass-panel w-full max-w-md p-6 rounded-2xl shadow-2xl relative border-primary/20">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-muted hover:text-text transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center space-y-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-2">
                        <Brain className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-text">Welcome to CogniLoad</h2>
                    <p className="text-muted text-sm">
                        Visualizing your mental bandwidth so you can study smarter, not harder.
                    </p>
                </div>

                <div className="space-y-4 text-left mb-8">
                    <div className="flex gap-3">
                        <div className="mt-1 bg-blue-500/20 p-1 rounded h-fit"><Check className="w-3 h-3 text-blue-400" /></div>
                        <div>
                            <h4 className="font-semibold text-text text-sm">Add Your Tasks</h4>
                            <p className="text-xs text-muted">Input duration & mental effort (1-5 scale).</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="mt-1 bg-amber-500/20 p-1 rounded h-fit"><Check className="w-3 h-3 text-amber-400" /></div>
                        <div>
                            <h4 className="font-semibold text-text text-sm">Check the Forecast</h4>
                            <p className="text-xs text-muted">Green is safe. Red is overload (&gt;600 units).</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="mt-1 bg-emerald-500/20 p-1 rounded h-fit"><Check className="w-3 h-3 text-emerald-400" /></div>
                        <div>
                            <h4 className="font-semibold text-text text-sm">Optimize</h4>
                            <p className="text-xs text-muted">Use smart insights to reschedule effectively.</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleClose}
                    className="btn-primary w-full py-3 text-base"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}
