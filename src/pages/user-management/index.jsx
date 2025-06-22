import React, { useState, useEffect } from 'react';
import CollapsibleSidebar from 'components/ui/CollapsibleSidebar';
import HeaderBar from 'components/ui/HeaderBar';
import Icon from 'components/AppIcon';

import UserTable from './components/UserTable';
import TeamSummaryCard from './components/TeamSummaryCard';
import RoleDistributionChart from './components/RoleDistributionChart';
import QuickActionsPanel from './components/QuickActionsPanel';
import UserProfileModal from './components/UserProfileModal';
import InviteUserModal from './components/InviteUserModal';
import BulkActionsModal from './components/BulkActionsModal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isBulkActionsModalOpen, setIsBulkActionsModalOpen] = useState(false);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Admin',
      team: 'Engineering',
      status: 'Active',
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      joinDate: new Date('2023-01-15'),
      permissions: ['read', 'write', 'admin'],
      activityHistory: [
        { action: 'Logged in', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { action: 'Updated user permissions', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      ]
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      role: 'Manager',
      team: 'Product',
      status: 'Active',
      lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      joinDate: new Date('2023-02-20'),
      permissions: ['read', 'write'],
      activityHistory: [
        { action: 'Logged in', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) },
        { action: 'Created new report', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) }
      ]
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      role: 'Analyst',
      team: 'Marketing',
      status: 'Active',
      lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      joinDate: new Date('2023-03-10'),
      permissions: ['read'],
      activityHistory: [
        { action: 'Logged in', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
        { action: 'Viewed analytics dashboard', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) }
      ]
    },
    {
      id: 4,
      name: 'David Thompson',
      email: 'david.thompson@company.com',
      role: 'Viewer',
      team: 'Sales',
      status: 'Inactive',
      lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      joinDate: new Date('2023-04-05'),
      permissions: ['read'],
      activityHistory: [
        { action: 'Logged in', timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        { action: 'Downloaded report', timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) }
      ]
    },
    {
      id: 5,
      name: 'Lisa Wang',
      email: 'lisa.wang@company.com',
      role: 'Manager',
      team: 'Engineering',
      status: 'Active',
      lastLogin: new Date(Date.now() - 30 * 60 * 1000),
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      joinDate: new Date('2023-01-25'),
      permissions: ['read', 'write'],
      activityHistory: [
        { action: 'Logged in', timestamp: new Date(Date.now() - 30 * 60 * 1000) },
        { action: 'Updated team settings', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) }
      ]
    },
    {
      id: 6,
      name: 'James Wilson',
      email: 'james.wilson@company.com',
      role: 'Analyst',
      team: 'Product',
      status: 'Pending',
      lastLogin: null,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      joinDate: new Date('2024-01-10'),
      permissions: ['read'],
      activityHistory: []
    }
  ];

  useEffect(() => {
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesTeam = teamFilter === 'all' || user.team === teamFilter;
      
      return matchesSearch && matchesRole && matchesStatus && matchesTeam;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'lastLogin') {
          aValue = aValue ? aValue.getTime() : 0;
          bValue = bValue ? bValue.getTime() : 0;
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredUsers(filtered);
  }, [users, searchQuery, roleFilter, statusFilter, teamFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleUserSelect = (userId, isSelected) => {
    if (isSelected) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleUserProfileClick = (user) => {
    setSelectedUserProfile(user);
    setIsProfileModalOpen(true);
  };

  const handleInviteUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      status: 'Pending',
      lastLogin: null,
      joinDate: new Date(),
      activityHistory: []
    };
    setUsers(prev => [...prev, newUser]);
    setIsInviteModalOpen(false);
  };

  const handleBulkAction = (action, data) => {
    setUsers(prev => prev.map(user => {
      if (selectedUsers.includes(user.id)) {
        switch (action) {
          case 'changeRole':
            return { ...user, role: data.role };
          case 'changeStatus':
            return { ...user, status: data.status };
          case 'changeTeam':
            return { ...user, team: data.team };
          default:
            return user;
        }
      }
      return user;
    }));
    setSelectedUsers([]);
    setIsBulkActionsModalOpen(false);
  };

  const handleUserUpdate = (updatedUser) => {
    setUsers(prev => prev.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setIsProfileModalOpen(false);
  };

  const handleUserDelete = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const roles = ['Admin', 'Manager', 'Analyst', 'Viewer'];
  const statuses = ['Active', 'Inactive', 'Pending'];
  const teams = ['Engineering', 'Product', 'Marketing', 'Sales'];

  return (
    <div className="min-h-screen bg-background">
      <CollapsibleSidebar />
      <HeaderBar />
      
      <main className="lg:pl-80 pt-16">
        <div className="px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary mb-2">User Management</h1>
                <p className="text-text-secondary">
                  Manage team access, roles, and permissions across your organization
                </p>
              </div>
              <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                {selectedUsers.length > 0 && (
                  <button
                    onClick={() => setIsBulkActionsModalOpen(true)}
                    className="btn-secondary px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Bulk Actions ({selectedUsers.length})</span>
                  </button>
                )}
                <button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="btn-primary px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                >
                  <Icon name="UserPlus" size={16} />
                  <span>Invite User</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="card p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field w-full pl-10"
                  />
                </div>
              </div>

              {/* Role Filter */}
              <div>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="all">All Roles</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="all">All Status</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Team Filter */}
              <div>
                <select
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="all">All Teams</option>
                  {teams.map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Primary Section - User Table */}
            <div className="xl:col-span-8">
              <UserTable
                users={filteredUsers}
                selectedUsers={selectedUsers}
                sortConfig={sortConfig}
                onSort={handleSort}
                onUserSelect={handleUserSelect}
                onSelectAll={handleSelectAll}
                onUserClick={handleUserProfileClick}
                onUserDelete={handleUserDelete}
              />
            </div>

            {/* Secondary Section - Summary & Actions */}
            <div className="xl:col-span-4 space-y-6">
              <TeamSummaryCard users={users} />
              <RoleDistributionChart users={users} />
              <QuickActionsPanel 
                onInviteUser={() => setIsInviteModalOpen(true)}
                selectedUsersCount={selectedUsers.length}
                onBulkActions={() => setIsBulkActionsModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {isInviteModalOpen && (
        <InviteUserModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          onInvite={handleInviteUser}
          roles={roles}
          teams={teams}
        />
      )}

      {isBulkActionsModalOpen && (
        <BulkActionsModal
          isOpen={isBulkActionsModalOpen}
          onClose={() => setIsBulkActionsModalOpen(false)}
          onAction={handleBulkAction}
          selectedCount={selectedUsers.length}
          roles={roles}
          statuses={statuses}
          teams={teams}
        />
      )}

      {isProfileModalOpen && selectedUserProfile && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={selectedUserProfile}
          onUpdate={handleUserUpdate}
          roles={roles}
          teams={teams}
        />
      )}
    </div>
  );
};

export default UserManagement;