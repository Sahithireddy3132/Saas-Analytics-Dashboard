import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    userSegment: 'all',
    planType: 'all',
    region: 'all',
    status: 'all',
    revenueRange: { min: '', max: '' },
    dateJoined: 'all'
  });

  const [tempFilters, setTempFilters] = useState(filters);

  const filterOptions = {
    userSegment: [
      { value: 'all', label: 'All Users' },
      { value: 'new', label: 'New Users (< 30 days)' },
      { value: 'active', label: 'Active Users' },
      { value: 'churned', label: 'Churned Users' },
      { value: 'at_risk', label: 'At Risk Users' }
    ],
    planType: [
      { value: 'all', label: 'All Plans' },
      { value: 'free', label: 'Free Plan' },
      { value: 'basic', label: 'Basic Plan' },
      { value: 'pro', label: 'Pro Plan' },
      { value: 'enterprise', label: 'Enterprise Plan' }
    ],
    region: [
      { value: 'all', label: 'All Regions' },
      { value: 'north_america', label: 'North America' },
      { value: 'europe', label: 'Europe' },
      { value: 'asia_pacific', label: 'Asia Pacific' },
      { value: 'latin_america', label: 'Latin America' },
      { value: 'other', label: 'Other' }
    ],
    status: [
      { value: 'all', label: 'All Status' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'trial', label: 'Trial' },
      { value: 'cancelled', label: 'Cancelled' }
    ],
    dateJoined: [
      { value: 'all', label: 'All Time' },
      { value: 'last_7_days', label: 'Last 7 days' },
      { value: 'last_30_days', label: 'Last 30 days' },
      { value: 'last_90_days', label: 'Last 90 days' },
      { value: 'last_year', label: 'Last year' }
    ]
  };

  const handleFilterChange = (filterKey, value) => {
    setTempFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };

  const handleRevenueRangeChange = (type, value) => {
    setTempFilters(prev => ({
      ...prev,
      revenueRange: {
        ...prev.revenueRange,
        [type]: value
      }
    }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    console.log('Applying filters:', tempFilters);
    onClose();
  };

  const resetFilters = () => {
    const defaultFilters = {
      userSegment: 'all',
      planType: 'all',
      region: 'all',
      status: 'all',
      revenueRange: { min: '', max: '' },
      dateJoined: 'all'
    };
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'revenueRange') {
        if (value.min || value.max) count++;
      } else if (value !== 'all') {
        count++;
      }
    });
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Filter Panel */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-surface border-l border-border z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
              {activeFiltersCount > 0 && (
                <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                  {activeFiltersCount} active
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary-50 rounded-lg transition-colors duration-200"
              aria-label="Close filters"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* User Segment Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                User Segment
              </label>
              <div className="space-y-2">
                {filterOptions.userSegment.map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="userSegment"
                      value={option.value}
                      checked={tempFilters.userSegment === option.value}
                      onChange={(e) => handleFilterChange('userSegment', e.target.value)}
                      className="w-4 h-4 text-primary-600 border-border focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-primary">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Plan Type Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Plan Type
              </label>
              <select
                value={tempFilters.planType}
                onChange={(e) => handleFilterChange('planType', e.target.value)}
                className="input-field w-full"
              >
                {filterOptions.planType.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Region
              </label>
              <select
                value={tempFilters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
                className="input-field w-full"
              >
                {filterOptions.region.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {filterOptions.status.map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tempFilters.status === option.value}
                      onChange={() => handleFilterChange('status', option.value)}
                      className="w-4 h-4 text-primary-600 border-border rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-text-primary">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Revenue Range Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Monthly Revenue Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-text-secondary mb-1">Min ($)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={tempFilters.revenueRange.min}
                    onChange={(e) => handleRevenueRangeChange('min', e.target.value)}
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-secondary mb-1">Max ($)</label>
                  <input
                    type="number"
                    placeholder="No limit"
                    value={tempFilters.revenueRange.max}
                    onChange={(e) => handleRevenueRangeChange('max', e.target.value)}
                    className="input-field w-full"
                  />
                </div>
              </div>
            </div>

            {/* Date Joined Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Date Joined
              </label>
              <select
                value={tempFilters.dateJoined}
                onChange={(e) => handleFilterChange('dateJoined', e.target.value)}
                className="input-field w-full"
              >
                {filterOptions.dateJoined.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-border bg-secondary-25">
            <div className="flex items-center space-x-3">
              <button
                onClick={applyFilters}
                className="flex-1 btn-primary py-3 rounded-lg font-medium"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200"
              >
                Reset
              </button>
            </div>
            
            {activeFiltersCount > 0 && (
              <div className="mt-3 text-center">
                <p className="text-xs text-text-secondary">
                  {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;