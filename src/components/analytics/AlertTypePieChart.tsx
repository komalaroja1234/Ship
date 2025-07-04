import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for Alerts By Type pie chart
const alertTypeData = [
  { name: 'AIS Off', value: 35, color: '#4ade80' },
  { name: 'Restricted Zone', value: 25, color: '#a78bfa' },
  { name: 'Speeding', value: 20, color: '#60a5fa' },
  { name: 'Loitering', value: 20, color: '#2dd4bf' },
];

const AlertTypePieChart = () => {
  return (
    <div className="h-80 flex justify-center items-center relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={alertTypeData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {alertTypeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1A1A24', 
              borderColor: '#333340',
              borderRadius: '8px'
            }}
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            formatter={(value) => <span style={{color: '#9ca3af'}}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="text-center">
          <div className="text-5xl font-bold">12</div>
        </div>
      </div>
      
      {/* AIS Off Info Box */}
      <div className="absolute top-10 right-6 w-56 bg-[#1c1c28] rounded-lg p-3 shadow-lg border border-gray-800">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium">AIS OFF {'>'} 3 HRS</span>
        </div>
        <p className="text-xs text-gray-400 mb-2">
          Growth Strategy
        </p>
        <p className="text-xs text-gray-400">
          This rule has been skipped by more than 63 vessels on this route.
        </p>
        <div className="mt-3 flex items-center text-xs">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
          <span className="text-gray-300">Action required</span>
        </div>
      </div>
    </div>
  );
};

export default AlertTypePieChart;