import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import LoginForm from './components/LoginForm';
import ProductShowcase from './components/ProductShowcase';
import MultiFactorAuth from './components/MultiFactorAuth';

const Login = () => {
  const navigate = useNavigate();
  const [showMFA, setShowMFA] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLoginSuccess = (email, requiresMFA = false) => {
    if (requiresMFA) {
      setUserEmail(email);
      setShowMFA(true);
    } else {
      navigate('/main-dashboard');
    }
  };

  const handleMFASuccess = () => {
    setShowMFA(false);
    navigate('/main-dashboard');
  };

  const handleMFACancel = () => {
    setShowMFA(false);
    setUserEmail('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-text-primary">Analytics</span>
                <span className="text-xs text-text-secondary">Dashboard</span>
              </div>
            </div>

            {/* Help Link */}
            <div className="flex items-center space-x-4">
              <button className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 flex items-center space-x-1">
                <Icon name="HelpCircle" size={16} />
                <span>Help</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Column - Login Form */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <div className="card p-8">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-text-primary mb-2">
                      Welcome Back
                    </h1>
                    <p className="text-text-secondary">
                      Sign in to access your analytics dashboard
                    </p>
                  </div>

                  <LoginForm onLoginSuccess={handleLoginSuccess} />

                  {/* Secondary Actions */}
                  <div className="mt-6 text-center space-y-4">
                    <button
                      onClick={() => console.log('Forgot password')}
                      className="text-sm text-accent-600 hover:text-accent-700 transition-colors duration-200"
                    >
                      Forgot your password?
                    </button>
                    
                    <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
                      <span>Don't have an account?</span>
                      <button
                        onClick={() => console.log('Create account')}
                        className="text-accent-600 hover:text-accent-700 font-medium transition-colors duration-200"
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Product Showcase */}
            <div className="hidden lg:block">
              <ProductShowcase />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-text-secondary">
              <button className="hover:text-text-primary transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="hover:text-text-primary transition-colors duration-200">
                Terms of Service
              </button>
              <button className="hover:text-text-primary transition-colors duration-200">
                Contact Support
              </button>
            </div>
            <div className="text-sm text-text-secondary">
              © {new Date().getFullYear()} Analytics Dashboard. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Multi-Factor Authentication Modal */}
      {showMFA && (
        <MultiFactorAuth
          email={userEmail}
          onSuccess={handleMFASuccess}
          onCancel={handleMFACancel}
        />
      )}
    </div>
  );
};

export default Login;