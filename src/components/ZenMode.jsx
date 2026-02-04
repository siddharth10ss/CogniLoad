import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, CheckCircle2, Music, Maximize2, Volume2 } from 'lucide-react';
import clsx from 'clsx';

export default function ZenMode({ task, onExit, onComplete }) {
    const [isActive, setIsActive] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef(null);
    const gainNodeRef = useRef(null);

    // Initialize Audio Context on first user interaction
    const initAudio = () => {
        if (!audioContextRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContextRef.current = new AudioContext();

            // Create Brown Noise
            const bufferSize = 4096;
            const brownNoise = (() => {
                let lastOut = 0;
                const node = audioContextRef.current.createScriptProcessor(bufferSize, 1, 1);
                node.onaudioprocess = (e) => {
                    const output = e.outputBuffer.getChannelData(0);
                    for (let i = 0; i < bufferSize; i++) {
                        const white = Math.random() * 2 - 1;
                        output[i] = (lastOut + (0.02 * white)) / 1.02;
                        lastOut = output[i];
                        output[i] *= 3.5; // Gain compensation
                    }
                };
                return node;
            })();

            gainNodeRef.current = audioContextRef.current.createGain();
            gainNodeRef.current.gain.value = 0; // Start muted

            brownNoise.connect(gainNodeRef.current);
            gainNodeRef.current.connect(audioContextRef.current.destination);
        }
    };

    // Handle Play/Pause Audio with Fade
    useEffect(() => {
        if (isPlaying) {
            initAudio();
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }
            // Fade In
            gainNodeRef.current.gain.cancelScheduledValues(audioContextRef.current.currentTime);
            gainNodeRef.current.gain.linearRampToValueAtTime(0.6, audioContextRef.current.currentTime + 2);
        } else {
            if (gainNodeRef.current) {
                // Fade Out
                gainNodeRef.current.gain.cancelScheduledValues(audioContextRef.current.currentTime);
                gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 2);
            }
        }

        return () => {
            if (gainNodeRef.current && isPlaying) {
                gainNodeRef.current.gain.value = 0;
            }
        };
    }, [isPlaying]);

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    // Timer logic
    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setElapsed(prev => prev + 1);
            }, 1000);

            // Auto-start ambient sound if focusing
            if (!isPlaying && !audioContextRef.current) {
                // Optional: Auto-play could go here if policy allowed
            }
        }
        return () => clearInterval(interval);
    }, [isActive]);

    // Format time MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleTimer = () => setIsActive(!isActive);
    const toggleSound = () => setIsPlaying(!isPlaying);

    return (
        <div className="fixed inset-0 z-[100] bg-[#FFFBF5] dark:bg-[#1c1c1e] flex flex-col items-center justify-center animate-fade-in p-6 overflow-hidden">

            {/* Ambient Background - Relaxing Pulse */}
            <div className={clsx(
                "absolute inset-0 transition-opacity duration-[3000ms] pointer-events-none",
                isPlaying ? "opacity-40" : "opacity-0"
            )}>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-soft/10 via-lavender-soft/10 to-coral-soft/10 animate-pulse-slow" />
            </div>

            <div className="relative z-10 w-full max-w-4xl text-center space-y-16">

                {/* Header */}
                <div className="absolute top-0 right-0 left-0 -mt-24 md:-mt-32 flex justify-between items-center px-4 md:px-0">
                    <div className="flex items-center gap-3 text-muted/60 text-sm font-semibold uppercase tracking-widest bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
                        <Maximize2 className="w-4 h-4" /> Zen Focus
                    </div>
                    <button
                        onClick={onExit}
                        className="p-4 bg-white hover:bg-red-50 text-muted hover:text-red-500 rounded-full transition-all duration-400 ease-out-cubic shadow-md hover:shadow-lg hover:rotate-90 hover:scale-105"
                        aria-label="Exit Zen Mode"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Main Content */}
                <div className="space-y-8 animate-fade-in delay-100">
                    <div className="inline-block px-6 py-2 rounded-full bg-teal-soft/10 text-teal-dark font-bold text-sm tracking-wide uppercase mb-2 shadow-sm">
                        Now Focusing On
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-text leading-tight tracking-tight font-sans drop-shadow-sm">
                        {task.title}
                    </h1>
                </div>

                {/* Timer Display - Massive & Premium */}
                <div className="font-mono text-[8rem] md:text-[10rem] font-bold text-text/80 tracking-tighter tabular-nums leading-none select-none transition-all duration-1000">
                    {formatTime(elapsed)}
                </div>

                {/* Action Controls - Premium Touch Targets */}
                <div className="flex items-center justify-center gap-12 pt-8">

                    {/* Ambient Sound Toggle */}
                    <button
                        onClick={toggleSound}
                        className={clsx(
                            "p-8 rounded-full transition-all duration-400 ease-out-cubic shadow-lg hover:shadow-xl hover:scale-105 group relative",
                            isPlaying ? "bg-lavender-soft text-lavender-dark ring-4 ring-lavender-soft/30" : "bg-white text-muted hover:bg-gray-50"
                        )}
                        title={isPlaying ? "Mute Brown Noise" : "Play Brown Noise"}
                    >
                        {isPlaying ? (
                            <Volume2 className="w-8 h-8 animate-pulse" />
                        ) : (
                            <Music className="w-8 h-8 transition-transform group-hover:scale-110" />
                        )}
                        {isPlaying && (
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-lavender-dark whitespace-nowrap">
                                Brown Noise Active
                            </span>
                        )}
                    </button>

                    {/* Play/Pause - Hero Button */}
                    <button
                        onClick={toggleTimer}
                        className={clsx(
                            "flex items-center justify-center w-32 h-32 rounded-[2.5rem] shadow-2xl transition-all duration-400 ease-out-cubic active:scale-95 hover:shadow-3xl hover:-translate-y-1 relative overflow-hidden",
                            isActive ? "bg-white border-4 border-teal-soft text-text" : "bg-text text-white"
                        )}
                    >
                        {isActive ? (
                            <Pause className="w-12 h-12" />
                        ) : (
                            <>
                                <Play className="w-14 h-14 ml-2" />
                                <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
                            </>
                        )}
                    </button>

                    {/* Complete Button */}
                    <button
                        onClick={() => onComplete(task.id)}
                        className="p-8 bg-white hover:bg-teal-soft/10 text-teal-dark rounded-full transition-all duration-400 ease-out-cubic shadow-lg hover:shadow-xl hover:scale-105 group border-2 border-transparent hover:border-teal-soft/20"
                        title="Mark Complete"
                    >
                        <CheckCircle2 className="w-8 h-8 group-hover:text-teal-600 transition-transform group-hover:scale-110" />
                    </button>
                </div>

                <p className={clsx(
                    "text-muted/60 text-sm font-medium pt-8 transition-opacity duration-1000",
                    isActive ? "animate-pulse opacity-100" : "opacity-0"
                )}>
                    Stay with the breath. Stay with the task.
                </p>
            </div>
        </div>
    );
}
