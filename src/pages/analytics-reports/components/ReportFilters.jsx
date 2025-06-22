import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ReportFilters = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    dateRange: 'last30days',
    metrics: ['revenue', 'users'],
    segments: [],
    regions: [],
    plans: []
  });

  const filterOptions = {
    dateRange: [
      { value: 'today', label: 'Today' },
      { value: 'yesterday', label: 'Yesterday' },
      { value: 'last7days', label: 'Last 7 days' },
      { value: 'last30days', label: 'Last 30 days' },
      { value: 'last90days', label: 'Last 90 days' },
      { value: 'custom', label: 'Custom range' }
    ],
    metrics: [
      { value: 'revenue', label: 'Revenue', icon: 'DollarSign' },
      { value: 'users', label: 'Active Users', icon: 'Users' },
      { value: 'sessions', label: 'Sessions', icon: 'Activity' },
      { value: 'conversions', label: 'Conversions', icon: 'Target' },
      { value: 'churn', label: 'Churn Rate', icon: 'TrendingDown' }
    ],
    segments: [
      { value: 'new_users', label: 'New Users' },
      { value: 'returning_users', label: 'Returning Users' },
      { value: 'power_users', label: 'Power Users' },
      { value: 'at_risk', label: 'At Risk Users' }
    ],
    regions: [
      { value: 'north_america', label: 'North America' },
      { value: 'europe', label: 'Europe' },
      { value: 'asia_pacific', label: 'Asia Pacific' },
      { value: 'latin_america', label: 'Latin America' }
    ],
    plans: [
      { value: 'starter', label: 'Starter' },
      { value: 'professional', label: 'Professional' },
      { value: 'enterprise', label: 'Enterprise' }
    ]
  };

  const handleFilterChange = (category, value, isMultiple = false) => {
    let newFilters = { ...activeFilters };
    
    if (isMultiple) {
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
    } else {
      newFilters[category] = value;
    }
    
    setActiveFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: 'last30days',
      metrics: [],
      segments: [],
      regions: [],
      plans: []
    };
    setActiveFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.dateRange !== 'last30days') count++;
    count += activeFilters.metrics.length;
    count += activeFilters.segments.length;
    count += activeFilters.regions.length;
    count += activeFilters.plans.length;
    return count;
  };

  return (
    <div className="border-t border-border">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-text-primary">Filters</h3>
            {getActiveFilterCount() > 0 && (
              <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {getActiveFilterCount() > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-error-600 hover:text-error-700 font-medium transition-colors duration-200"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
            >
              <Icon 
                name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="text-text-secondary" 
              />
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4">
            {/* Date Range */}
            <div>
              <label className="block text-xs font-medium text-text-primary mb-2">
                Date Range
              </label>
              <select
                value={activeFilters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
              >
                {filterOptions.dateRange.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Metrics */}
            <div>
              <label className="block text-xs font-medium text-text-primary mb-2">
                Metrics
              </label>
              <div className="space-y-2">
                {filterOptions.metrics.map((metric) => (
                  <label key={metric.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.metrics.includes(metric.value)}
                      onChange={() => handleFilterChange('metrics', metric.value, true)}
                      className="w-4 h-4 text-primary-600 bg-surface border-border rounded focus:ring-primary-500 focus:ring-2 focus:ring-opacity-20"
                    />
                    <Icon name={metric.icon} size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">{metric.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* User Segments */}
            <div>
              <label className="block text-xs font-medium text-text-primary mb-2">
                User Segments
              </label>
              <div className="space-y-2">
                {filterOptions.segments.map((segment) => (
                  <label key={segment.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.segments.includes(segment.value)}
                      onChange={() => handleFilterChange('segments', segment.value, true)}
                      className="w-4 h-4 text-primary-600 bg-surface border-border rounded focus:ring-primary-500 focus:ring-2 focus:ring-opacity-20"
                    />
                    <span className="text-sm text-text-primary">{segment.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Regions */}
            <div>
              <label className="block text-xs font-medium text-text-primary mb-2">
                Regions
              </label>
              <div className="space-y-2">
                {filterOptions.regions.map((region) => (
                  <label key={region.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.regions.includes(region.value)}
                      onChange={() => handleFilterChange('regions', region.value, true)}
                      className="w-4 h-4 text-primary-600 bg-surface border-border rounded focus:ring-primary-500 focus:ring-2 focus:ring-opacity-20"
                    />
                    <span className="text-sm text-text-primary">{region.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Plans */}
            <div>
              <label className="block text-xs font-medium text-text-primary mb-2">
                Subscription Plans
              </label>
              <div className="space-y-2">
                {filterOptions.plans.map((plan) => (
                  <label key={plan.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.plans.includes(plan.value)}
                      onChange={() => handleFilterChange('plans', plan.value, true)}
                      className="w-4 h-4 text-primary-600 bg-surface border-border rounded focus:ring-primary-500 focus:ring-2 focus:ring-opacity-20"
                    />
                    <span className="text-sm text-text-primary capitalize">{plan.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportFilters;