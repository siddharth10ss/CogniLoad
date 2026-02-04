import React, { useState } from 'react';
import { Plus, Calendar, Clock, Brain, Tag, Zap } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import { usePersistence } from '../hooks/usePersistence';
import { useTaskWeight } from '../hooks/useTaskWeight';

const CATEGORIES = [
    { id: 'coding', label: 'Coding', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { id: 'reading', label: 'Reading', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { id: 'revision', label: 'Revision', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    { id: 'admin', label: 'Admin', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
];

export function TaskInput({ onTaskAdded }) {
    const [tasks, setTasks] = usePersistence('cogniload_tasks', []);
    const [formData, setFormData] = useState({
        title: '',
        duration: '',
        mentalEffort: 3,
        category: 'coding',
        deadline: '',
    });
    const [errors, setErrors] = useState({});

    // Option 3: Task Weight Preview
    const taskWeight = useTaskWeight(formData.duration, formData.mentalEffort);

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Valid duration required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const applyPreset = (preset) => {
        setFormData({
            ...formData,
            title: preset.title,
            duration: preset.duration,
            mentalEffort: preset.mentalEffort,
            category: preset.category
        });
        setErrors({});
    };

    const PRESETS = [
        { title: 'Math Homework', duration: 45, mentalEffort: 4, category: 'coding' }, // utilizing coding for 'intense' work
        { title: 'Essay Draft', duration: 90, mentalEffort: 5, category: 'reading' },
        { title: 'Quick Emails', duration: 15, mentalEffort: 2, category: 'admin' },
        { title: 'Flashcards', duration: 30, mentalEffort: 3, category: 'revision' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const newTask = {
            id: uuidv4(),
            title: formData.title,
            estimatedDuration: parseInt(formData.duration, 10),
            mentalEffort: parseInt(formData.mentalEffort, 10),
            category: formData.category,
            deadline: formData.deadline || null,
            createdAt: new Date().toISOString(),
        };

        // Save to persistence
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);

        // Notify parent if needed (e.g., for toast or refresh)
        if (onTaskAdded) onTaskAdded(newTask);

        // Reset form
        setFormData({
            title: '',
            duration: '',
            mentalEffort: 3,
            category: 'coding',
            deadline: '',
        });
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-[2rem] w-full max-w-2xl mx-auto space-y-8 shadow-sm hover:shadow-lg transition-shadow duration-500">
            <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-text flex items-center gap-3 font-sans tracking-tight">
                        <div className="p-2 bg-primary/20 rounded-xl text-primary">
                            <Plus className="w-5 h-5" />
                        </div>
                        New Task
                    </h2>
                </div>

                {/* Smart Presets - Softer Pills */}
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {PRESETS.map((preset, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => applyPreset(preset)}
                            className="text-xs font-medium whitespace-nowrap px-4 py-2 rounded-full bg-surface border border-border text-muted hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 flex items-center gap-2 shadow-sm"
                        >
                            <Zap className="w-3 h-3" />
                            {preset.title}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {/* Title Input - Larger and Cleaner */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted uppercase tracking-widest pl-1">Task Title</label>
                    <input
                        type="text"
                        placeholder="What would you like to focus on?"
                        className={clsx("input-field text-lg py-4 px-6 shadow-sm", errors.title && "ring-2 ring-red-400/30")}
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    {errors.title && <span className="text-xs text-red-400 ml-1 font-medium">{errors.title}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Duration Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted uppercase tracking-widest pl-1 flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Duration (mins)
                        </label>
                        <input
                            type="number"
                            placeholder="e.g. 30"
                            min="1"
                            className={clsx("input-field py-3 px-5", errors.duration && "ring-2 ring-red-400/30")}
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        />
                    </div>

                    {/* Deadline Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted uppercase tracking-widest pl-1 flex items-center gap-2">
                            <Calendar className="w-3 h-3" /> Deadline
                        </label>
                        <input
                            type="datetime-local"
                            className="input-field py-3 px-5 text-muted"
                            value={formData.deadline}
                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        />
                    </div>
                </div>

                {/* Mental Effort Slider - Custom styling would be ideal, standard for now but cleaner */}
                <div className="space-y-3 pt-4">
                    <div className="flex justify-between text-xs font-semibold text-muted uppercase tracking-widest pl-1">
                        <span className="flex items-center gap-2"><Brain className="w-3 h-3" /> Mental Effort</span>
                        <span className={clsx(
                            "px-3 py-1 rounded-full text-[10px] font-bold tracking-wide",
                            formData.mentalEffort <= 2 ? "bg-primary/20 text-primary" :
                                formData.mentalEffort === 3 ? "bg-yellow-400/20 text-yellow-600" :
                                    "bg-accent/20 text-accent"
                        )}>
                            {formData.mentalEffort === 1 ? "Very Low" :
                                formData.mentalEffort === 2 ? "Low" :
                                    formData.mentalEffort === 3 ? "Medium" :
                                        formData.mentalEffort === 4 ? "High" : "Very High"}
                        </span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        className="w-full h-3 bg-surface rounded-full appearance-none cursor-pointer accent-primary hover:accent-primary/80 border border-border"
                        value={formData.mentalEffort}
                        onChange={(e) => setFormData({ ...formData, mentalEffort: parseInt(e.target.value, 10) })}
                    />
                    <div className="flex justify-between text-[10px] text-muted/40 px-1 font-medium">
                        <span>Recharge</span><span>Easy</span><span>Neutral</span><span>Hard</span><span>Drain</span>
                    </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-3 pt-2">
                    <label className="text-xs font-semibold text-muted uppercase tracking-widest pl-1 flex items-center gap-2">
                        <Tag className="w-3 h-3" /> Category
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, category: cat.id })}
                                className={clsx(
                                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border shadow-sm",
                                    formData.category === cat.id
                                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 transform scale-105"
                                        : "bg-surface border-border text-muted hover:bg-slate-50 hover:border-primary/20 hover:text-text"
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Option 3: Task Weight Preview */}
            {taskWeight && (
                <div className="pt-2 pb-4">
                    <p className="text-sm text-muted/60 font-medium text-center">
                        {taskWeight}
                    </p>
                </div>
            )}

            <div className="pt-6">
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base shadow-xl shadow-primary/10 hover:shadow-primary/20">
                    <Plus className="w-5 h-5" />
                    Add to Schedule
                </button>
            </div>
        </form>
    );
}
