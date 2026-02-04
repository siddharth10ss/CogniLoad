/**
 * @typedef {import('../models/Task.js').Task} Task
 */

/**
 * @typedef {Object} CognitiveLoadResult
 * @property {number} totalLoad - The sum of cognitive loads for all tasks (approximate units).
 * @property {Object[]} taskBreakdown - Detailed breakdown for each task.
 * @property {string} taskBreakdown.taskId - The ID of the task.
 * @property {number} taskBreakdown.baseLoad - Base load (duration * effort).
 * @property {number} taskBreakdown.contextSwitchPenalty - Penalty added for context switching.
 * @property {number} taskBreakdown.urgencyPenalty - Penalty added for urgency.
 * @property {number} taskBreakdown.totalTaskLoad - Total load for this specific task.
 */

// --- Assumptions & Constants ---

// Assumption: Base load is calculated as Duration (minutes) * Effort (1-5).
// This gives a rough "cognitive units" score. E.g., 30 mins * 2 effort = 60 units.

// Assumption: Context switching adds a fixed penalty when the category changes.
// We value this as equivalent to 15 minutes of low-effort work or 3 minutes of high-effort work.
const CONTEXT_SWITCH_PENALTY_SCORE = 15;

// Assumption: Urgency multiplies the base load.
// If a task is due within 24 hours, it is 20% more mentally taxing.
const URGENCY_MULTIPLIER = 1.2;

// Threshold for "urgent" task in milliseconds (24 hours).
const URGENCY_THRESHOLD_MS = 24 * 60 * 60 * 1000;

/**
 * Calculates the total cognitive load for a sequence of tasks.
 * Pure function.
 *
 * @param {Task[]} tasks - Array of task objects. Assumed to be in execution order.
 * @param {Date|string|number} [currentTime=Date.now()] - The current time for urgency calculations.
 * @param {Object} [options={}] - Additional options.
 * @param {boolean} [options.simulateUrgency=false] - If true, assumes tasks with deadlines are urgent.
 * @returns {CognitiveLoadResult}
 */
export function calculateCognitiveLoad(tasks, currentTime = Date.now(), options = {}) {
    const { simulateUrgency = false, backgroundModifier = 0 } = options;
    const now = new Date(currentTime).getTime();
    let totalLoad = 0;
    const taskBreakdown = [];

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const prevTask = i > 0 ? tasks[i - 1] : null;

        // 1. Base Load
        // Formula: Duration * Mental Effort
        const baseLoad = task.estimatedDuration * task.mentalEffort;

        // 2. Context Switching Penalty
        // Rule: Add penalty if previous task exists and has a different category.
        let contextSwitchPenalty = 0;
        if (prevTask && prevTask.category !== task.category) {
            contextSwitchPenalty = CONTEXT_SWITCH_PENALTY_SCORE;
        }

        // 3. Urgency Penalty
        // Rule: Increase base load if deadline is within 24 hours.
        let urgencyPenalty = 0;
        if (task.deadline) {
            const deadlineDate = new Date(task.deadline).getTime();
            const timeUntilDeadline = deadlineDate - now;

            // Only apply if deadline is in the future but within threshold
            // OR if we are simulating urgency (assuming the task will be done near deadline)
            if ((timeUntilDeadline > 0 && timeUntilDeadline <= URGENCY_THRESHOLD_MS) || options.simulateUrgency) {
                // Calculate the extra load added by the multiplier
                urgencyPenalty = (baseLoad * URGENCY_MULTIPLIER) - baseLoad;
            }
        }

        // Total for this task
        const totalTaskLoad = baseLoad + contextSwitchPenalty + urgencyPenalty;

        // Accumulate
        totalLoad += totalTaskLoad;

        taskBreakdown.push({
            taskId: task.id,
            baseLoad,
            contextSwitchPenalty,
            urgencyPenalty,
            totalTaskLoad,
        });
    }

    return {
        totalLoad: totalLoad + backgroundModifier,
        taskBreakdown,
    };
}

/**
 * Aggregates cognitive load by date.
 * Groups tasks by deadline (or createdAt if no deadline) and calculates load per day.
 * 
 * @param {Task[]} tasks 
 * @returns {Object[]} Array of { date: string, load: number } sorted by date.
 */
export function calculateDailyLoad(tasks) {
    const dailyLoads = {};

    const addToDate = (dateStr, amount) => {
        if (!dailyLoads[dateStr]) dailyLoads[dateStr] = 0;
        dailyLoads[dateStr] += amount;
    };

    const getPrevDate = (dateStr, daysBack) => {
        const d = new Date(dateStr);
        d.setDate(d.getDate() - daysBack);
        return d.toISOString().split('T')[0];
    };

    tasks.forEach(task => {
        // 1. Calculate total load for this task (re-using existing logic logic per task)
        // We create a temp single-item array to simulate context (though context switch penalty 
        // is weaker here without full sequence, we assume isolated load for distribution).
        const { totalLoad } = calculateCognitiveLoad([task], Date.now(), { simulateUrgency: true });

        // 2. Determine anchor date (Deadline > CreatedAt)
        const anchorDate = task.deadline
            ? new Date(task.deadline).toISOString().split('T')[0]
            : new Date(task.createdAt).toISOString().split('T')[0];

        if (task.deadline) {
            // RULE: 70% on deadline day, 15% on D-1, 15% on D-2
            addToDate(anchorDate, totalLoad * 0.7);
            addToDate(getPrevDate(anchorDate, 1), totalLoad * 0.15);
            addToDate(getPrevDate(anchorDate, 2), totalLoad * 0.15);
        } else {
            // If no deadline, assume load is fully on creation/current day (simple fallback)
            addToDate(anchorDate, totalLoad);
        }
    });

    // Convert to array
    const dailyStats = Object.keys(dailyLoads).map(date => ({
        date,
        load: Math.round(dailyLoads[date])
    }));

    // Sort by date
    return dailyStats.sort((a, b) => new Date(a.date) - new Date(b.date));
}
