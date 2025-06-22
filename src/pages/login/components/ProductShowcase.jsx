import React from 'react';
import Icon from 'components/AppIcon';


const ProductShowcase = () => {
  const features = [
    {
      icon: 'BarChart3',
      title: 'Real-time Analytics',
      description: 'Monitor your SaaS metrics with live data updates and interactive dashboards'
    },
    {
      icon: 'Users',
      title: 'User Insights',
      description: 'Track user behavior, engagement patterns, and conversion funnels'
    },
    {
      icon: 'TrendingUp',
      title: 'Revenue Tracking',
      description: 'Comprehensive revenue analytics with MRR, ARR, and churn analysis'
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-level security with multi-factor authentication and data encryption'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '99.9%', label: 'Uptime' },
    { value: '500+', label: 'Companies' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          Powerful Analytics for
          <span className="text-primary-600 block">Growing SaaS Businesses</span>
        </h2>
        <p className="text-lg text-text-secondary mb-6">
          Make data-driven decisions with comprehensive insights into your business performance, 
          user behavior, and revenue metrics.
        </p>
      </div>

      {/* Dashboard Preview */}
      <div className="relative">
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-border">
          <div className="bg-surface rounded-lg shadow-lg overflow-hidden">
            {/* Mock Dashboard Header */}
            <div className="bg-surface border-b border-border px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                    <Icon name="TrendingUp" size={14} color="white" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">Analytics Dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-error-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Mock Dashboard Content */}
            <div className="p-4 space-y-4">
              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-secondary-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary-600">{stat.value}</div>
                    <div className="text-xs text-text-secondary">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Mock Chart */}
              <div className="bg-secondary-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-text-primary">Revenue Growth</span>
                  <Icon name="TrendingUp" size={16} className="text-success-600" />
                </div>
                <div className="h-20 bg-gradient-to-r from-primary-200 to-accent-200 rounded opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 bg-surface rounded-lg border border-border">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature.icon} size={20} className="text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-text-primary mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="text-center">
          <p className="text-sm text-text-secondary mb-4">Trusted by leading SaaS companies</p>
          <div className="flex items-center justify-center space-x-6 opacity-60">
            <div className="w-16 h-8 bg-secondary-200 rounded"></div>
            <div className="w-16 h-8 bg-secondary-200 rounded"></div>
            <div className="w-16 h-8 bg-secondary-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
        <Icon name="Shield" size={16} className="text-success-600" />
        <span>SOC 2 Type II Certified</span>
        <span>•</span>
        <span>GDPR Compliant</span>
      </div>
    </div>
  );
};

export default ProductShowcase;