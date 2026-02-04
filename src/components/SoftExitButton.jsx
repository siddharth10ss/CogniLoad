import React, { useState } from 'react';

export function SoftExitButton({ onExit }) {
    const [isExiting, setIsExiting] = useState(false);

    const handleExit = () => {
        setIsExiting(true);
        if (onExit) onExit();
    };

    return (
        <div className="text-center pb-8">
            <button
                onClick={handleExit}
                className="text-xs text-muted/30 hover:text-muted/50 font-medium transition-colors duration-300 underline-offset-4 hover:underline"
            >
                I'm done planning for now.
            </button>
        </div>
    );
}
