import React from 'react';
import Icon from 'components/AppIcon';

const MetricCard = ({ metric }) => {
  const getColorClasses = (color, trend) => {
    const colorMap = {
      success: {
        bg: 'bg-success-50',
        icon: 'text-success-600',
        trend: trend === 'up' ? 'text-success-600' : 'text-error-600'
      },
      primary: {
        bg: 'bg-primary-50',
        icon: 'text-primary-600',
        trend: trend === 'up' ? 'text-success-600' : 'text-error-600'
      },
      warning: {
        bg: 'bg-warning-50',
        icon: 'text-warning-600',
        trend: trend === 'down' ? 'text-success-600' : 'text-error-600'
      },
      accent: {
        bg: 'bg-accent-50',
        icon: 'text-accent-600',
        trend: trend === 'up' ? 'text-success-600' : 'text-error-600'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  const colors = getColorClasses(metric.color, metric.trend);
  const trendIcon = metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown';

  return (
    <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
          <Icon name={metric.icon} size={24} className={colors.icon} />
        </div>
        <div className="flex items-center space-x-1">
          <Icon name={trendIcon} size={16} className={colors.trend} />
          <span className={`text-sm font-medium ${colors.trend}`}>
            {metric.change}
          </span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-text-primary">{metric.value}</h3>
        <p className="text-sm font-medium text-text-primary">{metric.title}</p>
        <p className="text-xs text-text-secondary">{metric.subtitle}</p>
      </div>

      {/* Mini trend indicator */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">Trend</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-secondary-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${metric.trend === 'up' ? 'bg-success-500' : 'bg-error-500'} rounded-full transition-all duration-300`}
                style={{ width: '75%' }}
              />
            </div>
            <span className="text-xs text-text-secondary">75%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;