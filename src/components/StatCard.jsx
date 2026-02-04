import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import clsx from 'clsx';

export function StatCard({ title, value, subtext, icon: Icon, variant = 'default', trend }) {

    const getVariantStyles = (v) => {
        switch (v) {
            case 'teal': return 'bg-teal-soft/30 text-teal-dark shadow-sm border-teal-soft/20';
            case 'lavender': return 'bg-lavender-soft/50 text-lavender-dark shadow-sm border-lavender-soft/20';
            case 'coral': return 'bg-coral-soft/30 text-coral-dark shadow-sm border-coral-soft/20';
            case 'mint': return 'bg-[#CBF1F5] text-[#3a7ca5] shadow-sm border-[#CBF1F5]/20';
            case 'white': return 'bg-white text-text border border-gray-100 shadow-sm';
            default: return 'bg-white text-text border border-gray-100 shadow-sm';
        }
    };

    const getIconStyles = (v) => {
        switch (v) {
            case 'teal': return 'bg-white/80 text-teal-dark';
            case 'lavender': return 'bg-white/80 text-lavender-dark';
            case 'coral': return 'bg-white/80 text-coral-dark';
            case 'mint': return 'bg-white/80 text-[#3a7ca5]';
            case 'white': return 'bg-primary/10 text-primary';
            default: return 'bg-gray-50 text-text';
        }
    };

    return (
        <div className={clsx(
            "p-6 flex flex-col justify-between h-full rounded-[2rem] transition-all duration-300 hover:shadow-lg border",
            getVariantStyles(variant)
        )}>
            <div className="flex items-start justify-between mb-4">
                <div className={clsx("p-3 rounded-2xl shadow-sm backdrop-blur-sm", getIconStyles(variant))}>
                    {Icon && <Icon className="w-6 h-6" />}
                </div>
                {trend && (
                    <div className="bg-white/60 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm flex items-center gap-1">
                        {trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {trend === 'up' ? 'Rising' : 'Falling'}
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-4xl font-bold tracking-tighter mb-1 font-sans">{value}</h3>
                <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">{title}</p>
                <p className="text-sm font-medium opacity-80 leading-tight">{subtext}</p>
            </div>
        </div>
    );
}
