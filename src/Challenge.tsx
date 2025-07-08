import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CodeEditor from './components/CodeEditor';
import TestResultViewer from './components/TestResultViewer';
import CollapsiblePanel from './components/CollapsiblePanel';
import { useScrollToTop } from './hooks/useScrollToTop';
import { apiService, ChallengeData, TestResult } from './services';
import './Challenge.css';
import './components/CodeEditor.css';

function Challenge() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('python');
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);

  useScrollToTop();

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!challengeId) return;
      
      try {
        setIsLoading(true);
        const data = await apiService.getChallenge(challengeId);
        setChallenge(data);
        if (data && data.starterCode[selectedLanguage]) {
          setCode(data.starterCode[selectedLanguage]);
        }
      } catch (error) {
        console.error('Failed to fetch challenge:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChallenge();
  }, [challengeId, selectedLanguage]);

  useEffect(() => {
    if (challenge && challenge.starterCode[selectedLanguage]) {
      setCode(challenge.starterCode[selectedLanguage]);
    }
  }, [selectedLanguage, challenge]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#22c55e';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const runCode = async () => {
    if (!challenge || !challengeId) return;
    
    setIsRunning(true);
    setTestResults([]);

    try {
      const results = await apiService.testCode({
        problemId: challengeId,
        code: code,
        language: selectedLanguage
      });
      
      setTestResults(results);
    } catch (error) {
      console.error('Error running code:', error);
      setTestResults([{
        passed: false,
        input: 'Error',
        expectedOutput: '',
        actualOutput: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }]);
    } finally {
      setIsRunning(false);
    }
  };

  const submitCode = async () => {
    if (!challenge || !challengeId) return;
    
    setIsRunning(true);
    setTestResults([]);

    try {
      const submission = await apiService.submitCode({
        problemId: challengeId,
        code: code,
        language: selectedLanguage
      });
      
      if (submission.results) {
        setTestResults(submission.results);
      }
      
      console.log('Submission completed:', submission);
    } catch (error) {
      console.error('Error submitting code:', error);
      setTestResults([{
        passed: false,
        input: 'Error',
        expectedOutput: '',
        actualOutput: '',
        error: error instanceof Error ? error.message : 'Submission failed'
      }]);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    if (challenge && challenge.starterCode[selectedLanguage]) {
      setCode(challenge.starterCode[selectedLanguage]);
      setTestResults([]);
    }
  };

  if (isLoading) {
    return (
      <div className="app">
        <Header />
        <main>
          <div className="challenge-loading">
            <div className="loading-spinner"></div>
            <p>Loading challenge...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="app">
        <Header />
        <main>
          <div className="challenge-not-found">
            <h2>Challenge Not Found</h2>
            <p>The challenge you're looking for doesn't exist.</p>
            <Link to="/challenges" className="back-button">
              ← Back to Challenges
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />

      <main className="challenge-main">
        <div className={`challenge-layout ${!isLeftPanelOpen ? 'collapsed-left' : ''}`}>
          
          {/* Problem Description Panel */}
          <div className="problem-panel">
            <CollapsiblePanel 
              title={challenge.title} 
              defaultOpen={true} 
              className="left-panel"
              onToggle={setIsLeftPanelOpen}
            >
              <div className="problem-header-content">
                <Link to="/challenges" className="back-link">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Challenges
                </Link>
                
                <div className="problem-meta">
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(challenge.difficulty) }}
                  >
                    {challenge.difficulty}
                  </span>
                  <div className="problem-tags">
                    {challenge.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="problem-description">
                <p>{challenge.description}</p>
              </div>

              <div className="problem-examples">
                <h4>Examples</h4>
                {challenge.examples.map((example, index) => (
                  <div key={index} className="example">
                    <div className="example-header">Example {index + 1}:</div>
                    <div className="example-content">
                      <div className="example-io">
                        <strong>Input:</strong> <code>{example.input}</code>
                      </div>
                      <div className="example-io">
                        <strong>Output:</strong> <code>{example.output}</code>
                      </div>
                      {example.explanation && (
                        <div className="example-explanation">
                          <strong>Explanation:</strong> {example.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="problem-constraints">
                <h4>Constraints</h4>
                <ul>
                  {challenge.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>

              {challenge.hints && challenge.hints.length > 0 && (
                <div className="problem-hints">
                  <button 
                    className="hints-toggle"
                    onClick={() => setShowHints(!showHints)}
                  >
                    💡 {showHints ? 'Hide' : 'Show'} Hints ({challenge.hints.length})
                  </button>
                  {showHints && (
                    <div className="hints-content">
                      {challenge.hints.map((hint, index) => (
                        <div key={index} className="hint">
                          <strong>Hint {index + 1}:</strong> {hint}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {challenge.solution && (
                <div className="problem-solution">
                  <button 
                    className="solution-toggle"
                    onClick={() => setShowSolution(!showSolution)}
                  >
                    🔍 {showSolution ? 'Hide' : 'Show'} Solution
                  </button>
                  {showSolution && challenge.solution[selectedLanguage] && (
                    <div className="solution-content">
                      <pre><code>{challenge.solution[selectedLanguage]}</code></pre>
                    </div>
                  )}
                </div>
              )}
            </CollapsiblePanel>
          </div>

          {/* Code Editor Panel */}
          <div className="editor-panel">
            <div className="editor-header">
              <div className="language-selector">
                <label>Language:</label>
                <select 
                  value={selectedLanguage} 
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  {Object.keys(challenge.starterCode).map(lang => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="editor-actions">
                <button onClick={resetCode} className="reset-button">
                  Reset Code
                </button>
                <button onClick={runCode} disabled={isRunning} className="run-button">
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
                <button onClick={submitCode} disabled={isRunning} className="submit-button">
                  {isRunning ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>

            <div className="code-editor">
              <CodeEditor
                value={code}
                onChange={setCode}
                language={selectedLanguage}
                height="500px"
                theme="vs-dark"
              />
            </div>

            {/* Test Results Popup */}
            {testResults.length > 0 && (
              <div className="test-results-popup">
                <div className="test-results-overlay" onClick={() => setTestResults([])} />
                <div className="test-results-modal">
                  <div className="test-results-header">
                    <h3>Test Results</h3>
                    <button 
                      className="close-results-btn"
                      onClick={() => setTestResults([])}
                    >
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="test-results-content">
                    <TestResultViewer results={testResults} />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default Challenge;