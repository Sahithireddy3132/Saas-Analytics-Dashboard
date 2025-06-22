import React from 'react';
import Icon from 'components/AppIcon';

const RecentExports = () => {
  const recentExports = [
    {
      id: 1,
      name: 'Q4 Revenue Report',
      format: 'Excel',
      size: '2.4 MB',
      status: 'completed',
      createdAt: '2 hours ago',
      downloadUrl: '#'
    },
    {
      id: 2,
      name: 'User Analytics Dashboard',
      format: 'PDF',
      size: '1.8 MB',
      status: 'completed',
      createdAt: '1 day ago',
      downloadUrl: '#'
    },
    {
      id: 3,
      name: 'Monthly Conversion Data',
      format: 'CSV',
      size: '856 KB',
      status: 'processing',
      createdAt: '2 days ago',
      progress: 75
    },
    {
      id: 4,
      name: 'Customer Health Metrics',
      format: 'Excel',
      size: '3.1 MB',
      status: 'failed',
      createdAt: '3 days ago',
      error: 'Data source unavailable'
    },
    {
      id: 5,
      name: 'Product Usage Summary',
      format: 'PDF',
      size: '2.2 MB',
      status: 'completed',
      createdAt: '1 week ago',
      downloadUrl: '#'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-success-600' };
      case 'processing':
        return { icon: 'Clock', color: 'text-warning-600' };
      case 'failed':
        return { icon: 'XCircle', color: 'text-error-600' };
      default:
        return { icon: 'Circle', color: 'text-text-secondary' };
    }
  };

  const getFormatIcon = (format) => {
    switch (format.toLowerCase()) {
      case 'excel':
        return 'FileSpreadsheet';
      case 'pdf':
        return 'FileText';
      case 'csv':
        return 'Database';
      default:
        return 'File';
    }
  };

  const handleDownload = (exportItem) => {
    console.log('Downloading:', exportItem.name);
    // Implement download logic
  };

  const handleRerun = (exportItem) => {
    console.log('Re-running export:', exportItem.name);
    // Implement re-run logic
  };

  const handleDelete = (exportItem) => {
    console.log('Deleting export:', exportItem.name);
    // Implement delete logic
  };

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary flex items-center">
          <Icon name="History" size={16} className="mr-2" />
          Recent Exports
        </h3>
        <button className="text-xs text-accent-600 hover:text-accent-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {recentExports.map((exportItem) => {
          const statusInfo = getStatusIcon(exportItem.status);
          
          return (
            <div
              key={exportItem.id}
              className="p-3 border border-border rounded-lg hover:bg-secondary-25 transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <Icon 
                    name={getFormatIcon(exportItem.format)} 
                    size={16} 
                    className="text-text-secondary flex-shrink-0" 
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-text-primary truncate">
                      {exportItem.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-text-secondary">{exportItem.format}</span>
                      <span className="text-xs text-text-muted">•</span>
                      <span className="text-xs text-text-secondary">{exportItem.size}</span>
                    </div>
                  </div>
                </div>
                <Icon 
                  name={statusInfo.icon} 
                  size={16} 
                  className={`${statusInfo.color} flex-shrink-0`} 
                />
              </div>

              {/* Status and Progress */}
              <div className="mb-2">
                {exportItem.status === 'processing' && exportItem.progress && (
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                      <span>Processing...</span>
                      <span>{exportItem.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary-200 rounded-full h-1.5">
                      <div 
                        className="bg-warning-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${exportItem.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {exportItem.status === 'failed' && exportItem.error && (
                  <div className="mb-2 p-2 bg-error-50 border border-error-200 rounded text-xs text-error-700">
                    {exportItem.error}
                  </div>
                )}
              </div>

              {/* Actions and Timestamp */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">{exportItem.createdAt}</span>
                
                <div className="flex items-center space-x-1">
                  {exportItem.status === 'completed' && (
                    <button
                      onClick={() => handleDownload(exportItem)}
                      className="p-1 rounded hover:bg-secondary-100 transition-colors duration-200"
                      title="Download"
                    >
                      <Icon name="Download" size={12} className="text-text-secondary" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleRerun(exportItem)}
                    className="p-1 rounded hover:bg-secondary-100 transition-colors duration-200"
                    title="Re-run export"
                  >
                    <Icon name="RefreshCw" size={12} className="text-text-secondary" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(exportItem)}
                    className="p-1 rounded hover:bg-error-50 transition-colors duration-200"
                    title="Delete"
                  >
                    <Icon name="Trash2" size={12} className="text-text-secondary hover:text-error-600" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentExports;