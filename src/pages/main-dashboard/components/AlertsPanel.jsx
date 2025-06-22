import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AlertsPanel = ({ alerts }) => {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const getAlertIcon = (type) => {
    const iconMap = {
      warning: 'AlertTriangle',
      success: 'CheckCircle',
      info: 'Info',
      error: 'AlertCircle'
    };
    return iconMap[type] || 'Bell';
  };

  const getAlertColor = (type, priority) => {
    if (priority === 'high') return 'error';
    
    const colorMap = {
      warning: 'warning',
      success: 'success',
      info: 'accent',
      error: 'error'
    };
    return colorMap[type] || 'secondary';
  };

  const getColorClasses = (color) => {
    const colorMap = {
      error: 'bg-error-50 text-error-600 border-error-200',
      warning: 'bg-warning-50 text-warning-600 border-warning-200',
      success: 'bg-success-50 text-success-600 border-success-200',
      accent: 'bg-accent-50 text-accent-600 border-accent-200',
      secondary: 'bg-secondary-50 text-secondary-600 border-secondary-200'
    };
    return colorMap[color] || colorMap.secondary;
  };

  const getPriorityBadge = (priority) => {
    const badgeMap = {
      high: 'bg-error-100 text-error-700',
      medium: 'bg-warning-100 text-warning-700',
      low: 'bg-accent-100 text-accent-700'
    };
    return badgeMap[priority] || badgeMap.low;
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

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'priority') return alert.priority === 'high';
    return alert.type === filter;
  });

  const displayedAlerts = showAll ? filteredAlerts : filteredAlerts.slice(0, 3);

  const filterOptions = [
    { value: 'all', label: 'All Alerts', count: alerts.length },
    { value: 'priority', label: 'High Priority', count: alerts.filter(a => a.priority === 'high').length },
    { value: 'warning', label: 'Warnings', count: alerts.filter(a => a.type === 'warning').length },
    { value: 'success', label: 'Success', count: alerts.filter(a => a.type === 'success').length },
    { value: 'info', label: 'Info', count: alerts.filter(a => a.type === 'info').length }
  ];

  const handleDismissAlert = (alertId) => {
    console.log('Dismissing alert:', alertId);
    // In real app, this would update the alerts state
  };

  const handleViewDetails = (alertId) => {
    console.log('Viewing alert details:', alertId);
    // In real app, this would navigate to alert details or open modal
  };

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-text-primary">Alerts & Notifications</h3>
          {alerts.filter(a => a.priority === 'high').length > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-error-100 text-error-700 rounded-full">
              {alerts.filter(a => a.priority === 'high').length} urgent
            </span>
          )}
        </div>
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
            <Icon name="Settings" size={16} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {displayedAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={32} className="text-text-secondary mx-auto mb-2" />
            <p className="text-sm text-text-secondary">No alerts found</p>
            <p className="text-xs text-text-muted mt-1">You're all caught up!</p>
          </div>
        ) : (
          displayedAlerts.map((alert) => {
            const color = getAlertColor(alert.type, alert.priority);
            const colorClasses = getColorClasses(color);
            
            return (
              <div key={alert.id} className={`border rounded-lg p-4 ${colorClasses} transition-all duration-200 hover:shadow-md`}>
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon name={getAlertIcon(alert.type)} size={20} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-semibold truncate">
                            {alert.title}
                          </h4>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityBadge(alert.priority)}`}>
                            {alert.priority}
                          </span>
                        </div>
                        <p className="text-sm opacity-90 mb-2 line-clamp-2">
                          {alert.message}
                        </p>
                        <p className="text-xs opacity-75">
                          {formatTimestamp(alert.timestamp)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-1 ml-2">
                        <button
                          onClick={() => handleViewDetails(alert.id)}
                          className="p-1.5 hover:bg-black hover:bg-opacity-10 rounded transition-colors duration-200"
                          title="View details"
                        >
                          <Icon name="ExternalLink" size={14} />
                        </button>
                        <button
                          onClick={() => handleDismissAlert(alert.id)}
                          className="p-1.5 hover:bg-black hover:bg-opacity-10 rounded transition-colors duration-200"
                          title="Dismiss alert"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons for High Priority Alerts */}
                {alert.priority === 'high' && (
                  <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1.5 text-xs font-medium bg-white bg-opacity-20 hover:bg-opacity-30 rounded transition-colors duration-200">
                        Take Action
                      </button>
                      <button className="px-3 py-1.5 text-xs font-medium bg-white bg-opacity-10 hover:bg-opacity-20 rounded transition-colors duration-200">
                        Snooze
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Show More/Less Button */}
      {filteredAlerts.length > 3 && (
        <div className="mt-6 pt-4 border-t border-border">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full btn-secondary py-2 rounded-lg flex items-center justify-center space-x-2"
          >
            <span>{showAll ? 'Show Less' : `Show All (${filteredAlerts.length})`}</span>
            <Icon 
              name={showAll ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
            />
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <button className="text-sm text-accent-600 hover:text-accent-700 font-medium transition-colors duration-200">
            Configure Alerts
          </button>
          <button className="text-sm text-text-secondary hover:text-error-600 font-medium transition-colors duration-200">
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;