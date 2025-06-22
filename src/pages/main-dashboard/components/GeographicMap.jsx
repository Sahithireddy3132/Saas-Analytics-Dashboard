import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const GeographicMap = () => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock geographic data
  const geographicData = [
    {
      country: 'United States',
      code: 'US',
      revenue: 45280,
      users: 12450,
      conversion: 4.2,
      coordinates: { lat: 39.8283, lng: -98.5795 },
      color: 'bg-primary-500'
    },
    {
      country: 'United Kingdom',
      code: 'UK',
      revenue: 18750,
      users: 5680,
      conversion: 3.8,
      coordinates: { lat: 55.3781, lng: -3.4360 },
      color: 'bg-accent-500'
    },
    {
      country: 'Germany',
      code: 'DE',
      revenue: 15420,
      users: 4320,
      conversion: 3.5,
      coordinates: { lat: 51.1657, lng: 10.4515 },
      color: 'bg-success-500'
    },
    {
      country: 'Canada',
      code: 'CA',
      revenue: 12890,
      users: 3890,
      conversion: 3.9,
      coordinates: { lat: 56.1304, lng: -106.3468 },
      color: 'bg-warning-500'
    },
    {
      country: 'Australia',
      code: 'AU',
      revenue: 9650,
      users: 2780,
      conversion: 3.2,
      coordinates: { lat: -25.2744, lng: 133.7751 },
      color: 'bg-secondary-500'
    }
  ];

  const getMetricValue = (country, metric) => {
    switch (metric) {
      case 'revenue':
        return `$${country.revenue.toLocaleString()}`;
      case 'users':
        return country.users.toLocaleString();
      case 'conversion':
        return `${country.conversion}%`;
      default:
        return country.revenue;
    }
  };

  const getMetricLabel = (metric) => {
    switch (metric) {
      case 'revenue':
        return 'Revenue';
      case 'users':
        return 'Users';
      case 'conversion':
        return 'Conversion Rate';
      default:
        return 'Revenue';
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <div className="relative h-96 bg-secondary-50 rounded-lg overflow-hidden">
        {/* Embedded Google Map */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Global Performance Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=39.8283,-98.5795&z=2&output=embed"
          className="border-0"
        />
        
        {/* Overlay with data points */}
        <div className="absolute inset-0 pointer-events-none">
          {geographicData.map((country, index) => (
            <div
              key={country.code}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 2) * 20}%`
              }}
            >
              <div className={`w-4 h-4 ${country.color} rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform duration-200`} />
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Data Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-text-primary">Performance by Region</h4>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Sort by:</span>
            <select 
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="input-field text-sm"
            >
              <option value="revenue">Revenue</option>
              <option value="users">Users</option>
              <option value="conversion">Conversion Rate</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {geographicData
            .sort((a, b) => b[selectedMetric] - a[selectedMetric])
            .map((country, index) => (
            <div key={country.code} className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-secondary">#{index + 1}</span>
                  <div className={`w-3 h-3 ${country.color} rounded-full`} />
                </div>
                <div>
                  <h5 className="font-medium text-text-primary">{country.country}</h5>
                  <p className="text-sm text-text-secondary">{country.code}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <p className="text-sm text-text-secondary">Revenue</p>
                  <p className="font-medium text-text-primary">${country.revenue.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-secondary">Users</p>
                  <p className="font-medium text-text-primary">{country.users.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-secondary">Conversion</p>
                  <p className="font-medium text-text-primary">{country.conversion}%</p>
                </div>
                <button className="p-2 hover:bg-secondary-50 rounded-lg transition-colors duration-200">
                  <Icon name="ExternalLink" size={16} className="text-text-secondary" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-text-primary">
            ${geographicData.reduce((sum, country) => sum + country.revenue, 0).toLocaleString()}
          </p>
          <p className="text-sm text-text-secondary">Total Revenue</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-text-primary">
            {geographicData.reduce((sum, country) => sum + country.users, 0).toLocaleString()}
          </p>
          <p className="text-sm text-text-secondary">Total Users</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-text-primary">
            {(geographicData.reduce((sum, country) => sum + country.conversion, 0) / geographicData.length).toFixed(1)}%
          </p>
          <p className="text-sm text-text-secondary">Avg Conversion</p>
        </div>
      </div>
    </div>
  );
};

export default GeographicMap;