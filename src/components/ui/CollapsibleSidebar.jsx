import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const CollapsibleSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem('sidebarExpanded');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/main-dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and KPIs'
    },
    {
      label: 'Analytics',
      path: '/analytics-reports',
      icon: 'BarChart3',
      description: 'Reports and insights'
    },
    {
      label: 'Data Export',
      path: '/data-export-reporting',
      icon: 'Download',
      description: 'Export and reporting'
    },
    {
      label: 'Users',
      path: '/user-management',
      icon: 'Users',
      description: 'User management'
    },
    {
      label: 'Settings',
      path: '/settings-configuration',
      icon: 'Settings',
      description: 'Configuration'
    }
  ];

  useEffect(() => {
    localStorage.setItem('sidebarExpanded', JSON.stringify(isExpanded));
  }, [isExpanded]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className={`flex items-center px-4 py-6 border-b border-border ${!isExpanded ? 'justify-center' : ''}`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} color="white" />
          </div>
          {isExpanded && (
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-text-primary">Analytics</span>
              <span className="text-xs text-text-secondary">Dashboard</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const isActive = isActiveRoute(item.path);
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`nav-item w-full ${
                isActive ? 'nav-item-active' : 'nav-item-inactive'
              } ${!isExpanded ? 'justify-center px-2' : 'justify-start'}`}
              title={!isExpanded ? item.label : ''}
              aria-label={item.label}
            >
              <Icon 
                name={item.icon} 
                size={20} 
                className={`${isActive ? 'text-primary-700' : 'text-secondary-600'} ${!isExpanded ? '' : 'mr-3'}`}
              />
              {isExpanded && (
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-text-secondary">{item.description}</span>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="px-4 py-4 border-t border-border">
        <button
          onClick={toggleSidebar}
          className={`nav-item nav-item-inactive w-full ${!isExpanded ? 'justify-center px-2' : 'justify-start'}`}
          title={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <Icon 
            name={isExpanded ? 'ChevronLeft' : 'ChevronRight'} 
            size={20} 
            className={`text-secondary-600 ${!isExpanded ? '' : 'mr-3'}`}
          />
          {isExpanded && <span className="text-sm font-medium">Collapse</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-surface border border-border rounded-md p-2 shadow-card"
        aria-label="Toggle mobile menu"
      >
        <Icon name="Menu" size={20} className="text-text-primary" />
      </button>

      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex-col bg-surface border-r border-border transition-all duration-300 ease-in-out ${
          isExpanded ? 'lg:w-80' : 'lg:w-16'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-surface border-r border-border transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header with Close Button */}
          <div className="flex items-center justify-between px-4 py-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-text-primary">Analytics</span>
                <span className="text-xs text-text-secondary">Dashboard</span>
              </div>
            </div>
            <button
              onClick={toggleMobileSidebar}
              className="p-2 rounded-md hover:bg-secondary-50 transition-colors duration-200"
              aria-label="Close mobile menu"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`nav-item w-full justify-start ${
                    isActive ? 'nav-item-active' : 'nav-item-inactive'
                  }`}
                  aria-label={item.label}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={`mr-3 ${isActive ? 'text-primary-700' : 'text-secondary-600'}`}
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-xs text-text-secondary">{item.description}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default CollapsibleSidebar;