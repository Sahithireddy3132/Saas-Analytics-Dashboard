import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import CollapsibleSidebar from 'components/ui/CollapsibleSidebar';
import HeaderBar from 'components/ui/HeaderBar';
import ReportCategories from './components/ReportCategories';
import SavedReports from './components/SavedReports';
import ReportFilters from './components/ReportFilters';
import ReportToolbar from './components/ReportToolbar';
import ChartVisualization from './components/ChartVisualization';
import DataTable from './components/DataTable';
import ReportSettings from './components/ReportSettings';
import ExportOptions from './components/ExportOptions';

const AnalyticsReports = () => {
  const [selectedCategory, setSelectedCategory] = useState('revenue');
  const [selectedReport, setSelectedReport] = useState(null);
  const [viewMode, setViewMode] = useState('chart'); // chart, table, hybrid
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date()
  });
  const [filters, setFilters] = useState({});
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('categories'); // For mobile

  // Mock data for reports
  const mockReportData = {
    revenue: {
      chartData: [
        { month: 'Jan', revenue: 45000, growth: 12 },
        { month: 'Feb', revenue: 52000, growth: 15.5 },
        { month: 'Mar', revenue: 48000, growth: -7.7 },
        { month: 'Apr', revenue: 61000, growth: 27.1 },
        { month: 'May', revenue: 55000, growth: -9.8 },
        { month: 'Jun', revenue: 67000, growth: 21.8 }
      ],
      tableData: [
        { id: 1, customer: 'Acme Corp', plan: 'Enterprise', mrr: 2500, churn: 0, growth: 15 },
        { id: 2, customer: 'TechStart Inc', plan: 'Professional', mrr: 890, churn: 0, growth: 8 },
        { id: 3, customer: 'Global Solutions', plan: 'Enterprise', mrr: 3200, churn: 0, growth: 22 },
        { id: 4, customer: 'Innovation Labs', plan: 'Starter', mrr: 290, churn: 1, growth: -5 },
        { id: 5, customer: 'Digital Dynamics', plan: 'Professional', mrr: 1200, churn: 0, growth: 12 }
      ]
    },
    users: {
      chartData: [
        { month: 'Jan', activeUsers: 1250, newUsers: 180 },
        { month: 'Feb', activeUsers: 1420, newUsers: 220 },
        { month: 'Mar', activeUsers: 1380, newUsers: 195 },
        { month: 'Apr', activeUsers: 1650, newUsers: 285 },
        { month: 'May', activeUsers: 1580, newUsers: 240 },
        { month: 'Jun', activeUsers: 1820, newUsers: 320 }
      ],
      tableData: [
        { id: 1, user: 'john.doe@acme.com', lastActive: '2 hours ago', sessions: 45, plan: 'Enterprise' },
        { id: 2, user: 'sarah.smith@tech.com', lastActive: '1 day ago', sessions: 23, plan: 'Professional' },
        { id: 3, user: 'mike.johnson@global.com', lastActive: '3 hours ago', sessions: 67, plan: 'Enterprise' },
        { id: 4, user: 'lisa.brown@innovation.com', lastActive: '5 days ago', sessions: 12, plan: 'Starter' },
        { id: 5, user: 'david.wilson@digital.com', lastActive: '1 hour ago', sessions: 34, plan: 'Professional' }
      ]
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedReport(null);
  };

  const handleReportSelect = (report) => {
    setSelectedReport(report);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const getCurrentReportData = () => {
    return mockReportData[selectedCategory] || mockReportData.revenue;
  };

  return (
    <div className="min-h-screen bg-background">
      <CollapsibleSidebar />
      <HeaderBar />
      
      <div className="lg:pl-20 pt-16">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Left Panel - Desktop */}
          <div className={`hidden lg:flex flex-col bg-surface border-r border-border transition-all duration-300 ${
            isLeftPanelCollapsed ? 'w-12' : 'w-80'
          }`}>
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              {!isLeftPanelCollapsed && (
                <h2 className="text-lg font-semibold text-text-primary">Reports</h2>
              )}
              <button
                onClick={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
                className="p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
                title={isLeftPanelCollapsed ? 'Expand panel' : 'Collapse panel'}
              >
                <Icon 
                  name={isLeftPanelCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
                  size={16} 
                  className="text-text-secondary" 
                />
              </button>
            </div>

            {!isLeftPanelCollapsed && (
              <div className="flex-1 overflow-y-auto">
                <ReportCategories 
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect}
                />
                <SavedReports 
                  selectedReport={selectedReport}
                  onReportSelect={handleReportSelect}
                />
                <ReportFilters 
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                />
              </div>
            )}
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-40">
            <div className="flex">
              {['categories', 'reports', 'filters', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-2 text-xs font-medium capitalize transition-colors duration-200 ${
                    activeTab === tab 
                      ? 'text-primary-600 bg-primary-50 border-t-2 border-primary-600' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon 
                    name={tab === 'categories' ? 'FolderOpen' : tab === 'reports' ? 'FileText' : tab === 'filters' ? 'Filter' : 'Settings'} 
                    size={16} 
                    className="mx-auto mb-1" 
                  />
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Report Toolbar */}
            <ReportToolbar 
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
              selectedCategory={selectedCategory}
            />

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
              {viewMode === 'chart' && (
                <ChartVisualization 
                  data={getCurrentReportData().chartData}
                  category={selectedCategory}
                />
              )}
              
              {viewMode === 'table' && (
                <DataTable 
                  data={getCurrentReportData().tableData}
                  category={selectedCategory}
                />
              )}
              
              {viewMode === 'hybrid' && (
                <div className="h-full flex flex-col">
                  <div className="h-1/2 border-b border-border">
                    <ChartVisualization 
                      data={getCurrentReportData().chartData}
                      category={selectedCategory}
                    />
                  </div>
                  <div className="h-1/2">
                    <DataTable 
                      data={getCurrentReportData().tableData}
                      category={selectedCategory}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Desktop */}
          <div className={`hidden lg:flex flex-col bg-surface border-l border-border transition-all duration-300 ${
            isRightPanelCollapsed ? 'w-12' : 'w-80'
          }`}>
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <button
                onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
                className="p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
                title={isRightPanelCollapsed ? 'Expand panel' : 'Collapse panel'}
              >
                <Icon 
                  name={isRightPanelCollapsed ? 'ChevronLeft' : 'ChevronRight'} 
                  size={16} 
                  className="text-text-secondary" 
                />
              </button>
              {!isRightPanelCollapsed && (
                <h2 className="text-lg font-semibold text-text-primary">Settings</h2>
              )}
            </div>

            {!isRightPanelCollapsed && (
              <div className="flex-1 overflow-y-auto">
                <ReportSettings />
                <ExportOptions />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Panel Overlay */}
        {activeTab !== 'categories' && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setActiveTab('categories')} />
        )}

        {/* Mobile Panel Content */}
        <div className={`lg:hidden fixed bottom-16 left-0 right-0 bg-surface border-t border-border z-40 max-h-96 overflow-y-auto transition-transform duration-300 ${
          activeTab === 'categories' ? 'translate-y-full' : 'translate-y-0'
        }`}>
          {activeTab === 'categories' && (
            <ReportCategories 
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          )}
          {activeTab === 'reports' && (
            <SavedReports 
              selectedReport={selectedReport}
              onReportSelect={handleReportSelect}
            />
          )}
          {activeTab === 'filters' && (
            <ReportFilters 
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          )}
          {activeTab === 'settings' && (
            <div>
              <ReportSettings />
              <ExportOptions />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;