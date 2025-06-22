import React from 'react';
import Icon from 'components/AppIcon';

const UserAcquisitionFunnel = () => {
  const funnelData = [
    {
      stage: 'Visitors',
      count: 45280,
      percentage: 100,
      color: 'bg-accent-500',
      icon: 'Eye'
    },
    {
      stage: 'Sign-ups',
      count: 8950,
      percentage: 19.8,
      color: 'bg-primary-500',
      icon: 'UserPlus'
    },
    {
      stage: 'Trial Users',
      count: 6720,
      percentage: 14.8,
      color: 'bg-warning-500',
      icon: 'Clock'
    },
    {
      stage: 'Paid Users',
      count: 1680,
      percentage: 3.7,
      color: 'bg-success-500',
      icon: 'CreditCard'
    }
  ];

  const getBarWidth = (percentage) => {
    return Math.max(percentage, 10); // Minimum 10% width for visibility
  };

  return (
    <div className="space-y-6">
      {funnelData.map((stage, index) => (
        <div key={stage.stage} className="relative">
          {/* Stage Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 ${stage.color} rounded-lg flex items-center justify-center`}>
                <Icon name={stage.icon} size={16} color="white" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">{stage.stage}</h4>
                <p className="text-xs text-text-secondary">{stage.percentage.toFixed(1)}% conversion</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-text-primary">{stage.count.toLocaleString()}</p>
              {index > 0 && (
                <p className="text-xs text-text-secondary">
                  -{((funnelData[index-1].count - stage.count) / funnelData[index-1].count * 100).toFixed(1)}% drop
                </p>
              )}
            </div>
          </div>

          {/* Funnel Bar */}
          <div className="relative h-12 bg-secondary-100 rounded-lg overflow-hidden">
            <div 
              className={`h-full ${stage.color} transition-all duration-500 ease-out flex items-center justify-center`}
              style={{ width: `${getBarWidth(stage.percentage)}%` }}
            >
              <span className="text-white text-sm font-medium">
                {stage.count.toLocaleString()}
              </span>
            </div>
            
            {/* Percentage Label */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-sm font-medium text-text-primary">
                {stage.percentage.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Connector Arrow */}
          {index < funnelData.length - 1 && (
            <div className="flex justify-center my-2">
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </div>
          )}
        </div>
      ))}

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-success-600">3.7%</p>
            <p className="text-xs text-text-secondary">Overall Conversion</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">25%</p>
            <p className="text-xs text-text-secondary">Trial to Paid</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAcquisitionFunnel;