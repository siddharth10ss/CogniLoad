import React from 'react';

export function LoadingSpinner({ size = 'md', text = '' }) {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-2',
        lg: 'w-12 h-12 border-3'
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div
                className={`animate-spin rounded-full border-primary border-t-transparent ${sizeClasses[size]}`}
                role="status"
                aria-label="Loading"
            />
            {text && (
                <p className="mt-3 text-sm text-muted/60 font-medium">
                    {text}
                </p>
            )}
        </div>
    );
}

export function SkeletonLoader({ type = 'card' }) {
    if (type === 'card') {
        return (
            <div className="glass-panel p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
            </div>
        );
    }

    if (type === 'chart') {
        return (
            <div className="glass-panel p-8 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-48 bg-gray-200 rounded" />
            </div>
        );
    }

    return null;
}
