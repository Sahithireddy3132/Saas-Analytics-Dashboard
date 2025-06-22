import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkActionsModal = ({ isOpen, onClose, onAction, selectedCount, roles, statuses, teams }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [actionData, setActionData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const actions = [
    {
      id: 'changeRole',
      label: 'Change Role',
      description: 'Update role for selected users',
      icon: 'Shield',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      id: 'changeStatus',
      label: 'Change Status',
      description: 'Update status for selected users',
      icon: 'ToggleLeft',
      color: 'text-accent-600',
      bgColor: 'bg-accent-50'
    },
    {
      id: 'changeTeam',
      label: 'Change Team',
      description: 'Move users to different team',
      icon: 'Users',
      color: 'text-success-600',
      bgColor: 'bg-success-50'
    },
    {
      id: 'deactivate',
      label: 'Deactivate Users',
      description: 'Temporarily disable user accounts',
      icon: 'UserX',
      color: 'text-warning-600',
      bgColor: 'bg-warning-50'
    },
    {
      id: 'delete',
      label: 'Remove Users',
      description: 'Permanently remove user accounts',
      icon: 'Trash2',
      color: 'text-error-600',
      bgColor: 'bg-error-50'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (selectedAction === 'deactivate') {
        onAction('changeStatus', { status: 'Inactive' });
      } else if (selectedAction === 'delete') {
        if (confirm(`Are you sure you want to permanently remove ${selectedCount} user(s)? This action cannot be undone.`)) {
          onAction('delete', {});
        }
      } else {
        onAction(selectedAction, actionData);
      }
    } catch (error) {
      console.error('Error performing bulk action:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderActionForm = () => {
    switch (selectedAction) {
      case 'changeRole':
        return (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              New Role
            </label>
            <select
              value={actionData.role || ''}
              onChange={(e) => setActionData({ role: e.target.value })}
              className="input-field w-full"
              required
            >
              <option value="">Select a role</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        );
      
      case 'changeStatus':
        return (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              New Status
            </label>
            <select
              value={actionData.status || ''}
              onChange={(e) => setActionData({ status: e.target.value })}
              className="input-field w-full"
              required
            >
              <option value="">Select a status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        );
      
      case 'changeTeam':
        return (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              New Team
            </label>
            <select
              value={actionData.team || ''}
              onChange={(e) => setActionData({ team: e.target.value })}
              className="input-field w-full"
              required
            >
              <option value="">Select a team</option>
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
        );
      
      case 'deactivate':
        return (
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-warning-800">Deactivate Users</h4>
                <p className="text-sm text-warning-700 mt-1">
                  This will temporarily disable {selectedCount} user account(s). Users will not be able to log in until reactivated.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'delete':
        return (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-error-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-error-800">Remove Users</h4>
                <p className="text-sm text-error-700 mt-1">
                  This will permanently remove {selectedCount} user account(s). This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getActionButtonText = () => {
    switch (selectedAction) {
      case 'changeRole': return 'Update Role';
      case 'changeStatus': return 'Update Status';
      case 'changeTeam': return 'Move to Team';
      case 'deactivate': return 'Deactivate Users';
      case 'delete': return 'Remove Users';
      default: return 'Apply Action';
    }
  };

  const getActionButtonColor = () => {
    switch (selectedAction) {
      case 'delete': return 'bg-error-600 hover:bg-error-700 text-white';
      case 'deactivate': return 'bg-warning-600 hover:bg-warning-700 text-white';
      default: return 'btn-primary';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="inline-block w-full max-w-lg my-8 overflow-hidden text-left align-middle transition-all transform bg-surface shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={20} className="text-primary-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text-primary">Bulk Actions</h2>
                <p className="text-sm text-text-secondary">{selectedCount} user(s) selected</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>

          {/* Action Selection */}
          <div className="px-6 py-6">
            {!selectedAction ? (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-text-primary mb-4">Choose an action:</h3>
                {actions.map(action => (
                  <button
                    key={action.id}
                    onClick={() => setSelectedAction(action.id)}
                    className="w-full p-4 rounded-lg border border-border hover:border-primary-200 hover:bg-primary-25 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center`}>
                        <Icon name={action.icon} size={20} className={action.color} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-text-primary">
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
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAction('');
                      setActionData({});
                    }}
                    className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
                  >
                    <Icon name="ArrowLeft" size={16} className="text-text-secondary" />
                  </button>
                  <div>
                    <h3 className="text-sm font-medium text-text-primary">
                      {actions.find(a => a.id === selectedAction)?.label}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      Applying to {selectedCount} user(s)
                    </p>
                  </div>
                </div>

                {renderActionForm()}

                <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-secondary px-4 py-2 rounded-lg font-medium"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || (selectedAction !== 'deactivate' && selectedAction !== 'delete' && !Object.keys(actionData).length)}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200 ${getActionButtonColor()}`}
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" size={16} className="animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>{getActionButtonText()}</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsModal;