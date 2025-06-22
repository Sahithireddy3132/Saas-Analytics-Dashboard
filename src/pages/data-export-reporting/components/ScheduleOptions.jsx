import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ScheduleOptions = ({ data, onChange, onPrevious }) => {
  const [scheduleType, setScheduleType] = useState('once');
  const [scheduleSettings, setScheduleSettings] = useState({
    frequency: 'daily',
    time: '09:00',
    timezone: 'UTC',
    dayOfWeek: 'monday',
    dayOfMonth: '1',
    endDate: '',
    maxRuns: ''
  });
  const [recipients, setRecipients] = useState(data.recipients || []);
  const [newRecipient, setNewRecipient] = useState('');

  const scheduleTypes = [
    {
      id: 'once',
      name: 'Run Once',
      description: 'Execute the export immediately',
      icon: 'Play'
    },
    {
      id: 'recurring',
      name: 'Recurring',
      description: 'Schedule automated exports',
      icon: 'Calendar'
    }
  ];

  const frequencies = [
    { id: 'daily', name: 'Daily', description: 'Every day at specified time' },
    { id: 'weekly', name: 'Weekly', description: 'Every week on specified day' },
    { id: 'monthly', name: 'Monthly', description: 'Every month on specified date' },
    { id: 'quarterly', name: 'Quarterly', description: 'Every 3 months' }
  ];

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney'
  ];

  const daysOfWeek = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];

  const handleScheduleTypeChange = (type) => {
    setScheduleType(type);
    onChange({ schedule: type === 'once' ? null : { type, settings: scheduleSettings } });
  };

  const handleSettingChange = (setting, value) => {
    const newSettings = { ...scheduleSettings, [setting]: value };
    setScheduleSettings(newSettings);
    if (scheduleType === 'recurring') {
      onChange({ schedule: { type: scheduleType, settings: newSettings } });
    }
  };

  const handleAddRecipient = () => {
    if (newRecipient && !recipients.includes(newRecipient)) {
      const newRecipients = [...recipients, newRecipient];
      setRecipients(newRecipients);
      setNewRecipient('');
      onChange({ recipients: newRecipients });
    }
  };

  const handleRemoveRecipient = (email) => {
    const newRecipients = recipients.filter(r => r !== email);
    setRecipients(newRecipients);
    onChange({ recipients: newRecipients });
  };

  const handleExport = () => {
    console.log('Starting export with configuration:', {
      ...data,
      schedule: scheduleType === 'once' ? null : { type: scheduleType, settings: scheduleSettings },
      recipients
    });
    // Implement export logic
  };

  const renderScheduleSettings = () => {
    if (scheduleType !== 'recurring') return null;

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-2">
            Frequency
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {frequencies.map((freq) => (
              <button
                key={freq.id}
                onClick={() => handleSettingChange('frequency', freq.id)}
                className={`p-3 border rounded-lg text-left transition-all duration-200 ${
                  scheduleSettings.frequency === freq.id
                    ? 'border-primary-500 bg-primary-50' :'border-border hover:border-primary-300'
                }`}
              >
                <div className="text-sm font-medium text-text-primary">{freq.name}</div>
                <div className="text-xs text-text-secondary">{freq.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">
              Time
            </label>
            <input
              type="time"
              value={scheduleSettings.time}
              onChange={(e) => handleSettingChange('time', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">
              Timezone
            </label>
            <select
              value={scheduleSettings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
        </div>

        {scheduleSettings.frequency === 'weekly' && (
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">
              Day of Week
            </label>
            <select
              value={scheduleSettings.dayOfWeek}
              onChange={(e) => handleSettingChange('dayOfWeek', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {scheduleSettings.frequency === 'monthly' && (
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">
              Day of Month
            </label>
            <select
              value={scheduleSettings.dayOfMonth}
              onChange={(e) => handleSettingChange('dayOfMonth', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day.toString()}>{day}</option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">
              End Date (Optional)
            </label>
            <input
              type="date"
              value={scheduleSettings.endDate}
              onChange={(e) => handleSettingChange('endDate', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">
              Max Runs (Optional)
            </label>
            <input
              type="number"
              value={scheduleSettings.maxRuns}
              onChange={(e) => handleSettingChange('maxRuns', e.target.value)}
              placeholder="Unlimited"
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-2">Schedule Options</h2>
        <p className="text-text-secondary">Configure when and how often to run your export</p>
      </div>

      {/* Schedule Type */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-4">Export Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scheduleTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleScheduleTypeChange(type.id)}
              className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                scheduleType === type.id
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500 ring-opacity-20' :'border-border hover:border-primary-300 hover:bg-secondary-25'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Icon name={type.icon} size={20} className="text-primary-600" />
                  <h4 className="text-sm font-semibold text-text-primary">{type.name}</h4>
                </div>
                <Icon 
                  name={scheduleType === type.id ? "CheckCircle" : "Circle"} 
                  size={20} 
                  className={scheduleType === type.id ? "text-primary-600" : "text-text-secondary"} 
                />
              </div>
              <p className="text-xs text-text-secondary">{type.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Settings */}
      {renderScheduleSettings()}

      {/* Recipients */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-4">Email Recipients</h3>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="email"
              value={newRecipient}
              onChange={(e) => setNewRecipient(e.target.value)}
              placeholder="Enter email address"
              className="flex-1 px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              onKeyPress={(e) => e.key === 'Enter' && handleAddRecipient()}
            />
            <button
              onClick={handleAddRecipient}
              className="btn-primary px-4 py-2 rounded-md flex items-center space-x-2"
            >
              <Icon name="Plus" size={16} />
              <span>Add</span>
            </button>
          </div>

          {recipients.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-text-secondary">Recipients ({recipients.length})</p>
              <div className="flex flex-wrap gap-2">
                {recipients.map((email) => (
                  <div
                    key={email}
                    className="flex items-center space-x-2 bg-primary-50 border border-primary-200 rounded-full px-3 py-1"
                  >
                    <span className="text-sm text-primary-700">{email}</span>
                    <button
                      onClick={() => handleRemoveRecipient(email)}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Summary */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="FileCheck" size={16} className="mr-2" />
          Export Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">Data Source:</span>
              <span className="font-medium text-text-primary">{data.dataSource || 'Not selected'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Format:</span>
              <span className="font-medium text-text-primary">{data.format?.toUpperCase() || 'Not selected'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Metrics:</span>
              <span className="font-medium text-text-primary">{data.metrics?.length || 0} selected</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">Schedule:</span>
              <span className="font-medium text-text-primary">
                {scheduleType === 'once' ? 'Run once' : `${scheduleSettings.frequency} at ${scheduleSettings.time}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Recipients:</span>
              <span className="font-medium text-text-primary">{recipients.length} email(s)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Est. Size:</span>
              <span className="font-medium text-text-primary">~{Math.floor(Math.random() * 50) + 10} MB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="btn-secondary px-6 py-2 rounded-lg font-medium flex items-center space-x-2"
        >
          <Icon name="ChevronLeft" size={16} />
          <span>Previous</span>
        </button>
        <button
          onClick={handleExport}
          className="btn-primary px-8 py-2 rounded-lg font-medium flex items-center space-x-2"
        >
          <Icon name="Download" size={16} />
          <span>{scheduleType === 'once' ? 'Start Export' : 'Schedule Export'}</span>
        </button>
      </div>
    </div>
  );
};

export default ScheduleOptions;