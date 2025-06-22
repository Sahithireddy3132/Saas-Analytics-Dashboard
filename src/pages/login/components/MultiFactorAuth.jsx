import React, { useState, useEffect, useRef } from 'react';
import Icon from 'components/AppIcon';

const MultiFactorAuth = ({ email, onSuccess, onCancel }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Mock MFA code for demo
  const mockMFACode = '123456';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setCode(newCode);
    
    // Focus last filled input or first empty input
    const lastFilledIndex = newCode.findIndex(digit => digit === '');
    const focusIndex = lastFilledIndex === -1 ? 5 : Math.max(0, lastFilledIndex - 1);
    inputRefs.current[focusIndex]?.focus();

    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (codeToVerify = code.join('')) => {
    if (codeToVerify.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (codeToVerify === mockMFACode) {
      onSuccess();
    } else {
      setError('Invalid verification code. Please try again.');
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }

    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setCanResend(false);
    setTimeLeft(30);
    setError('');
    
    // Simulate resend API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Verification code resent to:', email);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg shadow-modal max-w-md w-full p-6 animation-fade-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={32} className="text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">
            Two-Factor Authentication
          </h2>
          <p className="text-text-secondary text-sm">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-text-primary font-medium text-sm mt-1">
            {email}
          </p>
        </div>

        {/* Demo Code Helper */}
        <div className="bg-accent-50 border border-accent-200 rounded-lg p-3 mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-accent-600" />
            <div className="text-sm">
              <span className="text-accent-700 font-medium">Demo Code: </span>
              <span className="text-accent-600 font-mono">{mockMFACode}</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-3 mb-6 flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-error-700">{error}</p>
          </div>
        )}

        {/* Code Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Enter verification code
          </label>
          <div className="flex justify-center space-x-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-12 text-center text-lg font-bold border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                  error ? 'border-error-500' : 'border-border'
                }`}
                disabled={isLoading}
              />
            ))}
          </div>
        </div>

        {/* Resend Code */}
        <div className="text-center mb-6">
          {canResend ? (
            <button
              onClick={handleResendCode}
              className="text-sm text-accent-600 hover:text-accent-700 font-medium transition-colors duration-200"
            >
              Resend verification code
            </button>
          ) : (
            <p className="text-sm text-text-secondary">
              Resend code in {formatTime(timeLeft)}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => handleVerify()}
            disabled={isLoading || code.some(digit => digit === '')}
            className="w-full btn-primary px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <Icon name="Shield" size={20} />
                <span>Verify Code</span>
              </>
            )}
          </button>

          <button
            onClick={onCancel}
            disabled={isLoading}
            className="w-full btn-secondary px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Back to Login</span>
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-secondary-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Lock" size={16} className="text-text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-text-secondary">
              This extra security step helps protect your account from unauthorized access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiFactorAuth;