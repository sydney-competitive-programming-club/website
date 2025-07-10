import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { apiService, Challenge } from './services';
import './Challenges.css';

function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTop();
  useScrollAnimations('.challenge-card[data-aos="fade-up"]');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getChallenges();
        setChallenges(data);
        setFilteredChallenges(data);
      } catch (error) {
        console.error('Failed to fetch challenges:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChallenges();
  }, []);

  useEffect(() => {
    let filtered = challenges;

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(challenge => challenge.difficulty === selectedDifficulty);
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(challenge => challenge.tags.includes(selectedTag));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(challenge =>
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredChallenges(filtered);
  }, [challenges, selectedDifficulty, selectedTag, searchTerm]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#22c55e';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (challenge: Challenge) => {
    if (challenge.isCompleted) {
      return (
        <div className="status-icon completed">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
      );
    } else if (challenge.isAttempted) {
      return (
        <div className="status-icon attempted">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      );
    }
    return null;
  };

  const allTags = Array.from(new Set(challenges.flatMap(challenge => challenge.tags)));

  return (
    <div className="app">
      <Header />

      <main>
        <div className="challenges-content">
          <div className="challenges-container">
            
            <div className="challenges-header">
              <h1 className="challenges-title">Challenges</h1>
              <p className="challenges-subtitle">
                Practice your problem-solving skills with these pre-filled coding problems. 
                Each challenge contains intentional bugs for you to find and fix!
              </p>
            </div>

            <div className="challenges-filters">
              <div className="search-bar">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search challenges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-group">
                <label>Difficulty:</label>
                <select 
                  value={selectedDifficulty} 
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Topic:</label>
                <select 
                  value={selectedTag} 
                  onChange={(e) => setSelectedTag(e.target.value)}
                >
                  <option value="all">All Topics</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="challenges-loading">
                <div className="loading-spinner"></div>
                <p>Loading challenges...</p>
              </div>
            ) : (
              <div className="challenges-list">
                {filteredChallenges.map((challenge) => (
                  <Link 
                    key={challenge.id} 
                    to={`/challenges/${challenge.id}`} 
                    className="challenge-item"
                  >
                    <div className="challenge-info">
                      <div className="challenge-title-row">
                        <h3 className="challenge-title">{challenge.title}</h3>
                        {getStatusIcon(challenge)}
                      </div>
                      <div className="challenge-tags">
                        {challenge.tags.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="challenge-meta">
                      <span 
                        className="difficulty-badge"
                        style={{ backgroundColor: getDifficultyColor(challenge.difficulty) }}
                      >
                        {challenge.difficulty}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!isLoading && filteredChallenges.length === 0 && (
              <div className="no-challenges">
                <h3>No challenges found</h3>
                <p>Try adjusting your filters or search terms.</p>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Challenges;