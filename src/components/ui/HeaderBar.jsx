import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import UserProfileDropdown from './UserProfileDropdown';
import NotificationCenter from './NotificationCenter';

const HeaderBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();

  const getPageTitle = () => {
    const pathMap = {
      '/main-dashboard': 'Dashboard',
      '/analytics-reports': 'Analytics Reports',
      '/user-management': 'User Management',
      '/settings-configuration': 'Settings & Configuration',
      '/data-export-reporting': 'Data Export & Reporting'
    };
    return pathMap[location.pathname] || 'Dashboard';
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search query:', searchQuery);
      // Implement search functionality
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setIsSearchExpanded(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    if (!searchQuery.trim()) {
      setIsSearchExpanded(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchExpanded(false);
    searchInputRef.current?.blur();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && isSearchFocused) {
        clearSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchFocused]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border h-16">
      <div className="flex items-center justify-between h-full px-6 lg:pl-24">
        {/* Left Section - Page Title */}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-text-primary">{getPageTitle()}</h1>
            <p className="text-xs text-text-secondary">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div className={`relative transition-all duration-200 ${
              isSearchExpanded || searchQuery ? 'w-full' : 'w-64'
            }`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon 
                  name="Search" 
                  size={16} 
                  className={`transition-colors duration-200 ${
                    isSearchFocused ? 'text-primary-600' : 'text-text-secondary'
                  }`}
                />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                placeholder="Search analytics, reports, users..."
                className={`w-full pl-10 pr-10 py-2 text-sm bg-secondary-50 border border-transparent rounded-lg transition-all duration-200 focus:outline-none focus:bg-surface focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 ${
                  isSearchFocused ? 'bg-surface border-primary-500' : 'hover:bg-secondary-100'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-text-primary transition-colors duration-200"
                >
                  <Icon name="X" size={16} className="text-text-secondary" />
                </button>
              )}
              {!searchQuery && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-text-secondary bg-secondary-100 border border-border rounded">
                    ⌘K
                  </kbd>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Mobile Search Button */}
        <div className="md:hidden">
          <button
            onClick={() => searchInputRef.current?.focus()}
            className="p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
            aria-label="Search"
          >
            <Icon name="Search" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-1">
            <button
              className="p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-200 group"
              title="Refresh data"
              aria-label="Refresh data"
            >
              <Icon 
                name="RefreshCw" 
                size={18} 
                className="text-text-secondary group-hover:text-text-primary transition-colors duration-200" 
              />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-secondary-50 transition-colors duration-200 group"
              title="Export data"
              aria-label="Export data"
            >
              <Icon 
                name="Download" 
                size={18} 
                className="text-text-secondary group-hover:text-text-primary transition-colors duration-200" 
              />
            </button>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-6 bg-border mx-2" />

          {/* Notification Center */}
          <NotificationCenter />

          {/* User Profile Dropdown */}
          <UserProfileDropdown />
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchExpanded && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surface border-b border-border p-4 shadow-lg">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={16} className="text-text-secondary" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => {
                if (!searchQuery.trim()) {
                  setIsSearchExpanded(false);
                }
              }}
              placeholder="Search analytics, reports, users..."
              className="w-full pl-10 pr-10 py-3 text-sm bg-secondary-50 border border-border rounded-lg focus:outline-none focus:bg-surface focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Icon name="X" size={16} className="text-text-secondary" />
              </button>
            )}
          </form>
        </div>
      )}
    </header>
  );
};

export default HeaderBar;