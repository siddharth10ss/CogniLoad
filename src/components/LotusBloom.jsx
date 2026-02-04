import React, { useMemo } from 'react';

export function LotusBloom({ totalLoad = 0 }) {
    // Calculate lotus behavior based on cognitive load
    const lotusConfig = useMemo(() => {
        if (totalLoad < 100) {
            return {
                scaleMin: 1.0,
                scaleMax: 1.05,
                baseOpacity: 0.30,
                speed: 22
            };
        } else if (totalLoad < 200) {
            return {
                scaleMin: 0.95,
                scaleMax: 1.0,
                baseOpacity: 0.25,
                speed: 20
            };
        } else if (totalLoad < 300) {
            return {
                scaleMin: 0.9,
                scaleMax: 0.95,
                baseOpacity: 0.22,
                speed: 18
            };
        } else {
            return {
                scaleMin: 0.85,
                scaleMax: 0.9,
                baseOpacity: 0.15,
                speed: 25
            };
        }
    }, [totalLoad]);

    return (
        <div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
                zIndex: 0,
                width: '800px',
                height: '800px'
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: lotusConfig.baseOpacity }}
            >
                <defs>
                    {/* Gradient for realistic lotus petals */}
                    <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffc9d9" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#ffb3c6" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#ff9eb8" stopOpacity="1" />
                    </linearGradient>

                    <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffd700" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#ffb347" stopOpacity="0.8" />
                    </linearGradient>
                </defs>

                {/* Lotus petals - realistic design */}
                <g
                    style={{
                        animation: `lotus-breathe ${lotusConfig.speed}s ease-in-out infinite`,
                        transformOrigin: 'center'
                    }}
                >
                    {/* Outer petals - lighter pink */}
                    <ellipse
                        cx="100"
                        cy="60"
                        rx="20"
                        ry="35"
                        fill="url(#petalGradient)"
                        stroke="#ff9eb8"
                        strokeWidth="1.5"
                        opacity="0.35"
                    />
                    <ellipse
                        cx="140"
                        cy="100"
                        rx="35"
                        ry="20"
                        fill="url(#petalGradient)"
                        stroke="#ff9eb8"
                        strokeWidth="1.5"
                        opacity="0.35"
                    />
                    <ellipse
                        cx="100"
                        cy="140"
                        rx="20"
                        ry="35"
                        fill="url(#petalGradient)"
                        stroke="#ff9eb8"
                        strokeWidth="1.5"
                        opacity="0.35"
                    />
                    <ellipse
                        cx="60"
                        cy="100"
                        rx="35"
                        ry="20"
                        fill="url(#petalGradient)"
                        stroke="#ff9eb8"
                        strokeWidth="1.5"
                        opacity="0.35"
                    />

                    {/* Inner petals - deeper pink */}
                    <ellipse
                        cx="100"
                        cy="80"
                        rx="16"
                        ry="28"
                        fill="url(#petalGradient)"
                        stroke="#ff8faa"
                        strokeWidth="2"
                        opacity="0.45"
                    />
                    <ellipse
                        cx="120"
                        cy="100"
                        rx="28"
                        ry="16"
                        fill="url(#petalGradient)"
                        stroke="#ff8faa"
                        strokeWidth="2"
                        opacity="0.45"
                    />
                    <ellipse
                        cx="100"
                        cy="120"
                        rx="16"
                        ry="28"
                        fill="url(#petalGradient)"
                        stroke="#ff8faa"
                        strokeWidth="2"
                        opacity="0.45"
                    />
                    <ellipse
                        cx="80"
                        cy="100"
                        rx="28"
                        ry="16"
                        fill="url(#petalGradient)"
                        stroke="#ff8faa"
                        strokeWidth="2"
                        opacity="0.45"
                    />

                    {/* Center - golden yellow */}
                    <circle
                        cx="100"
                        cy="100"
                        r="12"
                        fill="url(#centerGradient)"
                        stroke="#ffb347"
                        strokeWidth="2"
                        opacity="0.5"
                    />
                </g>

                <style>{`
                    @keyframes lotus-breathe {
                        0%, 100% {
                            transform: scale(${lotusConfig.scaleMin});
                            opacity: 0.8;
                        }
                        50% {
                            transform: scale(${lotusConfig.scaleMax});
                            opacity: 1;
                        }
                    }
                `}</style>
            </svg>
        </div>
    );
}

export default LotusBloom;
