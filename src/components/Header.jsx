import React, { useState } from 'react';
import { Brain, Download } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { DataManager } from './DataManager';

export function Header() {
    const [showDataManager, setShowDataManager] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-none bg-white/50 backdrop-blur-md transition-colors duration-300 shadow-sm">
                <div className="container mx-auto px-4 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-teal-soft/20 p-3 rounded-[1.25rem] shadow-sm transform rotate-3 hover:rotate-0 transition-transform duration-300">
                            <Brain className="w-8 h-8 text-teal-dark" aria-hidden="true" />
                        </div>
                        <h1 className="text-3xl font-bold text-text tracking-tighter font-sans">
                            Cogni<span className="text-teal-dark">Load</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowDataManager(!showDataManager)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted hover:text-text transition-colors rounded-xl hover:bg-gray-100"
                            aria-label="Manage data backup"
                            aria-expanded={showDataManager}
                        >
                            <Download className="w-4 h-4" aria-hidden="true" />
                            <span className="hidden sm:inline">Backup</span>
                        </button>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Data Manager Modal */}
            {showDataManager && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={() => setShowDataManager(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="data-manager-title"
                >
                    <div
                        className="max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h2 id="data-manager-title" className="text-2xl font-bold text-white">
                                Data Backup
                            </h2>
                            <button
                                onClick={() => setShowDataManager(false)}
                                className="text-white hover:text-gray-300 text-2xl"
                                aria-label="Close dialog"
                            >
                                ×
                            </button>
                        </div>
                        <DataManager />
                    </div>
                </div>
            )}
        </>
    );
}
