import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FormatOptions = ({ data, onChange, onNext, onPrevious }) => {
  const [selectedFormat, setSelectedFormat] = useState(data.format || 'csv');
  const [formatSettings, setFormatSettings] = useState({
    csv: {
      delimiter: ',',
      includeHeaders: true,
      encoding: 'UTF-8'
    },
    excel: {
      includeCharts: false,
      multipleSheets: true,
      formatting: 'basic'
    },
    pdf: {
      layout: 'portrait',
      includeCharts: true,
      template: 'standard',
      pageSize: 'A4'
    },
    json: {
      format: 'pretty',
      includeMetadata: true
    }
  });

  const formatTypes = [
    {
      id: 'csv',
      name: 'CSV',
      description: 'Comma-separated values for spreadsheet applications',
      icon: 'FileSpreadsheet',
      size: 'Small',
      compatibility: 'Excel, Google Sheets, most tools',
      pros: ['Lightweight', 'Universal compatibility', 'Easy to process'],
      cons: ['No formatting', 'Limited data types']
    },
    {
      id: 'excel',
      name: 'Excel',
      description: 'Microsoft Excel workbook with formatting and charts',
      icon: 'FileSpreadsheet',
      size: 'Medium',
      compatibility: 'Excel, LibreOffice, Google Sheets',
      pros: ['Rich formatting', 'Multiple sheets', 'Built-in charts'],
      cons: ['Larger file size', 'Proprietary format']
    },
    {
      id: 'pdf',
      name: 'PDF Report',
      description: 'Formatted report with charts and visualizations',
      icon: 'FileText',
      size: 'Large',
      compatibility: 'Any PDF viewer',
      pros: ['Professional presentation', 'Print-ready', 'Secure'],
      cons: ['Not editable', 'Larger file size']
    },
    {
      id: 'json',
      name: 'JSON',
      description: 'Structured data format for API integration',
      icon: 'Code',
      size: 'Small',
      compatibility: 'APIs, web applications, databases',
      pros: ['Structured data', 'API-friendly', 'Preserves data types'],
      cons: ['Technical format', 'Not human-readable']
    }
  ];

  const handleFormatSelect = (formatId) => {
    setSelectedFormat(formatId);
    onChange({ format: formatId });
  };

  const handleSettingChange = (setting, value) => {
    const newSettings = {
      ...formatSettings,
      [selectedFormat]: {
        ...formatSettings[selectedFormat],
        [setting]: value
      }
    };
    setFormatSettings(newSettings);
    onChange({ formatSettings: newSettings });
  };

  const renderFormatSettings = () => {
    const settings = formatSettings[selectedFormat];
    
    switch (selectedFormat) {
      case 'csv':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-2">
                Delimiter
              </label>
              <select
                value={settings.delimiter}
                onChange={(e) => handleSettingChange('delimiter', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="\t">Tab</option>
                <option value="|">Pipe (|)</option>
              </select>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.includeHeaders}
                  onChange={(e) => handleSettingChange('includeHeaders', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-border rounded"
                />
                <span className="text-sm text-text-primary">Include column headers</span>
              </label>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-2">
                Encoding
              </label>
              <select
                value={settings.encoding}
                onChange={(e) => handleSettingChange('encoding', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="UTF-8">UTF-8</option>
                <option value="UTF-16">UTF-16</option>
                <option value="ASCII">ASCII</option>
              </select>
            </div>
          </div>
        );

      case 'excel':
        return (
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.includeCharts}
                  onChange={(e) => handleSettingChange('includeCharts', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-border rounded"
                />
                <span className="text-sm text-text-primary">Include charts and visualizations</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.multipleSheets}
                  onChange={(e) => handleSettingChange('multipleSheets', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-border rounded"
                />
                <span className="text-sm text-text-primary">Split data into multiple sheets</span>
              </label>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-2">
                Formatting Level
              </label>
              <select
                value={settings.formatting}
                onChange={(e) => handleSettingChange('formatting', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="basic">Basic formatting</option>
                <option value="enhanced">Enhanced formatting</option>
                <option value="professional">Professional formatting</option>
              </select>
            </div>
          </div>
        );

      case 'pdf':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-2">
                Page Layout
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['portrait', 'landscape'].map((layout) => (
                  <button
                    key={layout}
                    onClick={() => handleSettingChange('layout', layout)}
                    className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                      settings.layout === layout
                        ? 'border-primary-500 bg-primary-50 text-primary-700' :'border-border hover:border-primary-300 text-text-secondary'
                    }`}
                  >
                    <Icon 
                      name={layout === 'portrait' ? 'FileText' : 'Monitor'} 
                      size={20} 
                      className="mx-auto mb-1" 
                    />
                    <span className="text-xs font-medium capitalize">{layout}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.includeCharts}
                  onChange={(e) => handleSettingChange('includeCharts', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-border rounded"
                />
                <span className="text-sm text-text-primary">Include charts and visualizations</span>
              </label>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-2">
                Report Template
              </label>
              <select
                value={settings.template}
                onChange={(e) => handleSettingChange('template', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="standard">Standard Report</option>
                <option value="executive">Executive Summary</option>
                <option value="detailed">Detailed Analysis</option>
                <option value="custom">Custom Template</option>
              </select>
            </div>
          </div>
        );

      case 'json':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-2">
                JSON Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'compact', name: 'Compact', desc: 'Minified JSON' },
                  { id: 'pretty', name: 'Pretty', desc: 'Formatted JSON' }
                ].map((format) => (
                  <button
                    key={format.id}
                    onClick={() => handleSettingChange('format', format.id)}
                    className={`p-3 border rounded-lg text-left transition-all duration-200 ${
                      settings.format === format.id
                        ? 'border-primary-500 bg-primary-50' :'border-border hover:border-primary-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-text-primary">{format.name}</div>
                    <div className="text-xs text-text-secondary">{format.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.includeMetadata}
                  onChange={(e) => handleSettingChange('includeMetadata', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-border rounded"
                />
                <span className="text-sm text-text-primary">Include metadata and schema information</span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const selectedFormatInfo = formatTypes.find(f => f.id === selectedFormat);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-2">Format Options</h2>
        <p className="text-text-secondary">Choose your export format and customize the output settings</p>
      </div>

      {/* Format Selection */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-4">Export Format</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formatTypes.map((format) => (
            <button
              key={format.id}
              onClick={() => handleFormatSelect(format.id)}
              className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                selectedFormat === format.id
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500 ring-opacity-20' :'border-border hover:border-primary-300 hover:bg-secondary-25'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon name={format.icon} size={24} className="text-primary-600" />
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary">{format.name}</h4>
                    <p className="text-xs text-text-secondary">{format.description}</p>
                  </div>
                </div>
                <Icon 
                  name={selectedFormat === format.id ? "CheckCircle" : "Circle"} 
                  size={20} 
                  className={selectedFormat === format.id ? "text-primary-600" : "text-text-secondary"} 
                />
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-secondary">File Size:</span>
                  <span className="text-text-primary font-medium">{format.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Compatibility:</span>
                  <span className="text-text-primary font-medium text-right">{format.compatibility}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Format-specific Settings */}
      {selectedFormatInfo && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Format Settings</h3>
            <div className="card p-4">
              {renderFormatSettings()}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Format Details</h3>
            <div className="card p-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Advantages</h4>
                <ul className="space-y-1">
                  {selectedFormatInfo.pros.map((pro, index) => (
                    <li key={index} className="flex items-center space-x-2 text-xs text-success-700">
                      <Icon name="Check" size={12} />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Considerations</h4>
                <ul className="space-y-1">
                  {selectedFormatInfo.cons.map((con, index) => (
                    <li key={index} className="flex items-center space-x-2 text-xs text-warning-700">
                      <Icon name="AlertCircle" size={12} />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Preview */}
      <div className="bg-secondary-50 border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="Eye" size={16} className="mr-2" />
          Export Preview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-text-secondary">Format:</span>
            <p className="font-medium text-text-primary">{selectedFormatInfo?.name}</p>
          </div>
          <div>
            <span className="text-text-secondary">Estimated Size:</span>
            <p className="font-medium text-text-primary">~{Math.floor(Math.random() * 50) + 10} MB</p>
          </div>
          <div>
            <span className="text-text-secondary">Processing Time:</span>
            <p className="font-medium text-text-primary">~{Math.floor(Math.random() * 5) + 2} minutes</p>
          </div>
          <div>
            <span className="text-text-secondary">Compatibility:</span>
            <p className="font-medium text-text-primary">{selectedFormatInfo?.size} file</p>
          </div>
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
          <span>Next: Schedule Options</span>
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  );
};

export default FormatOptions;