import React from 'react';
import { Plus } from 'lucide-react';

export function EmptyState({ type, onAddTask }) {
    const states = {
        'no-tasks': {
            emoji: '🌤️',
            state: 'Clear space',
            subtitle: 'Nothing is weighing on your mind right now.',
            showButton: true,
            buttonText: 'Add something you\'re carrying'
        },
        'light-day': {
            emoji: '🌱',
            state: 'Light & open',
            subtitle: 'Today leaves room to breathe.',
            insight: 'Nothing urgent needs attention today.',
            showButton: false
        },
        'all-done': {
            emoji: '🕊️',
            state: 'Unburdened',
            subtitle: 'There\'s nothing left to hold right now.',
            closure: 'You don\'t need to plan anything else.',
            showButton: false
        }
    };

    const config = states[type] || states['no-tasks'];

    return (
        <div className="space-y-8 py-12">
            {/* Cognitive State Card - Empty Variant */}
            <div className="w-full p-12 rounded-[2rem] text-center transition-all duration-500 border-2 bg-cream/30 border-gray-200/20">
                <div className="text-6xl mb-6 animate-float-slow">{config.emoji}</div>
                <h2 className="text-4xl font-bold text-text/80 mb-3 tracking-tight font-sans">
                    {config.state}
                </h2>
                <p className="text-muted/60 text-base font-medium max-w-md mx-auto">
                    {config.subtitle}
                </p>
            </div>

            {/* Chart Placeholder (only for no-tasks) */}
            {type === 'no-tasks' && (
                <div className="glass-panel p-8 rounded-[2rem] text-center">
                    <div className="h-48 flex items-center justify-center relative">
                        <svg className="w-full h-full opacity-10" viewBox="0 0 400 100" preserveAspectRatio="none">
                            <path
                                d="M 0,50 Q 100,30 200,50 T 400,50"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                className="text-muted"
                            />
                        </svg>
                    </div>
                    <p className="text-xs text-muted/40 mt-4 font-medium">
                        Your cognitive landscape will appear here.
                    </p>
                </div>
            )}

            {/* Insight (light-day) */}
            {config.insight && (
                <div className="text-center">
                    <p className="text-sm text-muted/50 font-medium">
                        {config.insight}
                    </p>
                </div>
            )}

            {/* Closure Message (all-done) */}
            {config.closure && (
                <div className="text-center py-4">
                    <p className="text-base text-muted/60 font-medium">
                        {config.closure}
                    </p>
                </div>
            )}

            {/* Primary Action (no-tasks only) */}
            {config.showButton && (
                <div className="text-center pt-4">
                    <button
                        onClick={onAddTask}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-text rounded-full font-medium text-sm shadow-md transition-all duration-200 hover:scale-105 border border-gray-200"
                    >
                        <Plus className="w-4 h-4" />
                        {config.buttonText}
                    </button>
                </div>
            )}
        </div>
    );
}
