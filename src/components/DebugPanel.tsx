import { useState } from 'react';
import './DebugPanel.css';

interface DebugPanelProps {
  className?: string;
}

const DebugPanel = ({ className = '' }: DebugPanelProps) => {
  const [showDebug, setShowDebug] = useState(false);

  // Only show debug panel in development mode
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       process.env.REACT_APP_DEBUG === 'true';

  if (!isDevelopment) {
    return null;
  }

  const environmentInfo = {
    'NODE_ENV': process.env.NODE_ENV,
    'REACT_APP_API_BASE_URL': process.env.REACT_APP_API_BASE_URL,
    'REACT_APP_DEBUG': process.env.REACT_APP_DEBUG,
    'Current API URL': process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
    'Build Mode': process.env.NODE_ENV,
    'Debug Mode': process.env.REACT_APP_DEBUG || 'false',
    'User Agent': navigator.userAgent,
    'Current URL': window.location.href,
    'Local Storage Keys': Object.keys(localStorage).join(', ') || 'None',
    'Session Storage Keys': Object.keys(sessionStorage).join(', ') || 'None',
  };

  const testApiConnection = async () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
    try {
      const response = await fetch(`${apiUrl}/health`);
      const data = await response.json();
      alert(`API Health Check:\nStatus: ${response.status}\nResponse: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      alert(`API Health Check Failed:\nError: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testChallengesEndpoint = async () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
    try {
      const response = await fetch(`${apiUrl}/api/challenges/`);
      const data = await response.json();
      console.log('Challenges API Response:', data);
      alert(`Challenges API:\nStatus: ${response.status}\nCount: ${Array.isArray(data) ? data.length : 'N/A'} challenges`);
    } catch (error) {
      alert(`Challenges API Failed:\nError: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className={`debug-panel ${className}`}>
      <button 
        className="debug-toggle-btn"
        onClick={() => setShowDebug(!showDebug)}
        title="Debug Panel (Development Only)"
      >
        🐛 Debug
      </button>

      {showDebug && (
        <div className="debug-content">
          <div className="debug-header">
            <h3>🔍 Debug Information</h3>
            <button 
              className="debug-close-btn"
              onClick={() => setShowDebug(false)}
            >
              ✕
            </button>
          </div>

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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;