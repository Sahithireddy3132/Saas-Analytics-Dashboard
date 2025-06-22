import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const UserTable = ({
  users,
  selectedUsers,
  sortConfig,
  onSort,
  onUserSelect,
  onSelectAll,
  onUserClick,
  onUserDelete
}) => {
  const formatLastLogin = (lastLogin) => {
    if (!lastLogin) return 'Never';
    
    const now = new Date();
    const diff = now - lastLogin;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return lastLogin.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success-100 text-success-700';
      case 'Inactive': return 'bg-secondary-100 text-secondary-700';
      case 'Pending': return 'bg-warning-100 text-warning-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-error-100 text-error-700';
      case 'Manager': return 'bg-primary-100 text-primary-700';
      case 'Analyst': return 'bg-accent-100 text-accent-700';
      case 'Viewer': return 'bg-secondary-100 text-secondary-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const isAllSelected = users.length > 0 && selectedUsers.length === users.length;
  const isIndeterminate = selectedUsers.length > 0 && selectedUsers.length < users.length;

  return (
    <div className="card overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={input => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-border focus:ring-primary-500"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
                >
                  <span>User</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('role')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
                >
                  <span>Role</span>
                  <Icon name={getSortIcon('role')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('team')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
                >
                  <span>Team</span>
                  <Icon name={getSortIcon('team')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('lastLogin')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
                >
                  <span>Last Login</span>
                  <Icon name={getSortIcon('lastLogin')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-secondary-25 transition-colors duration-200 cursor-pointer"
                onClick={() => onUserClick(user)}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      onUserSelect(user.id, e.target.checked);
                    }}
                    className="rounded border-border focus:ring-primary-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary-100">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">{user.name}</div>
                      <div className="text-sm text-text-secondary">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-text-primary">{user.team}</td>
                <td className="px-6 py-4 text-sm text-text-secondary">{formatLastLogin(user.lastLogin)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUserClick(user);
                      }}
                      className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
                      title="View/Edit User"
                    >
                      <Icon name="Edit" size={16} className="text-text-secondary" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Are you sure you want to remove ${user.name}?`)) {
                          onUserDelete(user.id);
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-error-50 transition-colors duration-200"
                      title="Remove User"
                    >
                      <Icon name="Trash2" size={16} className="text-error-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {users.map((user) => (
          <div key={user.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => onUserSelect(user.id, e.target.checked)}
                  className="rounded border-border focus:ring-primary-500 mt-1"
                />
                <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-100">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">{user.name}</div>
                  <div className="text-xs text-text-secondary">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onUserClick(user)}
                  className="p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
                >
                  <Icon name="Edit" size={16} className="text-text-secondary" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to remove ${user.name}?`)) {
                      onUserDelete(user.id);
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-error-50 transition-colors duration-200"
                >
                  <Icon name="Trash2" size={16} className="text-error-600" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-text-secondary">Role:</span>
                <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">Team:</span>
                <span className="ml-2 text-text-primary">{user.team}</span>
              </div>
              <div>
                <span className="text-text-secondary">Status:</span>
                <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">Last Login:</span>
                <span className="ml-2 text-text-primary">{formatLastLogin(user.lastLogin)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No users found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default UserTable;