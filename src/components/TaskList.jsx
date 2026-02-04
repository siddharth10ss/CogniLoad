import React from 'react';
import { usePersistence } from '../hooks/usePersistence';
import { Trash2, AlertCircle, Clock, Brain, Maximize2 } from 'lucide-react';
import clsx from 'clsx';

export function TaskList({ onFocus, onDelete }) {
    const [tasks, setTasks] = usePersistence('cogniload_tasks', []);

    const handleDelete = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
        if (onDelete) onDelete(id);
    };

    const getCategoryColor = (cat) => {
        switch (cat) {
            case 'coding': return 'text-teal-dark bg-teal-soft/30 hover:bg-teal-soft/50';
            case 'reading': return 'text-lavender-dark bg-lavender-soft/50 hover:bg-lavender-soft/70';
            case 'revision': return 'text-coral-dark bg-coral-soft/30 hover:bg-coral-soft/50';
            case 'admin': return 'text-[#8ba88e] bg-[#8ba88e]/20 hover:bg-[#8ba88e]/30';
            default: return 'text-gray-500 bg-gray-100';
        }
    };

    if (tasks.length === 0) {
        return (
            <div className="text-center py-12 px-4 rounded-[2rem] border border-dashed border-muted/30 bg-white/30">
                <p className="text-muted/60 text-lg font-medium">Your mindful space is empty.</p>
                <p className="text-sm text-muted/40 mt-1">Add a task to see your cognitive forecast.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-baseline justify-between px-1">
                <h3 className="text-xl font-bold text-text tracking-tight font-sans">Your Flow</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-muted/50">{tasks.length} Active</span>
            </div>

            <div className="grid gap-5">
                {tasks.map((task, index) => (
                    <div
                        key={task.id}
                        className="glass-panel p-5 rounded-[1.75rem] flex items-center justify-between group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in bg-white"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3">
                                <span className={clsx("px-4 py-1.5 rounded-full text-[10px] uppercase font-extrabold tracking-widest transition-colors", getCategoryColor(task.category))}>
                                    {task.category}
                                </span>
                                {task.deadline && (
                                    <span className="flex items-center gap-1.5 text-[10px] text-coral-dark font-bold bg-coral-soft/20 px-3 py-1.5 rounded-full">
                                        <AlertCircle className="w-3 h-3" />
                                        {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </span>
                                )}
                            </div>

                            <h4 className="font-bold text-xl text-text truncate tracking-tight mb-2 font-sans">{task.title}</h4>

                            <div className="flex items-center gap-4 text-xs font-semibold text-muted/80">
                                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                    <Clock className="w-3.5 h-3.5 text-teal-dark" /> {task.estimatedDuration}m
                                </span>
                                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                    <Brain className="w-3.5 h-3.5 text-lavender-dark" /> Load: {task.mentalEffort * task.estimatedDuration}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 ml-3">
                            <button
                                onClick={() => onFocus && onFocus(task)}
                                className="p-4 text-teal-dark/50 hover:text-white hover:bg-teal-soft rounded-2xl transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110 active:scale-95 shadow-sm"
                                title="Enter Zen Focus"
                            >
                                <Maximize2 className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => handleDelete(task.id)}
                                className="p-4 text-muted/40 hover:text-white hover:bg-coral-dark rounded-2xl transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110 active:scale-95 shadow-sm"
                                title="Delete task"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
