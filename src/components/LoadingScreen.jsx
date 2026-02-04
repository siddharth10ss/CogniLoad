import React from 'react';

export function LoadingScreen() {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center"
            style={{
                backgroundColor: '#FFFBF5',
                zIndex: 9999
            }}
        >
            <div className="flex flex-col items-center gap-6">
                {/* Lotus Bloom */}
                <svg
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="lotus-bloom-intro"
                >
                    <defs>
                        {/* Gradient for realistic lotus petals */}
                        <linearGradient id="petalGradientLoading" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffc9d9" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#ffb3c6" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#ff9eb8" stopOpacity="1" />
                        </linearGradient>

                        <linearGradient id="centerGradientLoading" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffd700" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#ffb347" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>

                    {/* Lotus petals */}
                    <g>
                        {/* Outer petals */}
                        <ellipse
                            cx="100"
                            cy="60"
                            rx="20"
                            ry="35"
                            fill="url(#petalGradientLoading)"
                            stroke="#ff9eb8"
                            strokeWidth="1.5"
                            opacity="0.4"
                        />
                        <ellipse
                            cx="140"
                            cy="100"
                            rx="35"
                            ry="20"
                            fill="url(#petalGradientLoading)"
                            stroke="#ff9eb8"
                            strokeWidth="1.5"
                            opacity="0.4"
                        />
                        <ellipse
                            cx="100"
                            cy="140"
                            rx="20"
                            ry="35"
                            fill="url(#petalGradientLoading)"
                            stroke="#ff9eb8"
                            strokeWidth="1.5"
                            opacity="0.4"
                        />
                        <ellipse
                            cx="60"
                            cy="100"
                            rx="35"
                            ry="20"
                            fill="url(#petalGradientLoading)"
                            stroke="#ff9eb8"
                            strokeWidth="1.5"
                            opacity="0.4"
                        />

                        {/* Inner petals */}
                        <ellipse
                            cx="100"
                            cy="80"
                            rx="16"
                            ry="28"
                            fill="url(#petalGradientLoading)"
                            stroke="#ff8faa"
                            strokeWidth="2"
                            opacity="0.5"
                        />
                        <ellipse
                            cx="120"
                            cy="100"
                            rx="28"
                            ry="16"
                            fill="url(#petalGradientLoading)"
                            stroke="#ff8faa"
                            strokeWidth="2"
                            opacity="0.5"
                        />
                        <ellipse
                            cx="100"
                            cy="120"
                            rx="16"
                            ry="28"
                            fill="url(#petalGradientLoading)"
                            stroke="#ff8faa"
                            strokeWidth="2"
                            opacity="0.5"
                        />
                        <ellipse
                            cx="80"
                            cy="100"
                            rx="28"
                            ry="16"
                            fill="url(#petalGradientLoading)"
                            stroke="#ff8faa"
                            strokeWidth="2"
                            opacity="0.5"
                        />

                        {/* Center */}
                        <circle
                            cx="100"
                            cy="100"
                            r="12"
                            fill="url(#centerGradientLoading)"
                            stroke="#ffb347"
                            strokeWidth="2"
                            opacity="0.6"
                        />
                    </g>
                </svg>

                {/* Optional subtle text */}
                <p
                    className="text-2xl font-light tracking-wide lotus-text-intro"
                    style={{
                        color: '#9ca3af',
                        fontFamily: 'Outfit, Inter, sans-serif'
                    }}
                >
                    CogniLoad
                </p>
            </div>

            <style>{`
                @keyframes lotus-bloom-intro {
                    0% {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                    40% {
                        transform: scale(1.0);
                        opacity: 1;
                    }
                    80% {
                        transform: scale(0.95);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(0.95);
                        opacity: 0;
                    }
                }

                @keyframes text-fade-intro {
                    0% {
                        opacity: 0;
                    }
                    30% {
                        opacity: 0;
                    }
                    50% {
                        opacity: 0.6;
                    }
                    80% {
                        opacity: 0.6;
                    }
                    100% {
                        opacity: 0;
                    }
                }

                .lotus-bloom-intro {
                    animation: lotus-bloom-intro 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .lotus-text-intro {
                    animation: text-fade-intro 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                /* Respect reduced motion preference */
                @media (prefers-reduced-motion: reduce) {
                    .lotus-bloom-intro,
                    .lotus-text-intro {
                        animation: none;
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}

export default LoadingScreen;
