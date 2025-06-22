import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const UserProfileModal = ({ isOpen, onClose, user, onUpdate, roles, teams }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    team: '',
    status: '',
    permissions: []
  });
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        team: user.team,
        status: user.status,
        permissions: user.permissions || []
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...user,
      ...formData
    });
  };

  const handlePermissionChange = (permission, checked) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permission]
        : prev.permissions.filter(p => p !== permission)
    }));
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleString();
  };

  const availablePermissions = [
    { id: 'read', label: 'Read Access', description: 'View dashboards and reports' },
    { id: 'write', label: 'Write Access', description: 'Create and edit content' },
    { id: 'admin', label: 'Admin Access', description: 'Full system administration' },
    { id: 'export', label: 'Export Data', description: 'Download reports and data' },
    { id: 'invite', label: 'Invite Users', description: 'Send team invitations' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-surface shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-100">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text-primary">{user.name}</h2>
                <p className="text-sm text-text-secondary">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <nav className="flex px-6">
              {[
                { id: 'profile', label: 'Profile', icon: 'User' },
                { id: 'permissions', label: 'Permissions', icon: 'Shield' },
                { id: 'activity', label: 'Activity', icon: 'Clock' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {activeTab === 'profile' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="input-field w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="input-field w-full"
                      required
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Team
                    </label>
                    <select
                      value={formData.team}
                      onChange={(e) => setFormData(prev => ({ ...prev, team: e.target.value }))}
                      className="input-field w-full"
                      required
                    >
                      {teams.map(team => (
                        <option key={team} value={team}>{team}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="input-field w-full"
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Join Date
                    </label>
                    <input
                      type="text"
                      value={user.joinDate?.toLocaleDateString()}
                      className="input-field w-full bg-secondary-50"
                      disabled
                    />
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'permissions' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">Access Permissions</h3>
                  <div className="space-y-4">
                    {availablePermissions.map(permission => (
                      <div key={permission.id} className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                        <input
                          type="checkbox"
                          id={permission.id}
                          checked={formData.permissions.includes(permission.id)}
                          onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                          className="mt-1 rounded border-border focus:ring-primary-500"
                        />
                        <div className="flex-1">
                          <label htmlFor={permission.id} className="text-sm font-medium text-text-primary cursor-pointer">
                            {permission.label}
                          </label>
                          <p className="text-xs text-text-secondary mt-1">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">Recent Activity</h3>
                  {user.activityHistory && user.activityHistory.length > 0 ? (
                    <div className="space-y-3">
                      {user.activityHistory.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-secondary-25 rounded-lg">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <Icon name="Activity" size={16} className="text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-text-primary">{activity.action}</p>
                            <p className="text-xs text-text-secondary">{formatTimestamp(activity.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Icon name="Clock" size={48} className="text-text-secondary mx-auto mb-4" />
                      <p className="text-text-secondary">No activity history available</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-border bg-secondary-25">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary px-4 py-2 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="btn-primary px-4 py-2 rounded-lg font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;