import React from 'react';
import Icon from 'components/AppIcon';

const QuickActionsPanel = ({ onInviteUser, selectedUsersCount, onBulkActions }) => {
  const quickActions = [
    {
      label: 'Invite New User',
      description: 'Send invitation to join team',
      icon: 'UserPlus',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      action: onInviteUser
    },
    {
      label: 'Export User List',
      description: 'Download user data as CSV',
      icon: 'Download',
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
      action: () => console.log('Export users')
    },
    {
      label: 'Bulk Import',
      description: 'Import users from CSV file',
      icon: 'Upload',
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      action: () => console.log('Bulk import')
    },
    {
      label: 'Role Templates',
      description: 'Manage permission templates',
      icon: 'Shield',
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
      action: () => console.log('Role templates')
    }
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-text-secondary" />
      </div>

      <div className="space-y-3">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="w-full p-4 rounded-lg border border-border hover:border-primary-200 hover:bg-primary-25 transition-all duration-200 text-left group"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action.icon} size={20} className={action.color} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-text-primary group-hover:text-primary-700 transition-colors duration-200">
                  {action.label}
                </div>
                <div className="text-xs text-text-secondary">
                  {action.description}
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-secondary group-hover:text-primary-600 transition-colors duration-200" />
            </div>
          </button>
        ))}
      </div>

      {selectedUsersCount > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-primary-600" />
                <span className="text-sm font-medium text-primary-700">
                  {selectedUsersCount} user{selectedUsersCount > 1 ? 's' : ''} selected
                </span>
              </div>
            </div>
            <button
              onClick={onBulkActions}
              className="w-full btn-primary py-2 rounded-lg font-medium flex items-center justify-center space-x-2"
            >
              <Icon name="Settings" size={16} />
              <span>Bulk Actions</span>
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-text-secondary mb-2">Need help?</p>
          <button className="text-xs text-accent-600 hover:text-accent-700 font-medium transition-colors duration-200">
            View User Management Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;