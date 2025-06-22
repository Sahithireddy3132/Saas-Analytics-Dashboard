import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SavedReports = ({ selectedReport, onReportSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const savedReports = [
    {
      id: 1,
      name: 'Monthly Revenue Summary',
      category: 'revenue',
      lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isScheduled: true,
      isShared: false,
      owner: 'You',
      description: 'Comprehensive monthly revenue analysis with growth metrics'
    },
    {
      id: 2,
      name: 'User Engagement Trends',
      category: 'users',
      lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isScheduled: false,
      isShared: true,
      owner: 'Sarah Johnson',
      description: 'Weekly user activity and engagement patterns'
    },
    {
      id: 3,
      name: 'Churn Analysis Q2',
      category: 'revenue',
      lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      isScheduled: true,
      isShared: true,
      owner: 'Mike Chen',
      description: 'Quarterly churn analysis with predictive insights'
    },
    {
      id: 4,
      name: 'Feature Adoption Report',
      category: 'product',
      lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      isScheduled: false,
      isShared: false,
      owner: 'You',
      description: 'New feature adoption rates and user feedback'
    },
    {
      id: 5,
      name: 'Marketing Campaign ROI',
      category: 'marketing',
      lastModified: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      isScheduled: true,
      isShared: false,
      owner: 'Lisa Brown',
      description: 'Campaign performance and return on investment analysis'
    }
  ];

  const filteredReports = savedReports.filter(report =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="border-t border-border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">Saved Reports</h3>
          <button
            className="p-1.5 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
            title="Create new report"
          >
            <Icon name="Plus" size={16} className="text-text-secondary" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={14} className="text-text-secondary" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reports..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-secondary-50 border border-transparent rounded-lg focus:outline-none focus:bg-surface focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
          />
        </div>

        {/* Reports List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredReports.map((report) => (
            <button
              key={report.id}
              onClick={() => onReportSelect(report)}
              className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                selectedReport?.id === report.id
                  ? 'bg-primary-50 border-primary-200 ring-2 ring-primary-500 ring-opacity-20' :'bg-surface border-border hover:bg-secondary-25 hover:border-secondary-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-text-primary truncate flex-1">
                  {report.name}
                </h4>
                <div className="flex items-center space-x-1 ml-2">
                  {report.isScheduled && (
                    <Icon name="Clock" size={12} className="text-accent-600" title="Scheduled" />
                  )}
                  {report.isShared && (
                    <Icon name="Share2" size={12} className="text-success-600" title="Shared" />
                  )}
                </div>
              </div>
              
              <p className="text-xs text-text-secondary line-clamp-2 mb-2">
                {report.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>by {report.owner}</span>
                <span>{formatDate(report.lastModified)}</span>
              </div>
            </button>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-8">
            <Icon name="FileText" size={32} className="text-text-secondary mx-auto mb-2" />
            <p className="text-sm text-text-secondary">No reports found</p>
            <p className="text-xs text-text-muted">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedReports;