import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const RevenueChart = ({ dateRange }) => {
  // Mock revenue data based on date range
  const getRevenueData = (range) => {
    const baseData = [
      { month: 'Jan', revenue: 85000, target: 90000, previousYear: 75000 },
      { month: 'Feb', revenue: 92000, target: 95000, previousYear: 82000 },
      { month: 'Mar', revenue: 98000, target: 100000, previousYear: 88000 },
      { month: 'Apr', revenue: 105000, target: 105000, previousYear: 95000 },
      { month: 'May', revenue: 112000, target: 110000, previousYear: 102000 },
      { month: 'Jun', revenue: 118000, target: 115000, previousYear: 108000 },
      { month: 'Jul', revenue: 125000, target: 120000, previousYear: 115000 },
      { month: 'Aug', revenue: 127450, target: 125000, previousYear: 120000 }
    ];

    if (range === '7d') {
      return [
        { month: 'Mon', revenue: 18000, target: 20000, previousYear: 16000 },
        { month: 'Tue', revenue: 22000, target: 20000, previousYear: 18000 },
        { month: 'Wed', revenue: 19500, target: 20000, previousYear: 17500 },
        { month: 'Thu', revenue: 24000, target: 20000, previousYear: 19000 },
        { month: 'Fri', revenue: 26500, target: 20000, previousYear: 21000 },
        { month: 'Sat', revenue: 15000, target: 20000, previousYear: 14000 },
        { month: 'Sun', revenue: 12000, target: 20000, previousYear: 11000 }
      ];
    }

    return baseData;
  };

  const data = getRevenueData(dateRange);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg shadow-lg p-4">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-text-secondary capitalize">
                  {entry.dataKey.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(59, 130, 246)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="rgb(59, 130, 246)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(16, 185, 129)" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="rgb(16, 185, 129)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="month" 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="rgb(59, 130, 246)"
            strokeWidth={3}
            fill="url(#revenueGradient)"
            dot={{ fill: 'rgb(59, 130, 246)', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: 'rgb(59, 130, 246)', strokeWidth: 2, fill: '#fff' }}
          />
          
          <Line
            type="monotone"
            dataKey="target"
            stroke="rgb(16, 185, 129)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            activeDot={{ r: 4, stroke: 'rgb(16, 185, 129)', strokeWidth: 2, fill: '#fff' }}
          />
          
          <Line
            type="monotone"
            dataKey="previousYear"
            stroke="rgb(156, 163, 175)"
            strokeWidth={2}
            strokeDasharray="2 2"
            dot={false}
            activeDot={{ r: 4, stroke: 'rgb(156, 163, 175)', strokeWidth: 2, fill: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary-500 rounded-full" />
          <span className="text-sm text-text-secondary">Current Revenue</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-success-500" style={{ borderTop: '2px dashed rgb(16, 185, 129)' }} />
          <span className="text-sm text-text-secondary">Target</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-secondary-400" style={{ borderTop: '2px dashed rgb(156, 163, 175)' }} />
          <span className="text-sm text-text-secondary">Previous Year</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;