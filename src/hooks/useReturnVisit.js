import { useState, useEffect } from 'react';

/**
 * Option 1: Cognitive Load Diff
 * Option 2: Cognitive Load Bookmark
 */
export function useReturnVisit() {
    const [returnState, setReturnState] = useState({
        isNewDay: false,
        daysSinceLastVisit: 0,
        shouldShowReEntryMessage: false,
        shouldShowLoadDiff: false,
        loadDiffMessage: ''
    });

    useEffect(() => {
        const lastVisit = localStorage.getItem('last_visit_timestamp');
        const now = Date.now();

        if (lastVisit) {
            const lastVisitDate = new Date(parseInt(lastVisit));
            const currentDate = new Date(now);

            // Check if it's a new day
            const isNewDay = lastVisitDate.toDateString() !== currentDate.toDateString();

            // Calculate days since last visit
            const daysDiff = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));

            // Show re-entry message only once per day
            const lastMessageDate = localStorage.getItem('last_reentry_message_date');
            const shouldShowReEntryMessage = isNewDay &&
                (!lastMessageDate || lastMessageDate !== currentDate.toDateString());

            if (shouldShowReEntryMessage) {
                localStorage.setItem('last_reentry_message_date', currentDate.toDateString());
            }

            // Cognitive Load Diff (Option 1)
            let shouldShowLoadDiff = false;
            let loadDiffMessage = '';

            if (isNewDay) {
                const lastLoad = parseInt(localStorage.getItem('last_total_load') || '0');
                const currentLoad = parseInt(localStorage.getItem('current_total_load') || '0');
                const delta = currentLoad - lastLoad;

                const lastDiffDate = localStorage.getItem('last_diff_shown_date');
                if (!lastDiffDate || lastDiffDate !== currentDate.toDateString()) {
                    shouldShowLoadDiff = true;
                    loadDiffMessage = getCognitiveLoadDiff(delta);
                    localStorage.setItem('last_diff_shown_date', currentDate.toDateString());
                }
            }

            setReturnState({
                isNewDay,
                daysSinceLastVisit: daysDiff,
                shouldShowReEntryMessage,
                shouldShowLoadDiff,
                loadDiffMessage
            });
        }

        // Update last visit timestamp
        localStorage.setItem('last_visit_timestamp', now.toString());
    }, []);

    return returnState;
}

// Helper function for cognitive load diff
function getCognitiveLoadDiff(delta) {
    if (Math.abs(delta) < 50) {
        return "Your cognitive pressure feels similar to yesterday.";
    }

    if (delta > 0) {
        if (delta > 100) {
            return "Your cognitive pressure is higher than yesterday.";
        }
        return "Your cognitive pressure is slightly higher than yesterday.";
    }

    if (delta < -100) {
        return "Today feels lighter than your last check-in.";
    }
    return "Today feels a bit lighter than yesterday.";
}
