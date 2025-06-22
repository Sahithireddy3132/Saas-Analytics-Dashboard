import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ReportSettings = () => {
  const [settings, setSettings] = useState({
    autoRefresh: true,
    refreshInterval: 300, // seconds
    showGridLines: true,
    showDataLabels: false,
    enableAnimations: true,
    colorScheme: 'default',
    chartHeight: 'medium',
    showLegend: true,
    enableTooltips: true,
    enableZoom: true
  });

  const [isExpanded, setIsExpanded] = useState(true);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const colorSchemes = [
    { value: 'default', label: 'Default', colors: ['#1E40AF', '#0EA5E9', '#059669'] },
    { value: 'warm', label: 'Warm', colors: ['#DC2626', '#D97706', '#F59E0B'] },
    { value: 'cool', label: 'Cool', colors: ['#0EA5E9', '#059669', '#8B5CF6'] },
    { value: 'monochrome', label: 'Monochrome', colors: ['#374151', '#6B7280', '#9CA3AF'] }
  ];

  const refreshIntervals = [
    { value: 60, label: '1 minute' },
    { value: 300, label: '5 minutes' },
    { value: 900, label: '15 minutes' },
    { value: 1800, label: '30 minutes' },
    { value: 3600, label: '1 hour' }
  ];

  const chartHeights = [
    { value: 'small', label: 'Small (300px)' },
    { value: 'medium', label: 'Medium (400px)' },
    { value: 'large', label: 'Large (500px)' },
    { value: 'extra-large', label: 'Extra Large (600px)' }
  ];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">Chart Settings</h3>
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

      {isExpanded && (
        <div className="space-y-6">
          {/* Auto Refresh */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-text-primary">Auto Refresh</label>
              <button
                onClick={() => handleSettingChange('autoRefresh', !settings.autoRefresh)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  settings.autoRefresh ? 'bg-primary' : 'bg-secondary-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    settings.autoRefresh ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {settings.autoRefresh && (
              <select
                value={settings.refreshInterval}
                onChange={(e) => handleSettingChange('refreshInterval', Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
              >
                {refreshIntervals.map((interval) => (
                  <option key={interval.value} value={interval.value}>
                    {interval.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Color Scheme */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Color Scheme
            </label>
            <div className="space-y-2">
              {colorSchemes.map((scheme) => (
                <label key={scheme.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="colorScheme"
                    value={scheme.value}
                    checked={settings.colorScheme === scheme.value}
                    onChange={(e) => handleSettingChange('colorScheme', e.target.value)}
                    className="w-4 h-4 text-primary-600 bg-surface border-border focus:ring-primary-500 focus:ring-2 focus:ring-opacity-20"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-primary">{scheme.label}</span>
                    <div className="flex space-x-1">
                      {scheme.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Chart Height */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Chart Height
            </label>
            <select
              value={settings.chartHeight}
              onChange={(e) => handleSettingChange('chartHeight', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
            >
              {chartHeights.map((height) => (
                <option key={height.value} value={height.value}>
                  {height.label}
                </option>
              ))}
            </select>
          </div>

          {/* Display Options */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Display Options</h4>
            <div className="space-y-3">
              {[
                { key: 'showGridLines', label: 'Show Grid Lines' },
                { key: 'showDataLabels', label: 'Show Data Labels' },
                { key: 'showLegend', label: 'Show Legend' },
                { key: 'enableAnimations', label: 'Enable Animations' },
                { key: 'enableTooltips', label: 'Enable Tooltips' },
                { key: 'enableZoom', label: 'Enable Zoom' }
              ].map((option) => (
                <label key={option.key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-text-primary">{option.label}</span>
                  <button
                    onClick={() => handleSettingChange(option.key, !settings[option.key])}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                      settings[option.key] ? 'bg-primary' : 'bg-secondary-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                        settings[option.key] ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-4 border-t border-border">
            <button
              onClick={() => setSettings({
                autoRefresh: true,
                refreshInterval: 300,
                showGridLines: true,
                showDataLabels: false,
                enableAnimations: true,
                colorScheme: 'default',
                chartHeight: 'medium',
                showLegend: true,
                enableTooltips: true,
                enableZoom: true
              })}
              className="w-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportSettings;