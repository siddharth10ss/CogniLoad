import React, { useState, useEffect } from 'react';

const affirmations = [
    "You've seen what you need for now.",
    "This is enough for today.",
    "Your load is visible — you can rest.",
    "You don't need to optimize this further."
];

export function EndOfViewAffirmation() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Select a message based on day of year (gentle rotation, not random)
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        const index = dayOfYear % affirmations.length;
        setMessage(affirmations[index]);
    }, []);

    return (
        <div className="text-center py-8 text-sm text-muted/40 font-medium">
            {message}
        </div>
    );
}
