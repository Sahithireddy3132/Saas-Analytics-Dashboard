import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DataSelection = ({ data, onChange, onNext, onPrevious }) => {
  const [filters, setFilters] = useState(data.filters || {});
  const [showQueryBuilder, setShowQueryBuilder] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const filterOptions = [
    {
      id: 'user_segment',
      name: 'User Segment',
      type: 'select',
      options: ['All Users', 'Premium Users', 'Free Users', 'Trial Users', 'Churned Users']
    },
    {
      id: 'geography',
      name: 'Geography',
      type: 'multiselect',
      options: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa']
    },
    {
      id: 'device_type',
      name: 'Device Type',
      type: 'multiselect',
      options: ['Desktop', 'Mobile', 'Tablet']
    },
    {
      id: 'plan_type',
      name: 'Plan Type',
      type: 'multiselect',
      options: ['Basic', 'Professional', 'Enterprise', 'Custom']
    },
    {
      id: 'revenue_range',
      name: 'Revenue Range',
      type: 'range',
      min: 0,
      max: 10000,
      step: 100
    }
  ];

  const sampleData = [
    {
      date: '2024-01-15',
      revenue: 15420,
      users: 1250,
      conversion_rate: 3.2,
      churn_rate: 2.1,
      engagement_score: 78
    },
    {
      date: '2024-01-16',
      revenue: 16890,
      users: 1340,
      conversion_rate: 3.8,
      churn_rate: 1.9,
      engagement_score: 82
    },
    {
      date: '2024-01-17',
      revenue: 14230,
      users: 1180,
      conversion_rate: 2.9,
      churn_rate: 2.3,
      engagement_score: 75
    }
  ];

  const handleFilterChange = (filterId, value) => {
    const newFilters = { ...filters, [filterId]: value };
    setFilters(newFilters);
    onChange({ filters: newFilters });
  };

  const handlePreviewData = () => {
    setPreviewData(sampleData);
  };

  const renderFilterInput = (filter) => {
    switch (filter.type) {
      case 'select':
        return (
          <select
            value={filters[filter.id] || ''}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select {filter.name}</option>
            {filter.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'multiselect':
        return (
          <div className="space-y-2">
            {filter.options.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(filters[filter.id] || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = filters[filter.id] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleFilterChange(filter.id, newValues);
                  }}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-border rounded"
                />
                <span className="text-sm text-text-primary">{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'range':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters[filter.id]?.min || ''}
                onChange={(e) => handleFilterChange(filter.id, { 
                  ...filters[filter.id], 
                  min: e.target.value 
                })}
                className="flex-1 px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="text-text-secondary">to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters[filter.id]?.max || ''}
                onChange={(e) => handleFilterChange(filter.id, { 
                  ...filters[filter.id], 
                  max: e.target.value 
                })}
                className="flex-1 px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-2">Data Selection</h2>
        <p className="text-text-secondary">Apply filters and configure your data selection criteria</p>
      </div>

      {/* Filter Options */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">Filters</h3>
          <button
            onClick={() => setShowQueryBuilder(!showQueryBuilder)}
            className="text-xs text-accent-600 hover:text-accent-700 font-medium flex items-center space-x-1"
          >
            <Icon name="Code" size={14} />
            <span>{showQueryBuilder ? 'Hide' : 'Show'} Query Builder</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filterOptions.map((filter) => (
            <div key={filter.id} className="space-y-2">
              <label className="block text-xs font-medium text-text-secondary">
                {filter.name}
              </label>
              {renderFilterInput(filter)}
            </div>
          ))}
        </div>
      </div>

      {/* Query Builder */}
      {showQueryBuilder && (
        <div className="bg-secondary-50 border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="Code" size={16} className="mr-2" />
            Visual Query Builder
          </h3>
          <div className="bg-surface border border-border rounded p-3 font-mono text-sm">
            <div className="text-text-secondary">
              SELECT {data.metrics?.join(', ') || '*'}
              <br />
              FROM {data.dataSource || 'data_source'}
              <br />
              WHERE date BETWEEN '{data.dateRange?.start}' AND '{data.dateRange?.end}'
              {Object.keys(filters).length > 0 && (
                <>
                  <br />
                  {Object.entries(filters).map(([key, value]) => (
                    <span key={key}>
                      AND {key} = '{Array.isArray(value) ? value.join(', ') : value}'<br />
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Data Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">Data Preview</h3>
          <button
            onClick={handlePreviewData}
            className="btn-secondary px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Icon name="Eye" size={16} />
            <span>Preview Data</span>
          </button>
        </div>

        {previewData ? (
          <div className="bg-surface border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-secondary-50 border-b border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">
                  Sample Data ({previewData.length} rows shown)
                </span>
                <span className="text-xs text-text-secondary">
                  Estimated total: ~{Math.floor(Math.random() * 10000) + 1000} rows
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary-25">
                  <tr>
                    {Object.keys(previewData[0]).map((column) => (
                      <th key={column} className="px-4 py-3 text-left font-medium text-text-primary">
                        {column.replace('_', ' ').toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index} className="border-t border-border">
                      {Object.values(row).map((value, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-3 text-text-secondary">
                          {typeof value === 'number' ? value.toLocaleString() : value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-secondary-50 border border-border rounded-lg p-8 text-center">
            <Icon name="Database" size={32} className="text-text-secondary mx-auto mb-3" />
            <p className="text-sm text-text-secondary mb-2">No preview available</p>
            <p className="text-xs text-text-muted">Click "Preview Data" to see a sample of your filtered data</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-2 flex items-center">
          <Icon name="Info" size={16} className="mr-2" />
          Selection Summary
        </h3>
        <div className="text-xs text-text-secondary space-y-1">
          <p><span className="font-medium">Active Filters:</span> {Object.keys(filters).length}</p>
          <p><span className="font-medium">Estimated Export Size:</span> ~{Math.floor(Math.random() * 50) + 10} MB</p>
          <p><span className="font-medium">Processing Time:</span> ~{Math.floor(Math.random() * 5) + 2} minutes</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="btn-secondary px-6 py-2 rounded-lg font-medium flex items-center space-x-2"
        >
          <Icon name="ChevronLeft" size={16} />
          <span>Previous</span>
        </button>
        <button
          onClick={onNext}
          className="btn-primary px-6 py-2 rounded-lg font-medium flex items-center space-x-2"
        >
          <span>Next: Format Options</span>
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  );
};

export default DataSelection;