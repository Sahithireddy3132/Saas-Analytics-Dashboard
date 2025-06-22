import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = ({ activities }) => {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const getActivityIcon = (type) => {
    const iconMap = {
      user_signup: 'UserPlus',
      payment: 'CreditCard',
      churn: 'UserMinus',
      upgrade: 'TrendingUp',
      downgrade: 'TrendingDown',
      login: 'LogIn',
      feature_usage: 'Zap'
    };
    return iconMap[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      user_signup: 'success',
      payment: 'primary',
      churn: 'error',
      upgrade: 'accent',
      downgrade: 'warning',
      login: 'secondary',
      feature_usage: 'primary'
    };
    return colorMap[type] || 'secondary';
  };

  const getColorClasses = (color) => {
    const colorMap = {
      success: 'bg-success-50 text-success-600',
      primary: 'bg-primary-50 text-primary-600',
      error: 'bg-error-50 text-error-600',
      accent: 'bg-accent-50 text-accent-600',
      warning: 'bg-warning-50 text-warning-600',
      secondary: 'bg-secondary-50 text-secondary-600'
    };
    return colorMap[color] || colorMap.secondary;
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter;
  });

  const displayedActivities = showAll ? filteredActivities : filteredActivities.slice(0, 5);

  const filterOptions = [
    { value: 'all', label: 'All Activities', count: activities.length },
    { value: 'user_signup', label: 'Sign-ups', count: activities.filter(a => a.type === 'user_signup').length },
    { value: 'payment', label: 'Payments', count: activities.filter(a => a.type === 'payment').length },
    { value: 'churn', label: 'Churn', count: activities.filter(a => a.type === 'churn').length },
    { value: 'upgrade', label: 'Upgrades', count: activities.filter(a => a.type === 'upgrade').length }
  ];

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <div className="flex items-center space-x-2">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field text-sm"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.count})
              </option>
            ))}
          </select>
          <button className="p-2 hover:bg-secondary-50 rounded-lg transition-colors duration-200">
            <Icon name="MoreHorizontal" size={16} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {displayedActivities.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={32} className="text-text-secondary mx-auto mb-2" />
            <p className="text-sm text-text-secondary">No activities found</p>
          </div>
        ) : (
          displayedActivities.map((activity) => {
            const color = getActivityColor(activity.type);
            const colorClasses = getColorClasses(color);
            
            return (
              <div key={activity.id} className="flex items-start space-x-4 p-3 hover:bg-secondary-25 rounded-lg transition-colors duration-200">
                {/* Icon */}
                <div className={`w-10 h-10 ${colorClasses} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={getActivityIcon(activity.type)} size={18} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-text-primary truncate">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                        {activity.description}
                      </p>
                      <p className="text-xs text-text-muted mt-2">
                        {formatTimestamp(activity.timestamp)}
                      </p>
                    </div>
                    <button className="p-1 hover:bg-secondary-100 rounded transition-colors duration-200 ml-2">
                      <Icon name="ExternalLink" size={14} className="text-text-secondary" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Show More/Less Button */}
      {filteredActivities.length > 5 && (
        <div className="mt-6 pt-4 border-t border-border">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full btn-secondary py-2 rounded-lg flex items-center justify-center space-x-2"
          >
            <span>{showAll ? 'Show Less' : `Show All (${filteredActivities.length})`}</span>
            <Icon 
              name={showAll ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
            />
          </button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-success-600">
              {activities.filter(a => a.type === 'user_signup').length}
            </p>
            <p className="text-xs text-text-secondary">New Sign-ups Today</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-primary-600">
              {activities.filter(a => a.type === 'payment').length}
            </p>
            <p className="text-xs text-text-secondary">Payments Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;