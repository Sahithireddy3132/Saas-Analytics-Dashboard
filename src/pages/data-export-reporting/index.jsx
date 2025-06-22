import React, { useState, useEffect } from 'react';
import CollapsibleSidebar from 'components/ui/CollapsibleSidebar';
import HeaderBar from 'components/ui/HeaderBar';
import Icon from 'components/AppIcon';
import ExportTemplates from './components/ExportTemplates';
import RecentExports from './components/RecentExports';
import ExportSetup from './components/ExportSetup';
import DataSelection from './components/DataSelection';
import FormatOptions from './components/FormatOptions';
import ScheduleOptions from './components/ScheduleOptions';
import ExportProgress from './components/ExportProgress';

const DataExportReporting = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [exportData, setExportData] = useState({
    template: null,
    dataSource: '',
    dateRange: { start: '', end: '' },
    metrics: [],
    filters: {},
    format: 'csv',
    schedule: null,
    recipients: []
  });

  const steps = [
    { id: 0, name: 'Export Setup', icon: 'Settings', description: 'Configure data source and basic settings' },
    { id: 1, name: 'Data Selection', icon: 'Filter', description: 'Choose metrics and apply filters' },
    { id: 2, name: 'Format Options', icon: 'FileText', description: 'Select export format and customization' },
    { id: 3, name: 'Schedule', icon: 'Calendar', description: 'Set up automated delivery options' }
  ];

  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleExportDataChange = (updates) => {
    setExportData(prev => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ExportSetup
            data={exportData}
            onChange={handleExportDataChange}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <DataSelection
            data={exportData}
            onChange={handleExportDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 2:
        return (
          <FormatOptions
            data={exportData}
            onChange={handleExportDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <ScheduleOptions
            data={exportData}
            onChange={handleExportDataChange}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CollapsibleSidebar />
      <HeaderBar />
      
      <main className="lg:pl-20 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Data Export & Reporting</h1>
                <p className="text-text-secondary mt-1">Generate custom reports and export analytics data</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="btn-secondary px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Icon name="History" size={16} />
                  <span>Export History</span>
                </button>
                <button className="btn-primary px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Icon name="Plus" size={16} />
                  <span>New Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between bg-surface rounded-lg p-6 border border-border">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleStepChange(index)}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        index === currentStep
                          ? 'bg-primary border-primary text-white'
                          : index < currentStep
                          ? 'bg-success-500 border-success-500 text-white' :'bg-surface border-border text-text-secondary hover:border-primary hover:text-primary'
                      }`}
                    >
                      {index < currentStep ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        <Icon name={step.icon} size={16} />
                      )}
                    </button>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-medium ${
                        index === currentStep ? 'text-primary' : index < currentStep ? 'text-success-600' : 'text-text-secondary'
                      }`}>
                        {step.name}
                      </p>
                      <p className="text-xs text-text-muted">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block w-16 h-0.5 mx-4 ${
                      index < currentStep ? 'bg-success-500' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel */}
            <div className={`lg:col-span-4 space-y-6 ${leftPanelCollapsed ? 'hidden lg:block' : ''}`}>
              {/* Panel Toggle - Mobile */}
              <div className="lg:hidden">
                <button
                  onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
                  className="w-full btn-secondary px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
                >
                  <Icon name={leftPanelCollapsed ? 'ChevronDown' : 'ChevronUp'} size={16} />
                  <span>{leftPanelCollapsed ? 'Show' : 'Hide'} Panel</span>
                </button>
              </div>

              {/* Export Templates */}
              <ExportTemplates
                selectedTemplate={exportData.template}
                onTemplateSelect={(template) => handleExportDataChange({ template })}
              />

              {/* Recent Exports */}
              <RecentExports />

              {/* Quick Filters */}
              <div className="card p-4">
                <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Quick Filters
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-secondary-50 rounded-md transition-colors duration-200">
                    Last 30 Days
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-secondary-50 rounded-md transition-colors duration-200">
                    This Quarter
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-secondary-50 rounded-md transition-colors duration-200">
                    Year to Date
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-secondary-50 rounded-md transition-colors duration-200">
                    Custom Range
                  </button>
                </div>
              </div>
            </div>

            {/* Main Workspace */}
            <div className="lg:col-span-8">
              <div className="card p-6">
                {renderStepContent()}
              </div>
            </div>
          </div>

          {/* Export Progress */}
          <ExportProgress />
        </div>
      </main>
    </div>
  );
};

export default DataExportReporting;