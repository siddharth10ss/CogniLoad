import React, { useState } from 'react';
import { Download, Upload, AlertCircle } from 'lucide-react';

export function DataManager() {
    const [importing, setImporting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const exportData = () => {
        try {
            const data = {
                version: '1.0.0',
                exportDate: new Date().toISOString(),
                tasks: localStorage.getItem('cogniload_tasks'),
                backgroundLoad: localStorage.getItem('background_load_modifier'),
                lastVisit: localStorage.getItem('last_visit_timestamp'),
                lastTotalLoad: localStorage.getItem('last_total_load'),
                currentTotalLoad: localStorage.getItem('current_total_load'),
                tasksCompletedToday: localStorage.getItem('tasks_completed_today'),
                lastCompletionDate: localStorage.getItem('last_completion_date')
            };

            const blob = new Blob([JSON.stringify(data, null, 2)],
                { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `cogniload-backup-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);

            setSuccess('Data exported successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to export data. Please try again.');
            console.error('Export error:', err);
        }
    };

    const importData = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setImporting(true);
        setError('');

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                // Validate data structure
                if (!data.version || !data.exportDate) {
                    throw new Error('Invalid backup file format');
                }

                // Restore data to localStorage
                if (data.tasks) localStorage.setItem('cogniload_tasks', data.tasks);
                if (data.backgroundLoad) localStorage.setItem('background_load_modifier', data.backgroundLoad);
                if (data.lastVisit) localStorage.setItem('last_visit_timestamp', data.lastVisit);
                if (data.lastTotalLoad) localStorage.setItem('last_total_load', data.lastTotalLoad);
                if (data.currentTotalLoad) localStorage.setItem('current_total_load', data.currentTotalLoad);
                if (data.tasksCompletedToday) localStorage.setItem('tasks_completed_today', data.tasksCompletedToday);
                if (data.lastCompletionDate) localStorage.setItem('last_completion_date', data.lastCompletionDate);

                setSuccess('Data imported successfully! Refreshing...');
                setTimeout(() => window.location.reload(), 1500);
            } catch (err) {
                setError('Failed to import data. Please check the file format.');
                console.error('Import error:', err);
            } finally {
                setImporting(false);
            }
        };

        reader.onerror = () => {
            setError('Failed to read file. Please try again.');
            setImporting(false);
        };

        reader.readAsText(file);
    };

    return (
        <div className="space-y-4">
            <div className="glass-panel p-6">
                <h3 className="text-lg font-bold text-text mb-2">
                    Data Backup
                </h3>
                <p className="text-sm text-muted mb-6">
                    Export your data to keep a backup, or import from a previous backup.
                </p>

                <div className="space-y-3">
                    {/* Export Button */}
                    <button
                        onClick={exportData}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-teal-600 text-white rounded-xl font-medium text-base hover:bg-teal-700 transition-all shadow-sm hover:shadow-md"
                    >
                        <Download className="w-5 h-5" />
                        Export Data
                    </button>

                    {/* Import Button */}
                    <label className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-gray-300 text-text rounded-xl font-medium text-base hover:bg-gray-50 transition-all cursor-pointer shadow-sm hover:shadow-md">
                        <Upload className="w-5 h-5" />
                        {importing ? 'Importing...' : 'Import Data'}
                        <input
                            type="file"
                            accept=".json"
                            onChange={importData}
                            disabled={importing}
                            className="hidden"
                        />
                    </label>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700">{success}</p>
                    </div>
                )}
            </div>

            <div className="glass-panel p-4 bg-amber-50 border-amber-200">
                <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-amber-800">
                        <strong>Important:</strong> Your data is stored locally in your browser.
                        Export regularly to prevent data loss if you clear your browser cache.
                    </div>
                </div>
            </div>
        </div>
    );
}
