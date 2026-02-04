import React, { useState, useEffect } from 'react';
import { usePersistence } from '../hooks/usePersistence';
import clsx from 'clsx';
import { Send, CheckCircle2 } from 'lucide-react';

export function CognitiveOffload() {
    const [entries, setEntries] = usePersistence('offload_journal', []);
    const [note, setNote] = useState('');
    const [mood, setMood] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Check if entered for today
    const todayKey = new Date().toISOString().split('T')[0];
    const todaysEntry = entries.find(e => e.date === todayKey);

    useEffect(() => {
        if (todaysEntry) {
            setIsSubmitted(true);
        }
    }, [todaysEntry]);

    const handleSave = () => {
        if (!note.trim()) return;

        const newEntry = {
            id: Date.now(),
            date: todayKey,
            note: note.trim(),
            mood: mood,
            timestamp: Date.now()
        };

        setEntries([newEntry, ...entries]);
        setIsSubmitted(true);
    };

    const MOODS = [
        { label: 'Calm', color: 'teal-soft' },
        { label: 'Heavy', color: 'gray-300' },
        { label: 'Focused', color: 'lavender-soft' },
        { label: 'Drained', color: 'coral-soft' },
        { label: 'Clear', color: 'blue-100' }
    ];

    // If already submitted for today, show closure state
    if (isSubmitted) {
        return (
            <div className="glass-panel w-full py-8 text-center animate-fade-in transition-all duration-700">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-soft/20 text-teal-dark mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-text mb-2 tracking-tight">
                    You don't need to carry this right now.
                </h3>
                <p className="text-muted/60 text-sm font-medium">
                    Your thoughts are safe. Come back tomorrow fresh.
                </p>
            </div>
        );
    }

    return (
        <div className="glass-panel w-full p-8 transition-all duration-500">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-text mb-1 tracking-tight">
                    Cognitive Offload
                </h3>
                <p className="text-muted/60 text-sm font-medium">
                    Is there anything cluttering your mind right now?
                </p>
            </div>

            <div className="space-y-6">
                {/* Input Area */}
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    maxLength={280}
                    placeholder="Write a thought to release it..."
                    className="w-full bg-transparent border-none resize-none text-center text-lg text-text placeholder:text-muted/30 focus:ring-0 p-4 transition-all duration-300 min-h-[80px]"
                />

                {/* Mood Selection */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    {MOODS.map((m) => (
                        <button
                            key={m.label}
                            onClick={() => setMood(m.label)}
                            className={clsx(
                                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                                mood === m.label
                                    ? `bg-${m.color} text-text shadow-sm scale-105`
                                    : "bg-gray-50 text-muted/60 hover:bg-gray-100"
                            )}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>

                {/* Submit Logic */}
                <div className={clsx(
                    "flex justify-center transition-all duration-500 overflow-hidden",
                    note ? "opacity-100 max-h-20 pt-2" : "opacity-0 max-h-0"
                )}>
                    <button
                        onClick={handleSave}
                        className="btn-primary flex items-center gap-2 group"
                    >
                        <span>Release This Thought</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="text-center">
                    <span className={clsx(
                        "text-xs font-medium transition-colors duration-300",
                        note.length > 250 ? "text-coral-dark" : "text-muted/30"
                    )}>
                        {note.length}/280
                    </span>
                </div>
            </div>
        </div>
    );
}
