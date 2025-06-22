import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from 'components/AppIcon';

const ChartVisualization = ({ data, category }) => {
  const [chartType, setChartType] = useState('line');
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);

  const chartTypes = [
    { value: 'line', label: 'Line Chart', icon: 'TrendingUp' },
    { value: 'area', label: 'Area Chart', icon: 'Activity' },
    { value: 'bar', label: 'Bar Chart', icon: 'BarChart3' },
    { value: 'pie', label: 'Pie Chart', icon: 'PieChart' }
  ];

  const colors = {
    primary: '#1E40AF',
    secondary: '#0EA5E9',
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626'
  };

  const pieColors = [colors.primary, colors.secondary, colors.success, colors.warning, colors.error];

  const formatTooltip = (value, name, props) => {
    if (category === 'revenue') {
      return [`$${value.toLocaleString()}`, name];
    } else if (category === 'users') {
      return [`${value.toLocaleString()} users`, name];
    }
    return [value, name];
  };

  const formatYAxis = (value) => {
    if (category === 'revenue') {
      return `$${(value / 1000).toFixed(0)}k`;
    } else if (category === 'users') {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value;
  };

  const handleDataPointClick = (data, index) => {
    setSelectedDataPoint({ data, index });
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={formatYAxis}
            />
            <Tooltip 
              formatter={formatTooltip}
              labelStyle={{ color: '#1F2937' }}
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            {category === 'revenue' && (
              <>
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke={colors.primary} 
                  strokeWidth={3}
                  dot={{ fill: colors.primary, strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: colors.primary, strokeWidth: 2 }}
                  onClick={handleDataPointClick}
                />
                <Line 
                  type="monotone" 
                  dataKey="growth" 
                  stroke={colors.success} 
                  strokeWidth={2}
                  dot={{ fill: colors.success, strokeWidth: 2, r: 4 }}
                />
              </>
            )}
            {category === 'users' && (
              <>
                <Line 
                  type="monotone" 
                  dataKey="activeUsers" 
                  stroke={colors.primary} 
                  strokeWidth={3}
                  dot={{ fill: colors.primary, strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: colors.primary, strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="newUsers" 
                  stroke={colors.secondary} 
                  strokeWidth={2}
                  dot={{ fill: colors.secondary, strokeWidth: 2, r: 4 }}
                />
              </>
            )}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} tickFormatter={formatYAxis} />
            <Tooltip formatter={formatTooltip} />
            <Legend />
            {category === 'revenue' && (
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke={colors.primary} 
                fill={colors.primary}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            )}
            {category === 'users' && (
              <>
                <Area 
                  type="monotone" 
                  dataKey="activeUsers" 
                  stackId="1"
                  stroke={colors.primary} 
                  fill={colors.primary}
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="newUsers" 
                  stackId="1"
                  stroke={colors.secondary} 
                  fill={colors.secondary}
                  fillOpacity={0.6}
                />
              </>
            )}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} tickFormatter={formatYAxis} />
            <Tooltip formatter={formatTooltip} />
            <Legend />
            {category === 'revenue' && (
              <Bar 
                dataKey="revenue" 
                fill={colors.primary}
                radius={[4, 4, 0, 0]}
                onClick={handleDataPointClick}
              />
            )}
            {category === 'users' && (
              <>
                <Bar 
                  dataKey="activeUsers" 
                  fill={colors.primary}
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="newUsers" 
                  fill={colors.secondary}
                  radius={[4, 4, 0, 0]}
                />
              </>
            )}
          </BarChart>
        );

      case 'pie':
        const pieData = category === 'revenue' 
          ? data.map(item => ({ name: item.month, value: item.revenue }))
          : data.map(item => ({ name: item.month, value: item.activeUsers }));
        
        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={formatTooltip} />
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Chart Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {category === 'revenue' ? 'Revenue Analytics' : 'User Analytics'}
          </h3>
          
          {/* Chart Type Selector */}
          <div className="flex items-center bg-secondary-50 rounded-lg p-1">
            {chartTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setChartType(type.value)}
                className={`flex items-center space-x-1 px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                  chartType === type.value
                    ? 'bg-surface text-primary-600 shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                title={type.label}
              >
                <Icon name={type.icon} size={14} />
                <span className="hidden sm:inline">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isZoomed 
                ? 'bg-primary-50 text-primary-600' :'hover:bg-secondary-50 text-text-secondary'
            }`}
            title={isZoomed ? 'Reset zoom' : 'Zoom in'}
          >
            <Icon name={isZoomed ? 'ZoomOut' : 'ZoomIn'} size={16} />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-secondary-50 text-text-secondary transition-colors duration-200"
            title="Download chart"
          >
            <Icon name="Download" size={16} />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-secondary-50 text-text-secondary transition-colors duration-200"
            title="Chart settings"
          >
            <Icon name="Settings" size={16} />
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 p-4">
        <div className={`h-full transition-all duration-300 ${isZoomed ? 'scale-110' : 'scale-100'}`}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Point Details */}
      {selectedDataPoint && (
        <div className="p-4 border-t border-border bg-secondary-25">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-text-primary">
                Selected: {selectedDataPoint.data.month}
              </h4>
              <div className="flex items-center space-x-4 mt-1">
                {category === 'revenue' && (
                  <>
                    <span className="text-sm text-text-secondary">
                      Revenue: <span className="font-medium text-text-primary">
                        ${selectedDataPoint.data.revenue?.toLocaleString()}
                      </span>
                    </span>
                    <span className="text-sm text-text-secondary">
                      Growth: <span className={`font-medium ${
                        selectedDataPoint.data.growth >= 0 ? 'text-success-600' : 'text-error-600'
                      }`}>
                        {selectedDataPoint.data.growth}%
                      </span>
                    </span>
                  </>
                )}
                {category === 'users' && (
                  <>
                    <span className="text-sm text-text-secondary">
                      Active Users: <span className="font-medium text-text-primary">
                        {selectedDataPoint.data.activeUsers?.toLocaleString()}
                      </span>
                    </span>
                    <span className="text-sm text-text-secondary">
                      New Users: <span className="font-medium text-text-primary">
                        {selectedDataPoint.data.newUsers?.toLocaleString()}
                      </span>
                    </span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={() => setSelectedDataPoint(null)}
              className="p-1 rounded-lg hover:bg-secondary-100 text-text-secondary transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartVisualization;