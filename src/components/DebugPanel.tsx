import { useState } from 'react';
import './DebugPanel.css';

interface DebugPanelProps {
  className?: string;
}

const DebugPanel = ({ className = '' }: DebugPanelProps) => {
  const [showDebug, setShowDebug] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Show debug panel in development mode OR when debug flag is enabled
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isDebugEnabled = process.env.REACT_APP_DEBUG === 'true';
  const shouldShowDebugPanel = isDevelopment || isDebugEnabled;

  if (!shouldShowDebugPanel) {
    return null;
  }

  // For production, require password authentication
  const isProduction = process.env.NODE_ENV === 'production';
  const DEBUG_PASSWORD = process.env.REACT_APP_DEBUG_PASSWORD || 'scpc2025debug';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === DEBUG_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Incorrect password');
      setPasswordInput('');
    }
  };

  const environmentInfo = {
    'NODE_ENV': process.env.NODE_ENV,
    'REACT_APP_API_BASE_URL': process.env.REACT_APP_API_BASE_URL,
    'REACT_APP_DEBUG': process.env.REACT_APP_DEBUG,
    'REACT_APP_DEBUG_PASSWORD': process.env.REACT_APP_DEBUG_PASSWORD ? '***SET***' : 'Not Set',
    'Current API URL': process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
    'Build Mode': process.env.NODE_ENV,
    'Debug Mode': process.env.REACT_APP_DEBUG || 'false',
    'Is Production': isProduction.toString(),
    'Is Authenticated': isAuthenticated.toString(),
    'User Agent': navigator.userAgent,
    'Current URL': window.location.href,
    'Current Domain': window.location.hostname,
    'Protocol': window.location.protocol,
    'Port': window.location.port || 'default',
    'Local Storage Keys': Object.keys(localStorage).join(', ') || 'None',
    'Session Storage Keys': Object.keys(sessionStorage).join(', ') || 'None',
    'Timestamp': new Date().toISOString(),
  };

  const testApiConnection = async () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
    console.log('🔍 Testing API Health:', `${apiUrl}/health`);
    
    try {
      const startTime = Date.now();
      const response = await fetch(`${apiUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const endTime = Date.now();
      const data = await response.json();
      
      const debugInfo = {
        url: `${apiUrl}/health`,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        responseTime: `${endTime - startTime}ms`,
        data: data
      };
      
      console.log('✅ API Health Response:', debugInfo);
      alert(`API Health Check:\n${JSON.stringify(debugInfo, null, 2)}`);
    } catch (error) {
      const errorInfo = {
        url: `${apiUrl}/health`,
        error: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.name : 'Unknown',
        stack: error instanceof Error ? error.stack : 'N/A'
      };
      console.error('❌ API Health Failed:', errorInfo);
      alert(`API Health Check Failed:\n${JSON.stringify(errorInfo, null, 2)}`);
    }
  };

  const testChallengesEndpoint = async () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
    console.log('🔍 Testing Challenges API:', `${apiUrl}/api/challenges/`);
    
    try {
      const startTime = Date.now();
      const response = await fetch(`${apiUrl}/api/challenges/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const endTime = Date.now();
      
      let data;
      let parseError = null;
      try {
        data = await response.json();
      } catch (e) {
        parseError = e instanceof Error ? e.message : 'JSON parse error';
        data = await response.text();
      }
      
      const debugInfo = {
        url: `${apiUrl}/api/challenges/`,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        responseTime: `${endTime - startTime}ms`,
        parseError: parseError,
        dataType: Array.isArray(data) ? 'array' : typeof data,
        dataLength: Array.isArray(data) ? data.length : data?.length || 'N/A',
        data: Array.isArray(data) ? data.slice(0, 2) : data // Show first 2 items only
      };
      
      console.log('✅ Challenges API Response:', debugInfo);
      alert(`Challenges API:\n${JSON.stringify(debugInfo, null, 2)}`);
    } catch (error) {
      const errorInfo = {
        url: `${apiUrl}/api/challenges/`,
        error: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.name : 'Unknown',
        stack: error instanceof Error ? error.stack : 'N/A'
      };
      console.error('❌ Challenges API Failed:', errorInfo);
      alert(`Challenges API Failed:\n${JSON.stringify(errorInfo, null, 2)}`);
    }
  };

  const testCORSHeaders = async () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
    console.log('🔍 Testing CORS:', apiUrl);
    
    try {
      const response = await fetch(`${apiUrl}/health`, {
        method: 'OPTIONS',
      });
      
      const corsHeaders = {
        'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
        'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
        'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
        'Access-Control-Allow-Credentials': response.headers.get('Access-Control-Allow-Credentials'),
      };
      
      console.log('✅ CORS Headers:', corsHeaders);
      alert(`CORS Headers:\n${JSON.stringify(corsHeaders, null, 2)}`);
    } catch (error) {
      console.error('❌ CORS Test Failed:', error);
      alert(`CORS Test Failed:\n${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className={`debug-panel ${className}`}>
      <button 
        className="debug-toggle-btn"
        onClick={() => setShowDebug(!showDebug)}
        title={`Debug Panel (${isDevelopment ? 'Development' : 'Production'})`}
      >
        🐛 Debug {isProduction && !isAuthenticated ? '🔒' : ''}
      </button>

      {showDebug && (
        <div className="debug-content">
          <div className="debug-header">
            <h3>🔍 Debug Information {isProduction ? '(Production)' : '(Development)'}</h3>
            <button 
              className="debug-close-btn"
              onClick={() => setShowDebug(false)}
            >
              ✕
            </button>
          </div>

          {/* Password Authentication for Production */}
          {isProduction && !isAuthenticated ? (
            <div className="debug-section">
              <h4>🔐 Authentication Required</h4>
              <form onSubmit={handlePasswordSubmit} className="debug-auth-form">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter debug password"
                  className="debug-password-input"
                />
                <button type="submit" className="debug-action-btn">
                  Unlock Debug Panel
                </button>
                {authError && <div className="debug-auth-error">{authError}</div>}
              </form>
              <div className="debug-auth-hint">
                Debug password is required in production mode
              </div>
            </div>
          ) : (
            <>
              <div className="debug-section">
                <h4>Environment Variables</h4>
                <div className="debug-info">
                  {Object.entries(environmentInfo).map(([key, value]) => (
                    <div key={key} className="debug-item">
                      <span className="debug-key">{key}:</span>
                      <span className="debug-value">{value || 'undefined'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="debug-section">
                <h4>API Testing</h4>
                <div className="debug-actions">
                  <button 
                    className="debug-action-btn"
                    onClick={testApiConnection}
                  >
                    Test Health Endpoint
                  </button>
                  <button 
                    className="debug-action-btn"
                    onClick={testChallengesEndpoint}
                  >
                    Test Challenges API
                  </button>
                  <button 
                    className="debug-action-btn"
                    onClick={testCORSHeaders}
                  >
                    Test CORS Headers
                  </button>
                </div>
              </div>

              <div className="debug-section">
                <h4>Quick Actions</h4>
                <div className="debug-actions">
                  <button 
                    className="debug-action-btn"
                    onClick={() => localStorage.clear()}
                  >
                    Clear Local Storage
                  </button>
                  <button 
                    className="debug-action-btn"
                    onClick={() => sessionStorage.clear()}
                  >
                    Clear Session Storage
                  </button>
                  <button 
                    className="debug-action-btn"
                    onClick={() => window.location.reload()}
                  >
                    Reload Page
                  </button>
                  {isProduction && (
                    <button 
                      className="debug-action-btn debug-logout-btn"
                      onClick={() => setIsAuthenticated(false)}
                    >
                      🔒 Lock Debug Panel
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DebugPanel;