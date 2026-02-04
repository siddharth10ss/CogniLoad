import React, { useMemo, useState, lazy, Suspense, useEffect } from 'react';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';
import { StatCard } from './StatCard';
import { InsightsBanner } from './InsightsBanner';
import { BrainAvatar } from './BrainAvatar';
import { CognitiveStateCard } from './CognitiveStateCard';
import { BackgroundLoadSlider } from './BackgroundLoadSlider';
import { ClosureBanner } from './ClosureBanner';
import { EndOfViewAffirmation } from './EndOfViewAffirmation';
import { SoftExitButton } from './SoftExitButton';
import { EmptyState } from './EmptyState';
import { CognitiveOffload } from './CognitiveOffload';
import { LoadingSpinner, SkeletonLoader } from './LoadingSpinner';
import { usePersistence, useTasksCompletedToday } from '../hooks/usePersistence';
import { useReturnVisit } from '../hooks/useReturnVisit';
import { calculateCognitiveLoad, calculateDailyLoad } from '../utils/cognitiveLoad';
import { Brain, Clock, Zap, Target } from 'lucide-react';

// Lazy load heavy components for bundle size optimization
const ActivityChart = lazy(() => import('./ActivityChart'));
const DailyLoadChart = lazy(() => import('./DailyLoadChart'));
const ZenMode = lazy(() => import('./ZenMode'));
const WeeklyCalendar = lazy(() => import('./WeeklyCalendar'));

export function Dashboard() {
    const [tasks, setTasks] = usePersistence('cogniload_tasks', []);
    const [backgroundLoad, setBackgroundLoad] = usePersistence('background_load_modifier', 0);
    const [zenTask, setZenTask] = useState(null);
    const [closureAction, setClosureAction] = useState(null);
    const [isExiting, setIsExiting] = useState(false);
    const [lastInteraction, setLastInteraction] = useState(Date.now());
    const [showInputOverride, setShowInputOverride] = useState(false); // New state to override empty view
    const [tasksCompletedToday, incrementCompleted] = useTasksCompletedToday();

    const returnState = useReturnVisit();

    // Determine empty state type
    const getEmptyStateType = () => {
        if (showInputOverride) return null; // Override if user wants to add tasks
        if (tasks.length === 0 && tasksCompletedToday > 0) {
            return 'all-done';
        }
        if (tasks.length === 0) {
            return 'no-tasks';
        }
        return null;
    };

    const emptyStateType = getEmptyStateType();

    const handleTaskComplete = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
        setZenTask(null);
        incrementCompleted();
        setClosureAction({ action: 'zen_completed', loadChange: 0, totalLoad: 0 });
        setLastInteraction(Date.now());
    };

    const handleTaskDelete = (id) => {
        const taskToDelete = tasks.find(t => t.id === id);
        const loadBefore = stats.totalLoad;
        setTasks(tasks.filter(t => t.id !== id));
        setLastInteraction(Date.now());
        // Closure will be triggered by stats recalculation
        setTimeout(() => {
            setClosureAction({ action: 'task_deleted', loadChange: -1, totalLoad: stats.totalLoad });
        }, 100);
    };

    const handleBackgroundLoadChange = (value) => {
        setBackgroundLoad(value);
        setLastInteraction(Date.now());
        setClosureAction({ action: 'background_adjusted', loadChange: 0, totalLoad: stats.totalLoad });
    };

    const handleSoftExit = () => {
        setIsExiting(true);
        setClosureAction({ action: 'soft_exit', loadChange: 0, totalLoad: stats.totalLoad });
    };

    // Calculate stats derived from tasks
    const stats = useMemo(() => {
        const { totalLoad, taskBreakdown } = calculateCognitiveLoad(tasks, Date.now(), { backgroundModifier: backgroundLoad });
        const dailyData = calculateDailyLoad(tasks);

        const totalDuration = tasks.reduce((acc, t) => acc + t.estimatedDuration, 0);
        const avgEffort = tasks.length > 0
            ? (tasks.reduce((acc, t) => acc + t.mentalEffort, 0) / tasks.length).toFixed(1)
            : 0;

        // Prepare chart data from breakdown
        const chartData = taskBreakdown.map((item, index) => {
            const task = tasks.find(t => t.id === item.taskId);
            return {
                name: task ? (task.title.length > 10 ? task.title.substring(0, 10) + '...' : task.title) : `Task ${index + 1}`,
                load: item.totalTaskLoad,
                // Color based on load intensity - Using pastel palette
                color: item.totalTaskLoad > 100 ? '#f2b5a6' : '#8ba88e', // Pastel Red (Coral) : Pastel Green (Sage)
            };
        });

        return {
            totalLoad: Math.round(totalLoad),
            totalDuration,
            avgEffort,
            count: tasks.length,
            chartData,
            dailyData
        };
    }, [tasks, backgroundLoad]);

    // Option 1 & 2: Store current load for diff and bookmark
    useEffect(() => {
        localStorage.setItem('current_total_load', stats.totalLoad.toString());
        localStorage.setItem('last_total_load', stats.totalLoad.toString());
    }, [stats.totalLoad]);

    return (
        <main className={`container mx-auto px-4 py-8 space-y-8 max-w-7xl animate-fade-in transition-opacity duration-1000 ${isExiting ? 'opacity-60' : 'opacity-100'}`}>
            {/* Greeting / Hero Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-4">
                <div className="flex items-center gap-6 w-full md:w-auto">
                    <BrainAvatar load={stats.totalLoad} lastInteraction={lastInteraction} />
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-text mb-2 tracking-tight font-sans">
                            Mindful <span className="text-teal-dark relative">
                                Balance
                                <span className="absolute bottom-1 left-0 w-full h-3 bg-teal-soft/30 -z-10 rounded-full"></span>
                            </span>
                        </h1>
                        <p className="text-muted text-lg">Your cognitive forecast for {new Date().toLocaleDateString(undefined, { weekday: 'long' })}.</p>
                    </div>
                </div>

                <div className="hidden md:block">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-sm text-sm font-medium text-muted border border-border">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-soft animate-pulse"></span>
                        System Online
                    </div>
                </div>
            </div>

            {/* Empty State Handling */}
            {emptyStateType ? (
                <div className="flex flex-col items-center">
                    {/* Layer 1: Cognitive State - Empty Variant */}
                    <CognitiveStateCard totalLoad={stats.totalLoad} taskCount={stats.count} emptyStateType={emptyStateType} />

                    {/* Chart Placeholder for no-tasks */}
                    {emptyStateType === 'no-tasks' && (
                        <div className="glass-panel p-8 rounded-[2rem] text-center mt-8 w-full max-w-2xl">
                            <div className="h-48 flex items-center justify-center relative">
                                <svg className="w-full h-full opacity-10" viewBox="0 0 400 100" preserveAspectRatio="none">
                                    <path
                                        d="M 0,50 Q 100,30 200,50 T 400,50"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeDasharray="5,5"
                                        className="text-muted"
                                    />
                                </svg>
                            </div>
                            <p className="text-xs text-muted/40 mt-4 font-medium">
                                Your cognitive landscape will appear here.
                            </p>
                        </div>
                    )}

                    {/* Insight for light-day */}
                    {emptyStateType === 'light-day' && (
                        <div className="text-center mt-8">
                            <p className="text-sm text-muted/50 font-medium">
                                Nothing urgent needs attention today.
                            </p>
                        </div>
                    )}

                    {/* Closure for all-done */}
                    {emptyStateType === 'all-done' && (
                        <div className="text-center py-4 mt-8">
                            <p className="text-base text-muted/60 font-medium">
                                You don't need to plan anything else.
                            </p>
                        </div>
                    )}

                    {/* Add Task Button to Resume Planning */}
                    <div className="mt-12">
                        <button
                            onClick={() => setShowInputOverride(true)}
                            className="btn-primary px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
                        >
                            <span className="text-lg">+</span>
                            {emptyStateType === 'all-done' ? 'Add Another Task' : 'Start Planning'}
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* Option 1: Cognitive Load Diff */}
                    {returnState.shouldShowLoadDiff && (
                        <div className="text-center py-3 mb-4">
                            <p className="text-sm text-muted/50 font-medium">
                                {returnState.loadDiffMessage}
                            </p>
                        </div>
                    )}

                    {/* Layer 1: Today's Cognitive State (Language-First Anchor) - HERO CARD */}
                    <div className="fade-in-stagger-1 hero-pulse">
                        <CognitiveStateCard totalLoad={stats.totalLoad} taskCount={stats.count} isHero={true} />
                    </div>

                    {/* Layer 2: Background Load (Non-Task Stress) */}
                    <div className="fade-in-stagger-2">
                        <BackgroundLoadSlider onChange={handleBackgroundLoadChange} />
                    </div>

                    {/* Bento Grid Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 fade-in-stagger-3">
                        {/* Large Hero Card for Load */}
                        <div className="md:col-span-2 row-span-1 h-full min-h-[180px]">
                            <StatCard
                                title="Cognitive Load"
                                value={stats.totalLoad}
                                subtext="Total Accumulated Pressure"
                                icon={Brain}
                                variant="teal"
                                trend={stats.totalLoad > 200 ? 'up' : 'down'}
                            />
                        </div>

                        <StatCard
                            title="Est. Duration"
                            value={`${Math.floor(stats.totalDuration / 60)}h ${stats.totalDuration % 60}m`}
                            subtext="Total Focus Time"
                            icon={Clock}
                            variant="lavender"
                        />

                        <StatCard
                            title="Active Tasks"
                            value={stats.count}
                            subtext="Items Pending"
                            icon={Target}
                            variant="coral"
                        />
                    </div>

                    {/* Zen Mode Overlay */}
                    {zenTask && (
                        <Suspense fallback={<LoadingSpinner text="Loading Zen Mode..." />}>
                            <ZenMode
                                task={zenTask}
                                onExit={() => setZenTask(null)}
                                onComplete={handleTaskComplete}
                            />
                        </Suspense>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left Column: Input and List */}
                        <div className="lg:col-span-5 space-y-12">
                            <section className="fade-in-stagger-4">
                                <TaskInput />
                            </section>
                            <section>
                                <TaskList onFocus={(task) => setZenTask(task)} onDelete={handleTaskDelete} />
                            </section>
                        </div>

                        {/* Right Column: Analytics */}
                        <div className="lg:col-span-7 space-y-6">
                            <InsightsBanner dailyData={stats.dailyData} tasks={tasks} />

                            <Suspense fallback={<SkeletonLoader type="chart" />}>
                                <DailyLoadChart data={stats.dailyData} />
                            </Suspense>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Suspense fallback={<SkeletonLoader type="chart" />}>
                                    <ActivityChart data={stats.chartData} />
                                </Suspense>

                                {/* Mini Legend Panel */}
                                <div className="glass-panel p-6 rounded-[2rem] text-sm text-muted space-y-4 flex flex-col justify-center bg-white/50">
                                    <h4 className="font-bold text-text text-lg">Metrics</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-teal-soft/30 flex items-center justify-center text-teal-dark font-bold text-xs">1</div>
                                            <span><strong>Base Load:</strong> Duration × Effort</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-lavender-soft/50 flex items-center justify-center text-lavender-dark font-bold text-xs">2</div>
                                            <span><strong>Distribution:</strong> 70% weighted on deadline</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-coral-soft/30 flex items-center justify-center text-coral-dark font-bold text-xs">3</div>
                                            <span><strong>Threshold:</strong> &lt;300 is healthy</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Weekly Calendar View */}
                    <section className="mt-8">
                        <Suspense fallback={<SkeletonLoader type="chart" />}>
                            <WeeklyCalendar tasks={tasks} />
                        </Suspense>
                    </section>

                    {/* Cognitive Offload - The Final Ritual */}
                    <section className="mt-12 mb-8 fade-in-stagger-7">
                        <CognitiveOffload />
                    </section>

                    {/* Closing Moments */}
                    <EndOfViewAffirmation />
                    <SoftExitButton onExit={handleSoftExit} />

                    {/* Layer 3: Closure Moments (Emotional Resolution) */}
                    <ClosureBanner
                        action={closureAction?.action}
                        loadChange={closureAction?.loadChange}
                        totalLoad={stats.totalLoad}
                    />
                </>
            )}
        </main>
    );
}
