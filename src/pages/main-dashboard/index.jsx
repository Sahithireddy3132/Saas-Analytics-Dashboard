import React, { useState, useEffect } from 'react';
import CollapsibleSidebar from 'components/ui/CollapsibleSidebar';
import HeaderBar from 'components/ui/HeaderBar';
import MetricCard from './components/MetricCard';
import RevenueChart from './components/RevenueChart';
import UserAcquisitionFunnel from './components/UserAcquisitionFunnel';
import GeographicMap from './components/GeographicMap';
import RecentActivity from './components/RecentActivity';
import AlertsPanel from './components/AlertsPanel';
import DateRangeSelector from './components/DateRangeSelector';
import FilterPanel from './components/FilterPanel';
import Icon from 'components/AppIcon';

const MainDashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for key metrics
  const keyMetrics = [
    {
      id: 'revenue',
      title: 'Monthly Recurring Revenue',
      value: '$127,450',
      change: '+12.5%',
      trend: 'up',
      icon: 'DollarSign',
      color: 'success',
      subtitle: 'vs last month'
    },
    {
      id: 'users',
      title: 'Active Users',
      value: '24,891',
      change: '+8.2%',
      trend: 'up',
      icon: 'Users',
      color: 'primary',
      subtitle: 'monthly active'
    },
    {
      id: 'churn',
      title: 'Churn Rate',
      value: '2.4%',
      change: '-0.8%',
      trend: 'down',
      icon: 'TrendingDown',
      color: 'warning',
      subtitle: 'monthly churn'
    },
    {
      id: 'conversion',
      title: 'Conversion Rate',
      value: '3.7%',
      change: '+1.2%',
      trend: 'up',
      icon: 'Target',
      color: 'accent',
      subtitle: 'trial to paid'
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'user_signup',
      title: 'New user registration',
      description: 'john.doe@example.com signed up for Pro plan',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      icon: 'UserPlus',
      color: 'success'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment received',
      description: '$299 payment from Acme Corp for Enterprise plan',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      icon: 'CreditCard',
      color: 'primary'
    },
    {
      id: 3,
      type: 'churn',
      title: 'User churned',
      description: 'sarah.wilson@company.com cancelled subscription',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: 'UserMinus',
      color: 'error'
    },
    {
      id: 4,
      type: 'upgrade',
      title: 'Plan upgrade',
      description: 'TechStart Inc upgraded from Basic to Pro plan',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      icon: 'TrendingUp',
      color: 'accent'
    }
  ];

  // Mock alerts data
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Churn Alert',
      message: 'Churn rate increased by 15% in the last 7 days',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      priority: 'high'
    },
    {
      id: 2,
      type: 'success',
      title: 'Revenue Milestone',
      message: 'Monthly revenue exceeded $125K target',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: 'medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Feature Usage',
      message: 'Advanced analytics feature adoption at 67%',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      priority: 'low'
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setRefreshing(false);
  };

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
    // Trigger data refresh based on new date range
    console.log('Date range changed to:', range);
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  useEffect(() => {
    // Set up real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <CollapsibleSidebar />
      <HeaderBar />
      
      <main className="lg:pl-20 pt-16">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl font-bold text-text-primary mb-2">Dashboard Overview</h1>
              <p className="text-text-secondary">
                Last updated: {lastUpdated.toLocaleTimeString()}
                {refreshing && (
                  <span className="ml-2 inline-flex items-center">
                    <Icon name="RefreshCw" size={14} className="animate-spin text-primary-600" />
                    <span className="ml-1 text-sm">Updating...</span>
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <DateRangeSelector 
                selectedRange={selectedDateRange}
                onRangeChange={handleDateRangeChange}
              />
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="btn-secondary px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Icon 
                  name="RefreshCw" 
                  size={16} 
                  className={refreshing ? 'animate-spin' : ''} 
                />
                <span>Refresh</span>
              </button>
              <button
                onClick={toggleFilterPanel}
                className="btn-secondary px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Icon name="Filter" size={16} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {keyMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
            {/* Revenue Chart */}
            <div className="xl:col-span-8">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-text-primary">Revenue Timeline</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-secondary-50 rounded-lg transition-colors duration-200">
                      <Icon name="Download" size={16} className="text-text-secondary" />
                    </button>
                    <button className="p-2 hover:bg-secondary-50 rounded-lg transition-colors duration-200">
                      <Icon name="MoreHorizontal" size={16} className="text-text-secondary" />
                    </button>
                  </div>
                </div>
                <RevenueChart dateRange={selectedDateRange} />
              </div>
            </div>

            {/* User Acquisition Funnel */}
            <div className="xl:col-span-4">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-text-primary">Acquisition Funnel</h3>
                  <button className="p-2 hover:bg-secondary-50 rounded-lg transition-colors duration-200">
                    <Icon name="MoreHorizontal" size={16} className="text-text-secondary" />
                  </button>
                </div>
                <UserAcquisitionFunnel />
              </div>
            </div>
          </div>

          {/* Geographic Performance Map */}
          <div className="mb-8">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Geographic Performance</h3>
                <div className="flex items-center space-x-2">
                  <select className="input-field text-sm">
                    <option value="revenue">Revenue</option>
                    <option value="users">Users</option>
                    <option value="conversion">Conversion</option>
                  </select>
                  <button className="p-2 hover:bg-secondary-50 rounded-lg transition-colors duration-200">
                    <Icon name="MoreHorizontal" size={16} className="text-text-secondary" />
                  </button>
                </div>
              </div>
              <GeographicMap />
            </div>
          </div>

          {/* Bottom Section - Recent Activities and Alerts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RecentActivity activities={recentActivities} />
            <AlertsPanel alerts={alerts} />
          </div>
        </div>
      </main>

      {/* Filter Panel */}
      <FilterPanel 
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
      />
    </div>
  );
};

export default MainDashboard;