import React from 'react';
import { TestResult } from '../services';
import './TestResultViewer.css';

interface TestResultViewerProps {
  results: TestResult[];
}

const TestResultViewer: React.FC<TestResultViewerProps> = ({ results }) => {
  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  const overallPassed = passedCount === totalCount;

  const getStatusDisplay = (result: TestResult): string => {
    if (result.passed) {
      return 'Accepted';
    }
    
    if (result.error) {
      if (result.error.toLowerCase().includes('time')) {
        return 'Time Limit Exceeded';
      }
      if (result.error.toLowerCase().includes('memory')) {
        return 'Memory Limit Exceeded';
      }
      if (result.error.toLowerCase().includes('compile')) {
        return 'Compile Error';
      }
      if (result.error.toLowerCase().includes('runtime')) {
        return 'Runtime Error';
      }
    }
    
    return 'Wrong Answer';
  };

  const getStatusColor = (result: TestResult): string => {
    if (result.passed) return '#22c55e';
    
    if (result.error) {
      if (result.error.toLowerCase().includes('time')) return '#f59e0b';
      if (result.error.toLowerCase().includes('memory')) return '#f59e0b';
      if (result.error.toLowerCase().includes('compile')) return '#8b5cf6';
      if (result.error.toLowerCase().includes('runtime')) return '#ef4444';
    }
    
    return '#ef4444'; // Wrong Answer
  };

  const formatExecutionTime = (time?: number): string => {
    if (!time) return '';
    if (time < 1000) return `${Math.round(time)}ms`;
    return `${(time / 1000).toFixed(2)}s`;
  };

  const formatMemoryUsage = (memory?: number): string => {
    if (!memory) return '';
    if (memory < 1024) return `${Math.round(memory)}B`;
    if (memory < 1024 * 1024) return `${(memory / 1024).toFixed(1)}KB`;
    return `${(memory / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <div className="test-result-viewer-simple">
      <div className={`result-header ${overallPassed ? 'passed' : 'failed'}`}>
        <div className="result-status">
          {overallPassed ? (
            <>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span>All Tests Passed</span>
            </>
          ) : (
            <>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
              <span>Tests Failed</span>
            </>
          )}
        </div>
        <div className="result-stats">
          {passedCount}/{totalCount}
        </div>
      </div>

      <div className="test-cases-grid">
        {results.map((result, index) => (
          <div 
            key={index} 
            className="test-case-compact"
            style={{ backgroundColor: getStatusColor(result) }}
          >
            <div className="test-case-info">
              <span className="test-num">#{index + 1}</span>
              <span className="test-status">{getStatusDisplay(result)}</span>
            </div>
            {(result.executionTime || result.memoryUsage) && (
              <div className="test-metrics">
                {result.executionTime && (
                  <span>{formatExecutionTime(result.executionTime)}</span>
                )}
                {result.memoryUsage && (
                  <span>{formatMemoryUsage(result.memoryUsage)}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResultViewer;