import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/main-dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-primary-50 rounded-full flex items-center justify-center mb-6">
            <Icon name="AlertTriangle" size={64} className="text-primary-600" />
          </div>
          <h1 className="text-6xl font-bold text-primary-600 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full btn-primary px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={20} />
            <span>Go to Dashboard</span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full btn-secondary px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Help Links */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-text-secondary mb-4">Need help? Try these links:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button
              onClick={() => navigate('/main-dashboard')}
              className="text-accent-600 hover:text-accent-700 transition-colors duration-200"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/analytics-reports')}
              className="text-accent-600 hover:text-accent-700 transition-colors duration-200"
            >
              Analytics
            </button>
            <button
              onClick={() => navigate('/settings-configuration')}
              className="text-accent-600 hover:text-accent-700 transition-colors duration-200"
            >
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;