import React from 'react';
import clsx from 'clsx';

export function CognitiveStateCard({ totalLoad, taskCount, emptyStateType, isHero = false }) {
    // Handle empty states first
    if (emptyStateType) {
        const emptyStates = {
            'no-tasks': {
                state: "Clear space",
                emoji: "🌤️",
                color: "gray-100",
                context: "Nothing is weighing on your mind right now."
            },
            'light-day': {
                state: "Light & open",
                emoji: "🌱",
                color: "teal-soft",
                context: "Today leaves room to breathe."
            },
            'all-done': {
                state: "Unburdened",
                emoji: "🕊️",
                color: "lavender-soft",
                context: "There's nothing left to hold right now."
            }
        };

        const { state, emoji, color, context } = emptyStates[emptyStateType] || emptyStates['no-tasks'];

        return (
            <div className={`w-full ${isHero ? 'p-16' : 'p-12'} rounded-[2rem] text-center transition-all duration-500 border-2 bg-${color}/10 border-${color}/20`}>
                <div className={`${isHero ? 'text-7xl' : 'text-6xl'} mb-6 animate-float-slow`}>{emoji}</div>
                <h2 className={`${isHero ? 'text-5xl' : 'text-4xl'} font-bold text-text/80 mb-3 tracking-tight font-sans`}>
                    {state}
                </h2>
                <p className={`text-muted/60 ${isHero ? 'text-lg' : 'text-base'} font-medium`}>
                    {context}
                </p>
            </div>
        );
    }

    // Language-first state mapping with density vs fragmentation distinction
    const getCognitiveState = () => {
        if (totalLoad < 100) {
            return {
                state: "Light & steady",
                emoji: "🌱",
                color: "teal-soft",
                context: `${taskCount} ${taskCount === 1 ? 'task' : 'tasks'}, well-distributed`
            };
        }

        if (totalLoad < 200) {
            return {
                state: "Balanced outlook",
                emoji: "⚡",
                color: "lavender-soft",
                context: "Productive momentum"
            };
        }

        if (totalLoad < 300) {
            return {
                state: taskCount > 5 ? "Many things asking for attention" : "Mentally dense",
                emoji: "🧠",
                color: "coral-soft",
                context: taskCount > 5 ? "Several priorities need care" : "Deep work ahead"
            };
        }

        return {
            state: "Significant, but you can handle this",
            emoji: "🔥",
            color: "coral-dark",
            context: "High cognitive pressure"
        };
    };

    const cognitiveState = getCognitiveState();

    return (
        <div className={clsx(
            'w-full rounded-[2rem] text-center transition-all duration-500 border-2',
            isHero ? 'p-16' : 'p-8',
            `bg-${cognitiveState.color}/10 border-${cognitiveState.color}/20`
        )}>
            <div className={clsx(
                'mb-6 animate-float-slow',
                isHero ? 'text-7xl' : 'text-5xl'
            )}>
                {cognitiveState.emoji}
            </div>
            <h2 className={clsx(
                'font-bold text-text mb-3 tracking-tight font-sans',
                isHero ? 'text-5xl' : 'text-3xl'
            )}>
                {cognitiveState.state}
            </h2>
            <p className={clsx(
                'text-muted font-medium',
                isHero ? 'text-lg' : 'text-sm'
            )}>
                {cognitiveState.context}
            </p>
        </div>
    );
}
