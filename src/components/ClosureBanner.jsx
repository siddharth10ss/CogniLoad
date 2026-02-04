import React, { useState, useEffect } from 'react';

export function ClosureBanner({ action, loadChange, totalLoad }) {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [lastMessage, setLastMessage] = useState('');

    useEffect(() => {
        if (!action) return;

        const newMessage = getClosureMessage(action, loadChange, totalLoad);

        // Anti-repetition guard
        if (newMessage === lastMessage) return;

        setMessage(newMessage);
        setLastMessage(newMessage);
        setVisible(true);

        // Auto-dismiss after 5 seconds
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [action, loadChange, totalLoad]);

    const getClosureMessage = (action, loadChange, totalLoad) => {
        // Words only, no numbers
        if (action === 'task_deleted' && loadChange < 0) {
            return "You've reduced tomorrow's cognitive pressure.";
        }

        if (action === 'task_added' && totalLoad < 200) {
            return "This week still looks balanced.";
        }

        if (action === 'task_added' && totalLoad >= 200) {
            return "Consider spreading this across more days.";
        }

        if (action === 'zen_completed') {
            return "One less thing to carry. Well done.";
        }

        if (action === 'background_adjusted') {
            return "Your forecast now reflects reality.";
        }

        if (action === 'soft_exit') {
            return "You can stop thinking about this now.";
        }

        return "Nothing urgent needs your attention right now.";
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
            <div className="bg-teal-soft/90 backdrop-blur-md text-teal-dark px-8 py-4 rounded-full shadow-xl border-2 border-teal-soft">
                <p className="text-sm font-medium text-center">
                    {message}
                </p>
            </div>
        </div>
    );
}
