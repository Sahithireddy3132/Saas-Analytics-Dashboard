import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const DateRangeSelector = ({ selectedRange, onRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customRange, setCustomRange] = useState({ start: '', end: '' });
  const [showCustom, setShowCustom] = useState(false);
  const dropdownRef = useRef(null);

  const predefinedRanges = [
    { value: '7d', label: 'Last 7 days', description: 'Past week' },
    { value: '30d', label: 'Last 30 days', description: 'Past month' },
    { value: '90d', label: 'Last 90 days', description: 'Past quarter' },
    { value: '1y', label: 'Last year', description: 'Past 12 months' },
    { value: 'mtd', label: 'Month to date', description: 'Current month' },
    { value: 'qtd', label: 'Quarter to date', description: 'Current quarter' },
    { value: 'ytd', label: 'Year to date', description: 'Current year' }
  ];

  const getSelectedRangeLabel = () => {
    const range = predefinedRanges.find(r => r.value === selectedRange);
    return range ? range.label : 'Custom range';
  };

  const getDateRangeText = () => {
    const now = new Date();
    let startDate, endDate;

    switch (selectedRange) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        endDate = now;
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        endDate = now;
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        endDate = now;
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        endDate = now;
        break;
      case 'mtd':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = now;
        break;
      case 'qtd':
        const quarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), quarter * 3, 1);
        endDate = now;
        break;
      case 'ytd':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = now;
        break;
      default:
        return 'Custom range';
    }

    return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowCustom(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setShowCustom(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleRangeSelect = (range) => {
    onRangeChange(range);
    setIsOpen(false);
    setShowCustom(false);
  };

  const handleCustomRangeApply = () => {
    if (customRange.start && customRange.end) {
      onRangeChange('custom');
      setIsOpen(false);
      setShowCustom(false);
      console.log('Custom range applied:', customRange);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Date Range Button */}
      <button
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 px-4 py-2 border border-border rounded-lg transition-all duration-200 ${
          isOpen 
            ? 'bg-primary-50 border-primary-500 ring-2 ring-primary-500 ring-opacity-20' :'bg-surface hover:bg-secondary-50 hover:border-secondary-300'
        }`}
        aria-label="Select date range"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Icon name="Calendar" size={16} className="text-text-secondary" />
        <div className="flex flex-col items-start min-w-0">
          <span className="text-sm font-medium text-text-primary truncate">
            {getSelectedRangeLabel()}
          </span>
          <span className="text-xs text-text-secondary truncate">
            {getDateRangeText()}
          </span>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu animation-fade-in min-w-80">
          {!showCustom ? (
            <>
              {/* Predefined Ranges */}
              <div className="py-2">
                <div className="px-4 py-2 border-b border-border">
                  <h4 className="text-sm font-semibold text-text-primary">Quick Select</h4>
                </div>
                {predefinedRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => handleRangeSelect(range.value)}
                    className={`dropdown-item w-full text-left flex items-center justify-between ${
                      selectedRange === range.value ? 'bg-primary-50 text-primary-700' : ''
                    }`}
                  >
                    <div>
                      <div className="font-medium">{range.label}</div>
                      <div className="text-xs text-text-secondary">{range.description}</div>
                    </div>
                    {selectedRange === range.value && (
                      <Icon name="Check" size={16} className="text-primary-600" />
                    )}
                  </button>
                ))}
              </div>

              {/* Custom Range Option */}
              <div className="border-t border-border py-2">
                <button
                  onClick={() => setShowCustom(true)}
                  className="dropdown-item w-full text-left flex items-center space-x-3"
                >
                  <Icon name="Calendar" size={16} className="text-text-secondary" />
                  <span>Custom range</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Custom Range Form */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-text-primary">Custom Date Range</h4>
                  <button
                    onClick={() => setShowCustom(false)}
                    className="p-1 hover:bg-secondary-100 rounded transition-colors duration-200"
                  >
                    <Icon name="ArrowLeft" size={16} className="text-text-secondary" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={customRange.start}
                      onChange={(e) => setCustomRange(prev => ({ ...prev, start: e.target.value }))}
                      className="input-field w-full text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={customRange.end}
                      onChange={(e) => setCustomRange(prev => ({ ...prev, end: e.target.value }))}
                      className="input-field w-full text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <button
                    onClick={handleCustomRangeApply}
                    disabled={!customRange.start || !customRange.end}
                    className="btn-primary px-4 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setShowCustom(false)}
                    className="btn-secondary px-4 py-2 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;