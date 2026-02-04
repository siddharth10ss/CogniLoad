/**
 * Date helper utilities for calendar view
 */

/**
 * Get array of next 7 days starting from today
 * @returns {Date[]} Array of 7 Date objects
 */
export function getNext7Days() {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of day

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push(date);
    }

    return days;
}

/**
 * Format date for display
 * @param {Date} date 
 * @returns {string} Formatted date (e.g., "Mon, Feb 3")
 */
export function formatCalendarDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Format date as YYYY-MM-DD for comparison
 * @param {Date} date 
 * @returns {string} Date string
 */
export function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Check if date is today
 * @param {Date} date 
 * @returns {boolean}
 */
export function isToday(date) {
    const today = new Date();
    return formatDateKey(date) === formatDateKey(today);
}

/**
 * Check if date is in the past
 * @param {Date} date 
 * @returns {boolean}
 */
export function isPast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
}

/**
 * Group tasks by deadline date
 * @param {Array} tasks 
 * @returns {Object} Tasks grouped by date key
 */
export function groupTasksByDate(tasks) {
    const grouped = {};

    tasks.forEach(task => {
        if (task.deadline) {
            const dateKey = formatDateKey(new Date(task.deadline));
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(task);
        }
    });

    return grouped;
}

/**
 * Get color class based on daily load
 * @param {number} load 
 * @returns {string} Tailwind color classes
 */
export function getDailyLoadColor(load) {
    if (load < 100) return 'bg-teal-soft/20 border-teal-soft/40 text-teal-dark';
    if (load < 200) return 'bg-lavender-soft/20 border-lavender-soft/40 text-lavender-dark';
    if (load < 300) return 'bg-coral-soft/20 border-coral-soft/40 text-coral-dark';
    return 'bg-coral-dark/20 border-coral-dark/40 text-coral-dark';
}
