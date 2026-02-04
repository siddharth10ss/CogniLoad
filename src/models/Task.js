/**
 * @typedef {Object} Task
 * @property {string} id - Unique identifier (UUID or string)
 * @property {string} title - The name of the task
 * @property {number} estimatedDuration - Estimated time in minutes
 * @property {1|2|3|4|5} mentalEffort - Mental effort rating (1: Low, 5: High)
 * @property {'reading'|'coding'|'revision'|'admin'|string} category - Task category
 * @property {string} [deadline] - Optional deadline (ISO 8601 date string)
 * @property {string} createdAt - Creation timestamp (ISO 8601 date string)
 */

/**
 * Example tasks for development and testing.
 * @type {Task[]}
 */
export const EXAMPLE_TASKS = [
  {
    id: '1',
    title: 'Review React Hooks Documentation',
    estimatedDuration: 30,
    mentalEffort: 2,
    category: 'reading',
    deadline: '2023-11-15T18:00:00Z',
    createdAt: '2023-11-01T09:00:00Z',
  },
  {
    id: '2',
    title: 'Implement Authentication Flow',
    estimatedDuration: 120,
    mentalEffort: 5,
    category: 'coding',
    createdAt: '2023-11-01T10:30:00Z',
  },
  {
    id: '3',
    title: 'Weekly Team Sync',
    estimatedDuration: 45,
    mentalEffort: 1,
    category: 'admin',
    deadline: '2023-11-03T10:00:00Z',
    createdAt: '2023-11-02T09:00:00Z',
  },
  {
    id: '4',
    title: 'Refactor Utility Functions',
    estimatedDuration: 60,
    mentalEffort: 3,
    category: 'coding',
    createdAt: '2023-11-02T14:15:00Z',
  },
  {
    id: '5',
    title: 'Exam Preparation: Algorithms',
    estimatedDuration: 90,
    mentalEffort: 4,
    category: 'revision',
    deadline: '2023-11-10T09:00:00Z',
    createdAt: '2023-11-03T16:00:00Z',
  },
];
