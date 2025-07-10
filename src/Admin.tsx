import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DebugPanel from './components/DebugPanel';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { apiService } from './services';
import api from './services/api';
import './Admin.css';

const ADMIN_PASSWORD = 'general.scpc@gmail.com';

interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  tags: string[];
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  hints?: string[];
  starterCode: Record<string, string>;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
  solution?: Record<string, string>;
}

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChallenge, setNewChallenge] = useState<Partial<Challenge & {
    tagsString: string;
    constraintsString: string;
    hintsString: string;
  }>>({
    difficulty: 'Easy',
    tags: [],
    tagsString: '',
    examples: [{ input: '', output: '' }],
    constraints: [],
    constraintsString: '',
    hints: [],
    hintsString: '',
    starterCode: { python: '' },
    testCases: [{ input: '', expectedOutput: '' }],
    solution: { python: '' }
  });

  useScrollToTop();
  useScrollAnimations('.admin-card[data-aos="fade-up"]');

  useEffect(() => {
    // Check if already authenticated
    const savedAuth = localStorage.getItem('admin-authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchChallenges();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin-authenticated', 'true');
      fetchChallenges();
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin-authenticated');
    setPassword('');
  };

  const fetchChallenges = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getChallenges();
      setChallenges(data);
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const challengeData = {
        ...newChallenge,
        tags: newChallenge.tagsString 
          ? newChallenge.tagsString.split(',').map(tag => tag.trim())
          : [],
        constraints: newChallenge.constraintsString
          ? newChallenge.constraintsString.split('\n').filter(c => c.trim())
          : [],
        hints: newChallenge.hintsString
          ? newChallenge.hintsString.split('\n').filter(h => h.trim())
          : []
      };
      
      // Remove the string fields before sending to API
      const { tagsString, constraintsString, hintsString, ...apiData } = challengeData;

      await api.post('/api/challenges/', apiData);
      alert('Challenge created successfully!');
      setShowCreateForm(false);
      fetchChallenges();
      
      // Reset form
      setNewChallenge({
        difficulty: 'Easy',
        tags: [],
        tagsString: '',
        examples: [{ input: '', output: '' }],
        constraints: [],
        constraintsString: '',
        hints: [],
        hintsString: '',
        starterCode: { python: '' },
        testCases: [{ input: '', expectedOutput: '' }],
        solution: { python: '' }
      });
    } catch (error) {
      console.error('Failed to create challenge:', error);
      alert('Failed to create challenge');
    }
  };

  const handleDeleteChallenge = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      try {
        await api.delete(`/api/challenges/${id}`);
        alert('Challenge deleted successfully!');
        fetchChallenges();
      } catch (error) {
        console.error('Failed to delete challenge:', error);
        alert('Failed to delete challenge');
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#22c55e';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="app">
        <Header />
        <main>
          <div className="admin-login">
            <div className="login-container">
              <h1>Admin Access</h1>
              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <DebugPanel />

      <main>
        <div className="admin-content">
          <div className="admin-container">
            
            <div className="admin-header">
              <h1 className="admin-title">Admin Dashboard</h1>
              <div className="admin-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCreateForm(!showCreateForm)}
                >
                  {showCreateForm ? 'Cancel' : 'Create Challenge'}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>

            {showCreateForm && (
              <div className="admin-card create-form" data-aos="fade-up">
                <h2>Create New Challenge</h2>
                <form onSubmit={handleCreateChallenge}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Challenge ID:</label>
                      <input
                        type="text"
                        value={newChallenge.id || ''}
                        onChange={(e) => setNewChallenge({...newChallenge, id: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Title:</label>
                      <input
                        type="text"
                        value={newChallenge.title || ''}
                        onChange={(e) => setNewChallenge({...newChallenge, title: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Difficulty:</label>
                      <select
                        value={newChallenge.difficulty || 'Easy'}
                        onChange={(e) => setNewChallenge({...newChallenge, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard'})}
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tags (comma separated):</label>
                      <input
                        type="text"
                        value={newChallenge.tagsString || ''}
                        onChange={(e) => setNewChallenge({...newChallenge, tagsString: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description:</label>
                    <textarea
                      value={newChallenge.description || ''}
                      onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Example Input:</label>
                    <input
                      type="text"
                      value={newChallenge.examples?.[0]?.input || ''}
                      onChange={(e) => setNewChallenge({
                        ...newChallenge, 
                        examples: [{
                          ...newChallenge.examples?.[0],
                          input: e.target.value,
                          output: newChallenge.examples?.[0]?.output || ''
                        }]
                      })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Example Output:</label>
                    <input
                      type="text"
                      value={newChallenge.examples?.[0]?.output || ''}
                      onChange={(e) => setNewChallenge({
                        ...newChallenge, 
                        examples: [{
                          ...newChallenge.examples?.[0],
                          input: newChallenge.examples?.[0]?.input || '',
                          output: e.target.value
                        }]
                      })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Constraints (one per line):</label>
                    <textarea
                      value={newChallenge.constraintsString || ''}
                      onChange={(e) => setNewChallenge({...newChallenge, constraintsString: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div className="form-group">
                    <label>Hints (one per line):</label>
                    <textarea
                      value={newChallenge.hintsString || ''}
                      onChange={(e) => setNewChallenge({...newChallenge, hintsString: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div className="form-group">
                    <label>Python Starter Code:</label>
                    <textarea
                      value={newChallenge.starterCode?.python || ''}
                      onChange={(e) => setNewChallenge({
                        ...newChallenge, 
                        starterCode: { ...newChallenge.starterCode, python: e.target.value }
                      })}
                      rows={5}
                    />
                  </div>

                  <div className="form-group">
                    <label>Test Case Input:</label>
                    <input
                      type="text"
                      value={newChallenge.testCases?.[0]?.input || ''}
                      onChange={(e) => setNewChallenge({
                        ...newChallenge, 
                        testCases: [{
                          ...newChallenge.testCases?.[0],
                          input: e.target.value,
                          expectedOutput: newChallenge.testCases?.[0]?.expectedOutput || ''
                        }]
                      })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Test Case Expected Output:</label>
                    <input
                      type="text"
                      value={newChallenge.testCases?.[0]?.expectedOutput || ''}
                      onChange={(e) => setNewChallenge({
                        ...newChallenge, 
                        testCases: [{
                          ...newChallenge.testCases?.[0],
                          input: newChallenge.testCases?.[0]?.input || '',
                          expectedOutput: e.target.value
                        }]
                      })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Python Solution:</label>
                    <textarea
                      value={newChallenge.solution?.python || ''}
                      onChange={(e) => setNewChallenge({
                        ...newChallenge, 
                        solution: { ...newChallenge.solution, python: e.target.value }
                      })}
                      rows={5}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Create Challenge
                  </button>
                </form>
              </div>
            )}

            <div className="admin-card challenges-list" data-aos="fade-up">
              <h2>Existing Challenges ({challenges.length})</h2>
              
              {isLoading ? (
                <div className="loading">Loading challenges...</div>
              ) : (
                <div className="challenges-grid">
                  {challenges.map((challenge) => (
                    <div key={challenge.id} className="challenge-item">
                      <div className="challenge-header">
                        <h3>{challenge.title}</h3>
                        <div className="challenge-meta">
                          <span 
                            className="difficulty-badge"
                            style={{ backgroundColor: getDifficultyColor(challenge.difficulty) }}
                          >
                            {challenge.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <p className="challenge-description">{challenge.description}</p>
                      
                      <div className="challenge-tags">
                        {challenge.tags.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                      
                      <div className="challenge-actions">
                        <Link 
                          to={`/challenges/${challenge.id}`}
                          className="btn btn-sm btn-primary"
                        >
                          View
                        </Link>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteChallenge(challenge.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Admin;