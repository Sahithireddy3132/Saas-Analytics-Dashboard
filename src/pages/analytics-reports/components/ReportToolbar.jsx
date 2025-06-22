import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ReportToolbar = ({ 
  viewMode, 
  onViewModeChange, 
  dateRange, 
  onDateRangeChange, 
  selectedCategory 
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({
    start: dateRange.start.toISOString().split('T')[0],
    end: dateRange.end.toISOString().split('T')[0]
  });

  const reportTypes = [
    { value: 'summary', label: 'Summary', icon: 'BarChart3' },
    { value: 'detailed', label: 'Detailed', icon: 'FileText' },
    { value: 'comparison', label: 'Comparison', icon: 'GitCompare' },
    { value: 'trend', label: 'Trend Analysis', icon: 'TrendingUp' }
  ];

  const viewModes = [
    { value: 'chart', label: 'Chart View', icon: 'BarChart3' },
    { value: 'table', label: 'Table View', icon: 'Table' },
    { value: 'hybrid', label: 'Hybrid View', icon: 'Layout' }
  ];

  const quickDateRanges = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 days', value: 'last7days' },
    { label: 'Last 30 days', value: 'last30days' },
    { label: 'Last 90 days', value: 'last90days' },
    { label: 'This month', value: 'thismonth' },
    { label: 'Last month', value: 'lastmonth' }
  ];

  const handleQuickDateRange = (value) => {
    const now = new Date();
    let start, end;

    switch (value) {
      case 'today':
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        break;
      case 'yesterday':
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59);
        break;
      case 'last7days':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        end = now;
        break;
      case 'last30days':
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        end = now;
        break;
      case 'last90days':
        start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        end = now;
        break;
      case 'thismonth':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = now;
        break;
      case 'lastmonth':
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
        break;
      default:
        return;
    }

    onDateRangeChange({ start, end });
    setShowDatePicker(false);
  };

  const handleCustomDateRange = () => {
    const start = new Date(customDateRange.start);
    const end = new Date(customDateRange.end);
    onDateRangeChange({ start, end });
    setShowDatePicker(false);
  };

  const formatDateRange = () => {
    const start = dateRange.start.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    const end = dateRange.end.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    return `${start} - ${end}`;
  };

  return (
    <div className="bg-surface border-b border-border p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Report Type Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-text-primary">Report:</label>
            <select className="px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200">
              {reportTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Picker */}
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-surface border border-border rounded-lg hover:bg-secondary-25 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
            >
              <Icon name="Calendar" size={16} className="text-text-secondary" />
              <span className="text-text-primary">{formatDateRange()}</span>
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </button>

            {showDatePicker && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-text-primary mb-3">Select Date Range</h4>
                  
                  {/* Quick Ranges */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {quickDateRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => handleQuickDateRange(range.value)}
                        className="px-3 py-2 text-sm text-text-primary bg-secondary-25 hover:bg-secondary-50 rounded-lg transition-colors duration-200"
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>

                  {/* Custom Range */}
                  <div className="border-t border-border pt-4">
                    <h5 className="text-xs font-medium text-text-primary mb-2">Custom Range</h5>
                    <div className="flex space-x-2 mb-3">
                      <div className="flex-1">
                        <label className="block text-xs text-text-secondary mb-1">Start Date</label>
                        <input
                          type="date"
                          value={customDateRange.start}
                          onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                          className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-text-secondary mb-1">End Date</label>
                        <input
                          type="date"
                          value={customDateRange.end}
                          onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                          className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setShowDatePicker(false)}
                        className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCustomDateRange}
                        className="px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-secondary-50 rounded-lg p-1">
            {viewModes.map((mode) => (
              <button
                key={mode.value}
                onClick={() => onViewModeChange(mode.value)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                  viewMode === mode.value
                    ? 'bg-surface text-primary-600 shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                title={mode.label}
              >
                <Icon name={mode.icon} size={16} />
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              className="p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
              title="Refresh data"
            >
              <Icon name="RefreshCw" size={18} className="text-text-secondary" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
              title="Fullscreen"
            >
              <Icon name="Maximize2" size={18} className="text-text-secondary" />
            </button>
            <button
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <Icon name="Share2" size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View Mode Toggle */}
      <div className="sm:hidden mt-4 flex items-center bg-secondary-50 rounded-lg p-1">
        {viewModes.map((mode) => (
          <button
            key={mode.value}
            onClick={() => onViewModeChange(mode.value)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm rounded-md transition-all duration-200 ${
              viewMode === mode.value
                ? 'bg-surface text-primary-600 shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={mode.icon} size={16} />
            <span className="text-xs">{mode.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportToolbar;