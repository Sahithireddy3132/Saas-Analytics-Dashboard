import React from 'react';
import Icon from 'components/AppIcon';

const TeamSummaryCard = ({ users }) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'Active').length;
  const pendingUsers = users.filter(user => user.status === 'Pending').length;
  const inactiveUsers = users.filter(user => user.status === 'Inactive').length;

  const recentLogins = users.filter(user => {
    if (!user.lastLogin) return false;
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return user.lastLogin > dayAgo;
  }).length;

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      icon: 'Users',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      label: 'Active',
      value: activeUsers,
      icon: 'UserCheck',
      color: 'text-success-600',
      bgColor: 'bg-success-50'
    },
    {
      label: 'Pending',
      value: pendingUsers,
      icon: 'UserX',
      color: 'text-warning-600',
      bgColor: 'bg-warning-50'
    },
    {
      label: 'Inactive',
      value: inactiveUsers,
      icon: 'UserMinus',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50'
    }
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Team Summary</h3>
        <Icon name="TrendingUp" size={20} className="text-text-secondary" />
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary-25">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <Icon name={stat.icon} size={20} className={stat.color} />
              </div>
              <span className="text-sm font-medium text-text-primary">{stat.label}</span>
            </div>
            <span className="text-lg font-semibold text-text-primary">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-success-600" />
            <span className="text-sm text-text-secondary">Recent Logins (24h)</span>
          </div>
          <span className="text-sm font-semibold text-success-600">{recentLogins}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamSummaryCard;