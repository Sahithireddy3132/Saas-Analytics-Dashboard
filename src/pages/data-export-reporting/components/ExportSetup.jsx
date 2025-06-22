import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportSetup = ({ data, onChange, onNext }) => {
  const [selectedDataSource, setSelectedDataSource] = useState(data.dataSource || '');
  const [dateRange, setDateRange] = useState(data.dateRange || { start: '', end: '' });
  const [selectedMetrics, setSelectedMetrics] = useState(data.metrics || []);

  const dataSources = [
    {
      id: 'analytics',
      name: 'Analytics Database',
      description: 'User behavior, page views, and engagement metrics',
      icon: 'BarChart3',
      status: 'connected',
      lastSync: '2 minutes ago'
    },
    {
      id: 'revenue',
      name: 'Revenue Database',
      description: 'Subscription, billing, and financial data',
      icon: 'DollarSign',
      status: 'connected',
      lastSync: '5 minutes ago'
    },
    {
      id: 'customer',
      name: 'Customer Database',
      description: 'User profiles, support tickets, and satisfaction scores',
      icon: 'Users',
      status: 'connected',
      lastSync: '1 hour ago'
    },
    {
      id: 'marketing',
      name: 'Marketing Platform',
      description: 'Campaign performance, leads, and conversion data',
      icon: 'Target',
      status: 'warning',
      lastSync: '2 hours ago'
    }
  ];

  const availableMetrics = [
    { id: 'revenue', name: 'Revenue', category: 'Financial', description: 'Total revenue and MRR' },
    { id: 'users', name: 'Active Users', category: 'User Insights', description: 'DAU, MAU, and user growth' },
    { id: 'conversion', name: 'Conversion Rate', category: 'Marketing', description: 'Lead to customer conversion' },
    { id: 'churn', name: 'Churn Rate', category: 'Customer Success', description: 'Customer retention metrics' },
    { id: 'engagement', name: 'User Engagement', category: 'Product', description: 'Session duration and page views' },
    { id: 'support', name: 'Support Metrics', category: 'Customer Success', description: 'Ticket volume and resolution time' }
  ];

  const handleDataSourceSelect = (sourceId) => {
    setSelectedDataSource(sourceId);
    onChange({ dataSource: sourceId });
  };

  const handleDateRangeChange = (field, value) => {
    const newDateRange = { ...dateRange, [field]: value };
    setDateRange(newDateRange);
    onChange({ dateRange: newDateRange });
  };

  const handleMetricToggle = (metricId) => {
    const newMetrics = selectedMetrics.includes(metricId)
      ? selectedMetrics.filter(id => id !== metricId)
      : [...selectedMetrics, metricId];
    setSelectedMetrics(newMetrics);
    onChange({ metrics: newMetrics });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-success-600 bg-success-100';
      case 'warning':
        return 'text-warning-600 bg-warning-100';
      case 'error':
        return 'text-error-600 bg-error-100';
      default:
        return 'text-text-secondary bg-secondary-100';
    }
  };

  const canProceed = selectedDataSource && dateRange.start && dateRange.end && selectedMetrics.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-2">Export Setup</h2>
        <p className="text-text-secondary">Configure your data source and basic export settings</p>
      </div>

      {/* Data Source Selection */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3">Select Data Source</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataSources.map((source) => (
            <button
              key={source.id}
              onClick={() => handleDataSourceSelect(source.id)}
              className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                selectedDataSource === source.id
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500 ring-opacity-20' :'border-border hover:border-primary-300 hover:bg-secondary-25'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Icon name={source.icon} size={20} className="text-primary-600" />
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">{source.name}</h4>
                    <p className="text-xs text-text-secondary mt-1">{source.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(source.status)}`}>
                  {source.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>Last sync: {source.lastSync}</span>
                <Icon 
                  name={selectedDataSource === source.id ? "CheckCircle" : "Circle"} 
                  size={16} 
                  className={selectedDataSource === source.id ? "text-primary-600" : "text-text-secondary"} 
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Date Range Selection */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3">Date Range</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        
        {/* Quick Date Presets */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { label: 'Last 7 days', days: 7 },
            { label: 'Last 30 days', days: 30 },
            { label: 'Last 90 days', days: 90 },
            { label: 'This year', days: 365 }
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                const end = new Date().toISOString().split('T')[0];
                const start = new Date(Date.now() - preset.days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                setDateRange({ start, end });
                onChange({ dateRange: { start, end } });
              }}
              className="px-3 py-1 text-xs bg-secondary-100 text-secondary-700 rounded-full hover:bg-secondary-200 transition-colors duration-200"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Selection */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3">Select Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableMetrics.map((metric) => (
            <label
              key={metric.id}
              className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedMetrics.includes(metric.id)
                  ? 'border-primary-500 bg-primary-50' :'border-border hover:border-primary-300 hover:bg-secondary-25'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedMetrics.includes(metric.id)}
                onChange={() => handleMetricToggle(metric.id)}
                className="mt-0.5 h-4 w-4 text-primary-600 focus:ring-primary-500 border-border rounded"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-text-primary">{metric.name}</h4>
                  <span className="px-2 py-0.5 text-xs bg-secondary-100 text-secondary-700 rounded-full">
                    {metric.category}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-1">{metric.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      {canProceed && (
        <div className="bg-secondary-50 border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-2 flex items-center">
            <Icon name="Eye" size={16} className="mr-2" />
            Export Preview
          </h3>
          <div className="text-xs text-text-secondary space-y-1">
            <p><span className="font-medium">Data Source:</span> {dataSources.find(s => s.id === selectedDataSource)?.name}</p>
            <p><span className="font-medium">Date Range:</span> {dateRange.start} to {dateRange.end}</p>
            <p><span className="font-medium">Metrics:</span> {selectedMetrics.length} selected</p>
            <p><span className="font-medium">Estimated Rows:</span> ~{Math.floor(Math.random() * 10000) + 1000}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-6 py-2 rounded-lg font-medium flex items-center space-x-2 ${
            canProceed
              ? 'btn-primary' :'bg-secondary-200 text-secondary-500 cursor-not-allowed'
          }`}
        >
          <span>Next: Data Selection</span>
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  );
};

export default ExportSetup;