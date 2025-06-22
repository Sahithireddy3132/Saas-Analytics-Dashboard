import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from 'components/AppIcon';

const RoleDistributionChart = ({ users }) => {
  const roleDistribution = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(roleDistribution).map(([role, count]) => ({
    name: role,
    value: count,
    percentage: Math.round((count / users.length) * 100)
  }));

  const colors = {
    'Admin': '#DC2626',
    'Manager': '#1E40AF',
    'Analyst': '#0EA5E9',
    'Viewer': '#64748B'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-surface border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-text-primary">{data.name}</p>
          <p className="text-sm text-text-secondary">
            {data.value} users ({data.payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Role Distribution</h3>
        <Icon name="PieChart" size={20} className="text-text-secondary" />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.name] || '#64748B'} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[item.name] || '#64748B' }}
              />
              <span className="text-sm text-text-primary">{item.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-text-primary">{item.value}</span>
              <span className="text-xs text-text-secondary ml-1">({item.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleDistributionChart;