import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const InviteUserModal = ({ isOpen, onClose, onInvite, roles, teams }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: roles[0] || '',
    team: teams[0] || '',
    sendWelcomeEmail: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onInvite({
        ...formData,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=1E40AF&color=fff`,
        permissions: ['read']
      });
      setFormData({
        name: '',
        email: '',
        role: roles[0] || '',
        team: teams[0] || '',
        sendWelcomeEmail: true
      });
    } catch (error) {
      console.error('Error inviting user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-surface shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon name="UserPlus" size={20} className="text-primary-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text-primary">Invite New User</h2>
                <p className="text-sm text-text-secondary">Send an invitation to join your team</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="input-field w-full"
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="input-field w-full"
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Role *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
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
                  Team *
                </label>
                <select
                  value={formData.team}
                  onChange={(e) => handleChange('team', e.target.value)}
                  className="input-field w-full"
                  required
                >
                  {teams.map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="sendWelcomeEmail"
                checked={formData.sendWelcomeEmail}
                onChange={(e) => handleChange('sendWelcomeEmail', e.target.checked)}
                className="rounded border-border focus:ring-primary-500"
              />
              <label htmlFor="sendWelcomeEmail" className="text-sm text-text-primary">
                Send welcome email with login instructions
              </label>
            </div>

            {/* Role Permissions Info */}
            <div className="bg-secondary-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-text-primary mb-2">Role Permissions</h4>
              <div className="text-xs text-text-secondary space-y-1">
                {formData.role === 'Admin' && (
                  <p>• Full system access and user management</p>
                )}
                {formData.role === 'Manager' && (
                  <>
                    <p>• Read and write access to dashboards</p>
                    <p>• Team management capabilities</p>
                  </>
                )}
                {formData.role === 'Analyst' && (
                  <>
                    <p>• Read access to analytics and reports</p>
                    <p>• Data export capabilities</p>
                  </>
                )}
                {formData.role === 'Viewer' && (
                  <p>• Read-only access to dashboards</p>
                )}
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-border bg-secondary-25">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary px-4 py-2 rounded-lg font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Icon name="Send" size={16} />
                  <span>Send Invitation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteUserModal;