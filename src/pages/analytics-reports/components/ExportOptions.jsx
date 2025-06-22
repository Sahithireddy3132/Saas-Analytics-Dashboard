import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportOptions = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [exportSettings, setExportSettings] = useState({
    format: 'pdf',
    includeCharts: true,
    includeData: true,
    includeFilters: true,
    pageOrientation: 'portrait',
    chartResolution: 'high',
    dateRange: true,
    branding: true
  });

  const [scheduleSettings, setScheduleSettings] = useState({
    enabled: false,
    frequency: 'weekly',
    dayOfWeek: 'monday',
    time: '09:00',
    recipients: ['']
  });

  const [shareSettings, setShareSettings] = useState({
    shareType: 'link',
    permissions: 'view',
    expiration: '7days',
    password: false
  });

  const exportFormats = [
    { value: 'pdf', label: 'PDF Document', icon: 'FileText', description: 'Best for reports and presentations' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: 'FileSpreadsheet', description: 'Best for data analysis' },
    { value: 'csv', label: 'CSV Data', icon: 'Database', description: 'Raw data export' },
    { value: 'png', label: 'PNG Image', icon: 'Image', description: 'Chart images only' },
    { value: 'json', label: 'JSON Data', icon: 'Code', description: 'API-friendly format' }
  ];

  const handleExportSettingChange = (key, value) => {
    setExportSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleScheduleSettingChange = (key, value) => {
    setScheduleSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleShareSettingChange = (key, value) => {
    setShareSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExport = () => {
    console.log('Exporting with settings:', exportSettings);
    // Implement export logic
  };

  const handleSchedule = () => {
    console.log('Scheduling with settings:', scheduleSettings);
    // Implement scheduling logic
  };

  const handleShare = () => {
    console.log('Sharing with settings:', shareSettings);
    // Implement sharing logic
  };

  return (
    <div className="border-t border-border">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">Export & Share</h3>
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
            {/* Export Section */}
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Export Report</h4>
              
              {/* Format Selection */}
              <div className="space-y-2 mb-4">
                {exportFormats.map((format) => (
                  <label key={format.value} className="flex items-start space-x-3 cursor-pointer p-2 rounded-lg hover:bg-secondary-25 transition-colors duration-200">
                    <input
                      type="radio"
                      name="exportFormat"
                      value={format.value}
                      checked={exportSettings.format === format.value}
                      onChange={(e) => handleExportSettingChange('format', e.target.value)}
                      className="w-4 h-4 text-primary-600 bg-surface border-border focus:ring-primary-500 focus:ring-2 focus:ring-opacity-20 mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Icon name={format.icon} size={16} className="text-text-secondary" />
                        <span className="text-sm font-medium text-text-primary">{format.label}</span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{format.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Export Options */}
              <div className="space-y-3 mb-4">
                <h5 className="text-xs font-medium text-text-primary">Include in Export</h5>
                {[
                  { key: 'includeCharts', label: 'Charts and Visualizations' },
                  { key: 'includeData', label: 'Raw Data Tables' },
                  { key: 'includeFilters', label: 'Applied Filters' },
                  { key: 'dateRange', label: 'Date Range Information' },
                  { key: 'branding', label: 'Company Branding' }
                ].map((option) => (
                  <label key={option.key} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-text-primary">{option.label}</span>
                    <input
                      type="checkbox"
                      checked={exportSettings[option.key]}
                      onChange={(e) => handleExportSettingChange(option.key, e.target.checked)}
                      className="w-4 h-4 text-primary-600 bg-surface border-border rounded focus:ring-primary-500 focus:ring-2 focus:ring-opacity-20"
                    />
                  </label>
                ))}
              </div>

              {/* Additional Settings */}
              {exportSettings.format === 'pdf' && (
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-1">
                      Page Orientation
                    </label>
                    <select
                      value={exportSettings.pageOrientation}
                      onChange={(e) => handleExportSettingChange('pageOrientation', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                onClick={handleExport}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <Icon name="Download" size={16} />
                <span>Export Now</span>
              </button>
            </div>

            {/* Schedule Section */}
            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-text-primary">Schedule Reports</h4>
                <button
                  onClick={() => handleScheduleSettingChange('enabled', !scheduleSettings.enabled)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                    scheduleSettings.enabled ? 'bg-primary' : 'bg-secondary-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                      scheduleSettings.enabled ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {scheduleSettings.enabled && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-1">
                      Frequency
                    </label>
                    <select
                      value={scheduleSettings.frequency}
                      onChange={(e) => handleScheduleSettingChange('frequency', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  {scheduleSettings.frequency === 'weekly' && (
                    <div>
                      <label className="block text-xs font-medium text-text-primary mb-1">
                        Day of Week
                      </label>
                      <select
                        value={scheduleSettings.dayOfWeek}
                        onChange={(e) => handleScheduleSettingChange('dayOfWeek', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
                      >
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={scheduleSettings.time}
                      onChange={(e) => handleScheduleSettingChange('time', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-1">
                      Recipients
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email addresses"
                      className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
                    />
                  </div>

                  <button
                    onClick={handleSchedule}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-700 transition-colors duration-200"
                  >
                    <Icon name="Clock" size={16} />
                    <span>Schedule Report</span>
                  </button>
                </div>
              )}
            </div>

            {/* Share Section */}
            <div className="border-t border-border pt-6">
              <h4 className="text-sm font-medium text-text-primary mb-3">Share Report</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-text-primary mb-1">
                    Share Method
                  </label>
                  <select
                    value={shareSettings.shareType}
                    onChange={(e) => handleShareSettingChange('shareType', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
                  >
                    <option value="link">Shareable Link</option>
                    <option value="email">Email Invitation</option>
                    <option value="embed">Embed Code</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-primary mb-1">
                    Permissions
                  </label>
                  <select
                    value={shareSettings.permissions}
                    onChange={(e) => handleShareSettingChange('permissions', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
                  >
                    <option value="view">View Only</option>
                    <option value="comment">View & Comment</option>
                    <option value="edit">View & Edit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-primary mb-1">
                    Link Expiration
                  </label>
                  <select
                    value={shareSettings.expiration}
                    onChange={(e) => handleShareSettingChange('expiration', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
                  >
                    <option value="1day">1 Day</option>
                    <option value="7days">7 Days</option>
                    <option value="30days">30 Days</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-text-primary">Password Protection</span>
                  <input
                    type="checkbox"
                    checked={shareSettings.password}
                    onChange={(e) => handleShareSettingChange('password', e.target.checked)}
                    className="w-4 h-4 text-primary-600 bg-surface border-border rounded focus:ring-primary-500 focus:ring-2 focus:ring-opacity-20"
                  />
                </label>

                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-success-700 transition-colors duration-200"
                >
                  <Icon name="Share2" size={16} />
                  <span>Generate Share Link</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportOptions;