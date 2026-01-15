import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  trendUp
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-slate-500 text-sm font-medium tracking-wide">
          {label}
        </h3>
        <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
          <Icon size={20} />
        </div>
      </div>
      
      <div>
        <div className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          {value}
        </div>
        
        {trend && (
          <div className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold ${
            trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
          }`}>
            {trendUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
            {trend}
          </div>
        )}
      </div>
    </div>
  );
};