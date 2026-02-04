import React from 'react';
import { Lightbulb, AlertTriangle } from 'lucide-react';

export function InsightsBanner({ dailyData, tasks }) {
    if (!dailyData || dailyData.length === 0) return null;

    // Find the first day with overload
    const overloadedDay = dailyData.find(d => d.load > 600);

    if (!overloadedDay) {
        return (
            <div className="glass-panel p-4 rounded-xl border-l-4 border-emerald-500 bg-emerald-500/5 flex items-start gap-3 animate-fade-in">
                <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
                    <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-semibold text-emerald-300">Healthy Balance</h4>
                    <p className="text-sm text-emerald-200/80">Your cognitive load is sustainable for the upcoming days. Great planning!</p>
                </div>
            </div>
        );
    }

    // Generate specific advice for the overloaded day
    const dateObj = new Date(overloadedDay.date);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

    // Find a task contributing to this overload (heuristic: largest task on that day or associated with it)
    // Since daily logic is aggregate, we look for tasks due on this day
    const heavyTask = tasks.find(t => t.deadline && t.deadline.startsWith(overloadedDay.date));

    const advice = heavyTask
        ? `Suggest moving '${heavyTask.title}' to an earlier date to spread the load.`
        : "Consider rescheduling deadline-heavy tasks to lighter days.";

    return (
        <div className="glass-panel p-4 rounded-xl border-l-4 border-amber-500 bg-amber-500/5 flex items-start gap-3 animate-fade-in">
            <div className="p-2 rounded-full bg-amber-500/20 text-amber-400 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
                <h4 className="font-semibold text-amber-300">High Load Detected on {dayName}</h4>
                <p className="text-sm text-amber-200/80">{advice}</p>
            </div>
        </div>
    );
}
