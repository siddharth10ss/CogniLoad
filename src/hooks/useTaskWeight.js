import { useState, useEffect } from 'react';

/**
 * Option 3: Task Cognitive Weight Preview
 * Shows mental weight while adding tasks
 */
export function useTaskWeight(duration, effort) {
    const [weight, setWeight] = useState('');

    useEffect(() => {
        if (!duration || !effort) {
            setWeight('');
            return;
        }

        const cognitiveWeight = duration * effort;

        if (cognitiveWeight < 60) {
            setWeight('This task is light to carry.');
        } else if (cognitiveWeight < 150) {
            setWeight('This task feels moderate.');
        } else {
            setWeight('This task feels mentally heavy.');
        }
    }, [duration, effort]);

    return weight;
}
