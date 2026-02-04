import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Brain } from 'lucide-react';

export function BrainAvatar({ load, status = 'neutral', lastInteraction }) {
    const [isSettled, setIsSettled] = useState(true);

    // Settling behavior: after 3 seconds of no interaction, avatar calms down
    useEffect(() => {
        if (lastInteraction) {
            setIsSettled(false);
            const timer = setTimeout(() => setIsSettled(true), 3000);
            return () => clearTimeout(timer);
        }
    }, [lastInteraction]);

    // Determine emotive state based on load
    const getState = () => {
        if (load > 200) return 'overload';
        if (load > 100) return 'focus';
        return 'zen';
    };

    const currentState = getState();

    const getContainerStyles = () => {
        const baseAnimation = isSettled ? 'animate-float-slow' : '';

        switch (currentState) {
            case 'zen':
                return `bg-teal-soft/20 shadow-[0_0_30px_rgba(166,227,233,0.4)] ${baseAnimation}`;
            case 'focus':
                return `bg-lavender-soft/30 shadow-[0_0_40px_rgba(227,223,253,0.5)] ${isSettled ? baseAnimation : 'animate-pulse-slow'}`;
            case 'overload':
                return `bg-coral-soft/30 shadow-[0_0_50px_rgba(255,211,182,0.6)] ${isSettled ? baseAnimation : 'animate-shake'} border-2 border-coral-dark/20`;
            default:
                return 'bg-gray-100';
        }
    };

    const getIconStyles = () => {
        switch (currentState) {
            case 'zen': return 'text-teal-dark';
            case 'focus': return 'text-lavender-dark';
            case 'overload': return 'text-coral-dark';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="relative group cursor-help transition-all duration-500">
            {/* Avatar Container */}
            <div className={clsx(
                "w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-500 backdrop-blur-sm",
                getContainerStyles()
            )}>
                <Brain
                    className={clsx("w-10 h-10 md:w-12 md:h-12 transition-colors duration-500", getIconStyles())}
                    strokeWidth={1.5}
                />

                {/* Face Expressions (CSS Shapes) - Adds the "Tamagotchi" feel */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {currentState === 'zen' && <div className="text-2xl">😌</div>}
                    {currentState === 'focus' && <div className="text-2xl">🧐</div>}
                    {currentState === 'overload' && <div className="text-2xl">😵</div>}
                </div>
            </div>

            {/* Status Tooltip */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                <span className={clsx(
                    "px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md",
                    currentState === 'zen' ? "bg-teal-soft/90 text-teal-dark" :
                        currentState === 'focus' ? "bg-lavender-soft/90 text-lavender-dark" :
                            "bg-coral-soft/90 text-coral-dark"
                )}>
                    {currentState === 'zen' ? "Zen State" : currentState === 'focus' ? "Deep Focus" : "Cognitive Overload!"}
                </span>
            </div>
        </div>
    );
}
