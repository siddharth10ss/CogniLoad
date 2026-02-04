import React, { useMemo } from 'react';

export function BackgroundWaves({ totalLoad = 0 }) {
    // Calculate animation speeds based on cognitive load
    const waveConfig = useMemo(() => {
        if (totalLoad < 100) {
            return {
                speed1: 70,
                speed2: 80,
                speed3: 75,
                opacity1: 0.12,
                opacity2: 0.08,
                opacity3: 0.15
            };
        } else if (totalLoad < 200) {
            return {
                speed1: 60,
                speed2: 70,
                speed3: 65,
                opacity1: 0.15,
                opacity2: 0.12,
                opacity3: 0.18
            };
        } else if (totalLoad < 300) {
            return {
                speed1: 55,
                speed2: 65,
                speed3: 60,
                opacity1: 0.18,
                opacity2: 0.14,
                opacity3: 0.20
            };
        } else {
            return {
                speed1: 65,
                speed2: 75,
                speed3: 70,
                opacity1: 0.14,
                opacity2: 0.10,
                opacity3: 0.16
            };
        }
    }, [totalLoad]);

    return (
        <svg
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }} // Changed from -2 to 0
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
        >
            {/* Wave 1 - Top */}
            <path
                d="M0,100 Q400,80 800,100 T1600,100 T2400,100"
                fill="none"
                stroke="#8ba88e"
                strokeWidth="3"
                opacity={waveConfig.opacity1}
                style={{
                    animation: `wave-drift-1 ${waveConfig.speed1}s ease-in-out infinite`
                }}
            />

            {/* Wave 2 - Middle */}
            <path
                d="M0,300 Q400,280 800,300 T1600,300 T2400,300"
                fill="none"
                stroke="#b8a8d6"
                strokeWidth="3"
                opacity={waveConfig.opacity2}
                style={{
                    animation: `wave-drift-2 ${waveConfig.speed2}s ease-in-out infinite`
                }}
            />

            {/* Wave 3 - Bottom */}
            <path
                d="M0,500 Q400,480 800,500 T1600,500 T2400,500"
                fill="none"
                stroke="#8ba88e"
                strokeWidth="2.5"
                opacity={waveConfig.opacity3}
                style={{
                    animation: `wave-drift-3 ${waveConfig.speed3}s ease-in-out infinite`
                }}
            />

            <style>{`
                @keyframes wave-drift-1 {
                    0%, 100% {
                        transform: translateX(0) translateY(0);
                    }
                    50% {
                        transform: translateX(-100px) translateY(-10px);
                    }
                }

                @keyframes wave-drift-2 {
                    0%, 100% {
                        transform: translateX(0) translateY(0);
                    }
                    50% {
                        transform: translateX(80px) translateY(8px);
                    }
                }

                @keyframes wave-drift-3 {
                    0%, 100% {
                        transform: translateX(0) translateY(0);
                    }
                    50% {
                        transform: translateX(-60px) translateY(-6px);
                    }
                }
            `}</style>
        </svg>
    );
}

export default BackgroundWaves;
