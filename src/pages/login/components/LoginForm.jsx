import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const LoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    admin: { email: 'admin@analytics.com', password: 'Admin123!', requiresMFA: true },
    manager: { email: 'manager@analytics.com', password: 'Manager123!', requiresMFA: false },
    analyst: { email: 'analyst@analytics.com', password: 'Analyst123!', requiresMFA: false },
    demo: { email: 'demo@analytics.com', password: 'Demo123!', requiresMFA: false }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check credentials
    const validCredential = Object.values(mockCredentials).find(
      cred => cred.email === formData.email && cred.password === formData.password
    );

    if (validCredential) {
      onLoginSuccess(formData.email, validCredential.requiresMFA);
    } else {
      setErrors({
        general: 'Invalid email or password. Please check your credentials and try again.'
      });
    }

    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fillDemoCredentials = (userType) => {
    const credentials = mockCredentials[userType];
    setFormData(prev => ({
      ...prev,
      email: credentials.email,
      password: credentials.password
    }));
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error */}
      {errors.general && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-4 flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} className="text-error-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-error-700 font-medium">Authentication Failed</p>
            <p className="text-sm text-error-600 mt-1">{errors.general}</p>
          </div>
        </div>
      )}

      {/* Demo Credentials Helper */}
      <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-accent-700 font-medium mb-2">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="text-left p-2 bg-accent-100 rounded hover:bg-accent-200 transition-colors duration-200"
              >
                <div className="font-medium text-accent-800">Admin (MFA)</div>
                <div className="text-accent-600">admin@analytics.com</div>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('manager')}
                className="text-left p-2 bg-accent-100 rounded hover:bg-accent-200 transition-colors duration-200"
              >
                <div className="font-medium text-accent-800">Manager</div>
                <div className="text-accent-600">manager@analytics.com</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Mail" size={16} className="text-text-secondary" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`input-field w-full pl-10 ${errors.email ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            placeholder="Enter your email address"
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-error-600 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Lock" size={16} className="text-text-secondary" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            className={`input-field w-full pl-10 pr-10 ${errors.password ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            placeholder="Enter your password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-text-primary transition-colors duration-200"
            disabled={isLoading}
          >
            <Icon 
              name={showPassword ? 'EyeOff' : 'Eye'} 
              size={16} 
              className="text-text-secondary" 
            />
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-error-600 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-border rounded"
            disabled={isLoading}
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-text-secondary">
            Remember me for 30 days
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Signing In...</span>
          </>
        ) : (
          <>
            <Icon name="LogIn" size={20} />
            <span>Sign In</span>
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;