import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Mock user data - in real app, this would come from context/state
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Analytics Manager',
    avatar: '/assets/images/avatar-placeholder.jpg',
    tenant: 'Acme Analytics Corp',
    initials: 'SJ'
  };

  const menuItems = [
    {
      label: 'View Profile',
      icon: 'User',
      action: () => {
        console.log('Navigate to profile');
        setIsOpen(false);
      }
    },
    {
      label: 'Account Settings',
      icon: 'Settings',
      action: () => {
        navigate('/settings-configuration');
        setIsOpen(false);
      }
    },
    {
      label: 'Switch Tenant',
      icon: 'Building2',
      action: () => {
        console.log('Open tenant switcher');
        setIsOpen(false);
      }
    },
    {
      label: 'Billing & Usage',
      icon: 'CreditCard',
      action: () => {
        console.log('Navigate to billing');
        setIsOpen(false);
      }
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      action: () => {
        console.log('Open help center');
        setIsOpen(false);
      }
    },
    {
      label: 'Keyboard Shortcuts',
      icon: 'Keyboard',
      action: () => {
        console.log('Show shortcuts modal');
        setIsOpen(false);
      }
    },
    {
      type: 'divider'
    },
    {
      label: 'Sign Out',
      icon: 'LogOut',
      action: () => {
        navigate('/login');
        setIsOpen(false);
      },
      className: 'text-error-600 hover:bg-error-50'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
          isOpen 
            ? 'bg-primary-50 ring-2 ring-primary-500 ring-opacity-20' :'hover:bg-secondary-50'
        }`}
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
            <Image
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
            {/* Fallback to initials if image fails */}
            <span className="text-sm font-medium text-primary-700 absolute inset-0 flex items-center justify-center bg-primary-100">
              {user.initials}
            </span>
          </div>
          {/* Online status indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-500 border-2 border-surface rounded-full"></div>
        </div>

        {/* User Info - Hidden on mobile */}
        <div className="hidden lg:flex flex-col items-start min-w-0">
          <span className="text-sm font-medium text-text-primary truncate max-w-32">
            {user.name}
          </span>
          <span className="text-xs text-text-secondary truncate max-w-32">
            {user.role}
          </span>
        </div>

        {/* Dropdown Arrow */}
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu animation-fade-in min-w-64">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
                <span className="text-sm font-medium text-primary-700 absolute inset-0 flex items-center justify-center bg-primary-100">
                  {user.initials}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {user.name}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {user.email}
                </p>
                <p className="text-xs text-accent-600 truncate">
                  {user.tenant}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item, index) => {
              if (item.type === 'divider') {
                return <div key={index} className="border-t border-border my-1" />;
              }

              return (
                <button
                  key={index}
                  onClick={item.action}
                  className={`dropdown-item w-full text-left flex items-center space-x-3 ${
                    item.className || ''
                  }`}
                >
                  <Icon 
                    name={item.icon} 
                    size={16} 
                    className="text-text-secondary" 
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-border bg-secondary-25">
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>Version 2.1.0</span>
              <span>Last login: 2 hours ago</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;