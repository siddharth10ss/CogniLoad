import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import clsx from 'clsx';
import { usePersistence } from '../hooks/usePersistence';

export function ThemeToggle() {
    // Use persistence if you want it to remember across reloads, 
    // but usually theme is better handled with immediate effect before hook initializes.
    // For simplicity, we'll use a local state initialized from localStorage/media.

    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined' && window.localStorage.getItem('theme')) {
            return window.localStorage.getItem('theme');
        }
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'dark'; // Default to dark for "premium" feel
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className={clsx(
                "p-3 rounded-full transition-all duration-300 relative overflow-hidden",
                "bg-surface border border-white/50 text-muted hover:text-primary hover:bg-primary/10 shadow-sm hover:shadow-md",
                "active:scale-95 active:rotate-12"
            )}
            title="Toggle theme"
        >
            <div className="relative z-10">
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
        </button>
    );
}
