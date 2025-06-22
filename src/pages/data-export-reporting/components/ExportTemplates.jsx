import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportTemplates = ({ selectedTemplate, onTemplateSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const templates = [
    {
      id: 'revenue-summary',
      name: 'Revenue Summary',
      description: 'Monthly revenue breakdown with key metrics',
      category: 'Financial',
      metrics: ['Revenue', 'MRR', 'ARR', 'Churn Rate'],
      lastUsed: '2 days ago',
      isPopular: true
    },
    {
      id: 'user-analytics',
      name: 'User Analytics',
      description: 'User engagement and behavior analysis',
      category: 'User Insights',
      metrics: ['Active Users', 'Session Duration', 'Page Views', 'Bounce Rate'],
      lastUsed: '1 week ago',
      isPopular: true
    },
    {
      id: 'conversion-funnel',
      name: 'Conversion Funnel',
      description: 'Sales funnel performance and conversion rates',
      category: 'Marketing',
      metrics: ['Leads', 'Conversions', 'Conversion Rate', 'Cost per Lead'],
      lastUsed: '3 days ago',
      isPopular: false
    },
    {
      id: 'customer-health',
      name: 'Customer Health',
      description: 'Customer satisfaction and retention metrics',
      category: 'Customer Success',
      metrics: ['NPS Score', 'CSAT', 'Retention Rate', 'Support Tickets'],
      lastUsed: '5 days ago',
      isPopular: false
    },
    {
      id: 'product-usage',
      name: 'Product Usage',
      description: 'Feature adoption and usage patterns',
      category: 'Product',
      metrics: ['Feature Usage', 'DAU/MAU', 'Feature Adoption', 'User Journey'],
      lastUsed: '1 day ago',
      isPopular: true
    }
  ];

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category) => {
    const colors = {
      'Financial': 'bg-success-100 text-success-700',
      'User Insights': 'bg-accent-100 text-accent-700',
      'Marketing': 'bg-warning-100 text-warning-700',
      'Customer Success': 'bg-primary-100 text-primary-700',
      'Product': 'bg-secondary-100 text-secondary-700'
    };
    return colors[category] || 'bg-secondary-100 text-secondary-700';
  };

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary flex items-center">
          <Icon name="FileText" size={16} className="mr-2" />
          Export Templates
        </h3>
        <button className="text-xs text-accent-600 hover:text-accent-700 font-medium">
          View All
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
          placeholder="Search templates..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Templates List */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template)}
            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
              selectedTemplate?.id === template.id
                ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500 ring-opacity-20' :'border-border hover:border-primary-300 hover:bg-secondary-25'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-medium text-text-primary">{template.name}</h4>
                {template.isPopular && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-warning-100 text-warning-700 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <Icon 
                name={selectedTemplate?.id === template.id ? "CheckCircle" : "Circle"} 
                size={16} 
                className={selectedTemplate?.id === template.id ? "text-primary-600" : "text-text-secondary"} 
              />
            </div>
            
            <p className="text-xs text-text-secondary mb-2">{template.description}</p>
            
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(template.category)}`}>
                {template.category}
              </span>
              <span className="text-xs text-text-muted">Used {template.lastUsed}</span>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-1">
              {template.metrics.slice(0, 3).map((metric, index) => (
                <span key={index} className="px-2 py-0.5 text-xs bg-secondary-100 text-secondary-700 rounded">
                  {metric}
                </span>
              ))}
              {template.metrics.length > 3 && (
                <span className="px-2 py-0.5 text-xs bg-secondary-100 text-secondary-700 rounded">
                  +{template.metrics.length - 3} more
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-6">
          <Icon name="Search" size={24} className="text-text-secondary mx-auto mb-2" />
          <p className="text-sm text-text-secondary">No templates found</p>
          <p className="text-xs text-text-muted">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default ExportTemplates;