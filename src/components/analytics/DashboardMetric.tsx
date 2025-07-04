import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DashboardMetricProps {
  title: string;
  description: string;
  value: string;
  period?: string;
}

const DashboardMetric = ({ title, description, value, period = "Last 6 months" }: DashboardMetricProps) => {
  return (
    <div className="bg-[#202030] rounded-lg p-4 relative h-full flex flex-col">
      <div className="flex justify-between mb-2">
        <span className="text-xs text-gray-400">{period}</span>
        <ArrowRight size={16} className="text-gray-400" />
      </div>
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <p className="text-xs text-gray-400 mb-6 line-clamp-2">{description}</p>
      <div className="text-4xl font-light mt-auto">{value}</div>
    </div>
  );
};

export default DashboardMetric;