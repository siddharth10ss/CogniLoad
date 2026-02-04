import { useState, useEffect } from 'react';

/**
 * Custom hook for localStorage persistence.
 * @param {string} key - The key to store data under in localStorage.
 * @param {*} initialValue - The initial value if key doesn't exist.
 * @returns {[*, Function]} - State and setter function.
 */
export function usePersistence(key, initialValue) {
    // Get from local storage then parse stored json or return initialValue
    const readValue = () => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            // DEMO SEED: If no data exists for tasks, return dummy data
            if (!item && key === 'cogniload_tasks') {
                const DUMMY_DATA = [
                    { id: "t1", title: "DSA Assignment – Graph Algorithms", estimatedDuration: 120, mentalEffort: 5, category: "coding", deadline: "2026-02-05", createdAt: "2026-02-01" },
                    { id: "t2", title: "Machine Learning Quiz Prep", estimatedDuration: 90, mentalEffort: 4, category: "revision", deadline: "2026-02-04", createdAt: "2026-02-01" },
                    { id: "t3", title: "Operating Systems Notes Review", estimatedDuration: 60, mentalEffort: 3, category: "reading", deadline: "2026-02-03", createdAt: "2026-02-02" },
                    { id: "t4", title: "Group Project Sync Meeting", estimatedDuration: 45, mentalEffort: 3, category: "admin", deadline: "2026-02-02", createdAt: "2026-02-02" },
                    { id: "t5", title: "Internship Application – Resume Update", estimatedDuration: 75, mentalEffort: 4, category: "admin", deadline: "2026-02-06", createdAt: "2026-02-02" },
                    { id: "t6", title: "DBMS Midterm Revision", estimatedDuration: 150, mentalEffort: 5, category: "revision", deadline: "2026-02-04", createdAt: "2026-02-03" },
                    { id: "t7", title: "AI Ethics Reading", estimatedDuration: 40, mentalEffort: 2, category: "reading", deadline: "2026-02-06", createdAt: "2026-02-03" },
                    { id: "t8", title: "Hackathon Demo Preparation", estimatedDuration: 180, mentalEffort: 5, category: "coding", deadline: "2026-02-05", createdAt: "2026-02-03" }
                ];
                // Save immediately so it persists
                window.localStorage.setItem(key, JSON.stringify(DUMMY_DATA));
                return DUMMY_DATA;
            }
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState(readValue);

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
                // Dispatch event so other hooks with same key update instantly
                window.dispatchEvent(new CustomEvent('local-storage-update', { detail: { key, value: valueToStore } }));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    useEffect(() => {
        setStoredValue(readValue());

        // Listen for updates from other components
        const handleStorageChange = (e) => {
            if (e.detail.key === key) {
                setStoredValue(e.detail.value);
            }
        };

        window.addEventListener('local-storage-update', handleStorageChange);
        return () => window.removeEventListener('local-storage-update', handleStorageChange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    return [storedValue, setValue];
}

/**
 * Track tasks completed today
 */
export function useTasksCompletedToday() {
    const [completedToday, setCompletedToday] = useState(0);

    useEffect(() => {
        const today = new Date().toDateString();
        const lastDate = localStorage.getItem('last_completion_date');
        const count = parseInt(localStorage.getItem('tasks_completed_today') || '0');

        if (lastDate !== today) {
            // New day, reset counter
            localStorage.setItem('tasks_completed_today', '0');
            localStorage.setItem('last_completion_date', today);
            setCompletedToday(0);
        } else {
            setCompletedToday(count);
        }
    }, []);

    const incrementCompleted = () => {
        const newCount = completedToday + 1;
        setCompletedToday(newCount);
        localStorage.setItem('tasks_completed_today', newCount.toString());
        localStorage.setItem('last_completion_date', new Date().toDateString());
    };

    return [completedToday, incrementCompleted];
}
