import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const ExportProgress = () => {
  const [activeExports, setActiveExports] = useState([
    {
      id: 1,
      name: 'Q4 Revenue Analysis',
      status: 'processing',
      progress: 65,
      startTime: new Date(Date.now() - 2 * 60 * 1000),
      estimatedCompletion: new Date(Date.now() + 3 * 60 * 1000),
      format: 'Excel',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'User Engagement Report',
      status: 'queued',
      progress: 0,
      startTime: null,
      estimatedCompletion: new Date(Date.now() + 8 * 60 * 1000),
      format: 'PDF',
      size: '1.8 MB'
    }
  ]);

  const [completedExports, setCompletedExports] = useState([
    {
      id: 3,
      name: 'Monthly Conversion Data',
      status: 'completed',
      progress: 100,
      completedTime: new Date(Date.now() - 30 * 60 * 1000),
      format: 'CSV',
      size: '856 KB',
      downloadUrl: '#'
    }
  ]);

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExports(prev => 
        prev.map(exportItem => {
          if (exportItem.status === 'processing' && exportItem.progress < 100) {
            const newProgress = Math.min(exportItem.progress + Math.random() * 10, 100);
            if (newProgress >= 100) {
              // Move to completed
              setTimeout(() => {
                setCompletedExports(completed => [...completed, {
                  ...exportItem,
                  status: 'completed',
                  progress: 100,
                  completedTime: new Date(),
                  downloadUrl: '#'
                }]);
                setActiveExports(active => active.filter(e => e.id !== exportItem.id));
              }, 1000);
            }
            return { ...exportItem, progress: newProgress };
          }
          return exportItem;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return { icon: 'Loader', color: 'text-warning-600', spin: true };
      case 'queued':
        return { icon: 'Clock', color: 'text-text-secondary', spin: false };
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-success-600', spin: false };
      case 'failed':
        return { icon: 'XCircle', color: 'text-error-600', spin: false };
      default:
        return { icon: 'Circle', color: 'text-text-secondary', spin: false };
    }
  };

  const formatTimeRemaining = (estimatedCompletion) => {
    const now = new Date();
    const diff = estimatedCompletion - now;
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes <= 0) return 'Completing...';
    if (minutes < 60) return `${minutes}m remaining`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m remaining`;
  };

  const handleCancelExport = (exportId) => {
    setActiveExports(prev => prev.filter(e => e.id !== exportId));
  };

  const handleDownload = (exportItem) => {
    console.log('Downloading:', exportItem.name);
    // Implement download logic
  };

  const handleRetry = (exportItem) => {
    setActiveExports(prev => [...prev, {
      ...exportItem,
      id: Date.now(),
      status: 'processing',
      progress: 0,
      startTime: new Date()
    }]);
  };

  if (activeExports.length === 0 && completedExports.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Active Exports */}
      {activeExports.length > 0 && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="Activity" size={20} className="mr-2" />
            Active Exports ({activeExports.length})
          </h3>
          
          <div className="space-y-4">
            {activeExports.map((exportItem) => {
              const statusInfo = getStatusIcon(exportItem.status);
              
              return (
                <div key={exportItem.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={statusInfo.icon} 
                        size={20} 
                        className={`${statusInfo.color} ${statusInfo.spin ? 'animate-spin' : ''}`} 
                      />
                      <div>
                        <h4 className="text-sm font-medium text-text-primary">{exportItem.name}</h4>
                        <div className="flex items-center space-x-4 text-xs text-text-secondary mt-1">
                          <span>{exportItem.format}</span>
                          <span>•</span>
                          <span>{exportItem.size}</span>
                          {exportItem.startTime && (
                            <>
                              <span>•</span>
                              <span>Started {exportItem.startTime.toLocaleTimeString()}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {exportItem.status === 'processing' && (
                        <button
                          onClick={() => handleCancelExport(exportItem.id)}
                          className="text-xs text-error-600 hover:text-error-700 font-medium"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {exportItem.status === 'processing' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary">
                          {exportItem.progress.toFixed(0)}% complete
                        </span>
                        <span className="text-text-secondary">
                          {formatTimeRemaining(exportItem.estimatedCompletion)}
                        </span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div 
                          className="bg-warning-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${exportItem.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {exportItem.status === 'queued' && (
                    <div className="text-xs text-text-secondary">
                      Queued - {formatTimeRemaining(exportItem.estimatedCompletion)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Exports */}
      {completedExports.length > 0 && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="CheckCircle" size={20} className="mr-2" />
            Recent Completions
          </h3>
          
          <div className="space-y-3">
            {completedExports.slice(0, 3).map((exportItem) => (
              <div key={exportItem.id} className="flex items-center justify-between p-3 bg-success-50 border border-success-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success-600" />
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">{exportItem.name}</h4>
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <span>{exportItem.format}</span>
                      <span>•</span>
                      <span>{exportItem.size}</span>
                      <span>•</span>
                      <span>Completed {exportItem.completedTime.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDownload(exportItem)}
                    className="btn-primary px-3 py-1 rounded text-xs flex items-center space-x-1"
                  >
                    <Icon name="Download" size={12} />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={() => handleRetry(exportItem)}
                    className="btn-secondary px-3 py-1 rounded text-xs flex items-center space-x-1"
                  >
                    <Icon name="RefreshCw" size={12} />
                    <span>Re-run</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {completedExports.length > 3 && (
            <div className="mt-4 text-center">
              <button className="text-sm text-accent-600 hover:text-accent-700 font-medium">
                View all completed exports
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExportProgress;