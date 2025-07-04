
import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Updated mock data for Suspect vs Alert Ratio chart to ensure January is included
const monthlyData = [
  { name: 'January', alert: 850, suspect: 1200 },
  { name: 'February', alert: 1100, suspect: 1300 },
  { name: 'March', alert: 1400, suspect: 1250 },
  { name: 'April', alert: 1100, suspect: 1050 },
  { name: 'May', alert: 1050, suspect: 1200 },
  { name: 'June', alert: 1050, suspect: 850 },
];

const SuspectAlertChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={monthlyData}>
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#9ca3af' }}
            axisLine={{ stroke: '#333340' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: '#9ca3af' }}
            axisLine={{ stroke: '#333340' }}
            tickLine={false}
            domain={[0, 2000]}
            ticks={[500, 750, 1000, 1250, 1500, 2000]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1A1A24', 
              borderColor: '#333340',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Bar dataKey="alert" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
          <Bar dataKey="suspect" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={40} />
          <Line 
            type="monotone" 
            dataKey="suspect" 
            stroke="#22c55e" 
            strokeWidth={2} 
            dot={false} 
            activeDot={false} 
            strokeDasharray="5 5"
          />
        </ComposedChart>
      </ResponsiveContainer>
      
      {/* Most Alerts Card - positioned better to match the image */}
      <div className="absolute top-16 right-8 w-56 bg-[#f8f8f8] text-black rounded-lg p-4 shadow-lg">
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center">
            <span className="text-lg font-semibold">Most Alerts</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-2">Suspicion Strategy</p>
        <p className="text-xs text-gray-600 mb-4">
          We need to improve the suspicion strategy which may help us to predict the vessels.
        </p>
        <div className="text-green-600 text-sm font-medium">+12%</div>
      </div>
    </div>
  );
};

export default SuspectAlertChart;