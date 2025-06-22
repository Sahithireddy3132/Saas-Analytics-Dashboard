import React from 'react';
import Icon from 'components/AppIcon';

const ReportCategories = ({ selectedCategory, onCategorySelect }) => {
  const categories = [
    {
      id: 'revenue',
      name: 'Revenue Analytics',
      icon: 'DollarSign',
      description: 'MRR, ARR, and revenue trends',
      count: 12,
      color: 'text-success-600'
    },
    {
      id: 'users',
      name: 'User Analytics',
      icon: 'Users',
      description: 'User engagement and behavior',
      count: 8,
      color: 'text-accent-600'
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: 'TrendingUp',
      description: 'System and app performance',
      count: 15,
      color: 'text-primary-600'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: 'Target',
      description: 'Campaign and conversion metrics',
      count: 6,
      color: 'text-warning-600'
    },
    {
      id: 'support',
      name: 'Customer Support',
      icon: 'HeadphonesIcon',
      description: 'Support tickets and satisfaction',
      count: 4,
      color: 'text-error-600'
    },
    {
      id: 'product',
      name: 'Product Analytics',
      icon: 'Package',
      description: 'Feature usage and adoption',
      count: 9,
      color: 'text-secondary-600'
    }
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-text-primary mb-2">Report Categories</h3>
        <p className="text-xs text-text-secondary">Select a category to view available reports</p>
      </div>

      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
              selectedCategory === category.id
                ? 'bg-primary-50 border-primary-200 ring-2 ring-primary-500 ring-opacity-20' :'bg-surface border-border hover:bg-secondary-25 hover:border-secondary-300'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 ${category.color}`}>
                <Icon name={category.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-text-primary truncate">
                    {category.name}
                  </h4>
                  <span className="text-xs text-text-secondary bg-secondary-100 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
                <p className="text-xs text-text-secondary line-clamp-2">
                  {category.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 p-3 bg-secondary-25 rounded-lg">
        <h4 className="text-xs font-semibold text-text-primary mb-2">Quick Stats</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Total Reports</span>
            <span className="text-xs font-medium text-text-primary">54</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Scheduled</span>
            <span className="text-xs font-medium text-text-primary">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Shared</span>
            <span className="text-xs font-medium text-text-primary">8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCategories;