import React, { useMemo } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { calculateCognitiveLoad } from '../utils/cognitiveLoad';
import {
    getNext7Days,
    formatCalendarDate,
    formatDateKey,
    isToday,
    isPast,
    groupTasksByDate,
    getDailyLoadColor
} from '../utils/dateHelpers';

export default function WeeklyCalendar({ tasks }) {
    const calendarData = useMemo(() => {
        const days = getNext7Days();
        const tasksByDate = groupTasksByDate(tasks);

        return days.map(date => {
            const dateKey = formatDateKey(date);
            const dayTasks = tasksByDate[dateKey] || [];

            // Calculate total load for this day
            const { totalLoad } = calculateCognitiveLoad(dayTasks, date);

            return {
                date,
                dateKey,
                displayDate: formatCalendarDate(date),
                tasks: dayTasks,
                totalLoad: Math.round(totalLoad),
                isToday: isToday(date),
                isPast: isPast(date)
            };
        });
    }, [tasks]);

    // Count unscheduled tasks
    const unscheduledTasks = tasks.filter(task => !task.deadline);

    return (
        <div className="glass-panel p-6 rounded-[2rem]">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-teal-dark" />
                    <h3 className="text-xl font-bold text-text">Weekly Overview</h3>
                </div>
                {unscheduledTasks.length > 0 && (
                    <span className="text-sm text-muted">
                        {unscheduledTasks.length} unscheduled
                    </span>
                )}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
                {calendarData.map((day) => (
                    <div
                        key={day.dateKey}
                        className={`
                            p-4 rounded-xl border-2 transition-all
                            ${day.isToday
                                ? 'bg-teal-soft/10 border-teal-dark shadow-sm'
                                : day.isPast
                                    ? 'bg-gray-50 border-gray-200 opacity-60'
                                    : 'bg-white border-gray-200 hover:border-gray-300'
                            }
                        `}
                    >
                        {/* Date Header */}
                        <div className="mb-3">
                            <div className={`text-xs font-semibold mb-1 ${day.isToday ? 'text-teal-dark' : 'text-muted'
                                }`}>
                                {day.displayDate}
                            </div>
                            {day.totalLoad > 0 && (
                                <div className={`
                                    inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border
                                    ${getDailyLoadColor(day.totalLoad)}
                                `}>
                                    Load: {day.totalLoad}
                                </div>
                            )}
                        </div>

                        {/* Tasks */}
                        <div className="space-y-2">
                            {day.tasks.length === 0 ? (
                                <p className="text-xs text-muted/50 italic">No tasks</p>
                            ) : (
                                day.tasks.map(task => (
                                    <div
                                        key={task.id}
                                        className="p-2 bg-white/50 rounded-lg border border-gray-100 hover:border-gray-200 transition-all cursor-pointer group"
                                        title={task.title}
                                    >
                                        <div className="text-xs font-medium text-text truncate group-hover:text-teal-dark">
                                            {task.title}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                                            <Clock className="w-3 h-3" />
                                            <span>{task.estimatedDuration}m</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Unscheduled Tasks Section */}
            {unscheduledTasks.length > 0 && (
                <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                    <h4 className="text-sm font-semibold text-amber-800 mb-2">
                        Unscheduled Tasks ({unscheduledTasks.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {unscheduledTasks.map(task => (
                            <div
                                key={task.id}
                                className="p-2 bg-white rounded-lg border border-amber-200 text-xs"
                            >
                                <div className="font-medium text-text truncate">{task.title}</div>
                                <div className="text-muted mt-1">{task.estimatedDuration}m</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-teal-soft/20 border border-teal-soft/40" />
                    <span>Light (&lt;100)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-lavender-soft/20 border border-lavender-soft/40" />
                    <span>Moderate (100-200)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-coral-soft/20 border border-coral-soft/40" />
                    <span>Dense (200-300)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-coral-dark/20 border border-coral-dark/40" />
                    <span>Heavy (300+)</span>
                </div>
            </div>
        </div>
    );
}
