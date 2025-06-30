import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      const sections = document.querySelectorAll('.about-section[data-aos="fade-up"]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.8) {
          section.classList.add('aos-animate');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const execTeam = [
    {
      name: "Alex Chen",
      role: "President",
      year: "3rd Year Computer Science",
      bio: "Passionate about algorithms and competitive programming. Led the team to ICPC regionals 2024.",
      achievements: ["ICPC Regional Qualifier", "Google Code Jam Round 2", "Codeforces Expert"]
    },
    {
      name: "Sarah Kim",
      role: "Vice President",
      year: "2nd Year Software Engineering", 
      bio: "Loves organizing events and building the competitive programming community at USyd.",
      achievements: ["AtCoder Regular Contest Winner", "Facebook Hacker Cup Round 1", "LeetCode Contest Top 10%"]
    },
    {
      name: "Marcus Thompson",
      role: "Secretary",
      year: "3rd Year Computer Science",
      bio: "Focuses on training new members and creating educational content for the club.",
      achievements: ["USACO Platinum", "TopCoder SRM Division 1", "Multiple Codeforces Contest Winner"]
    },
    {
      name: "Emily Zhang",
      role: "Treasurer", 
      year: "2nd Year Data Science",
      bio: "Manages club finances and coordinates with university administration.",
      achievements: ["Kaggle Competition Medal", "HackerRank Certified", "ACM-ICPC Regional Participant"]
    },
    {
      name: "David Rodriguez",
      role: "Events Coordinator",
      year: "3rd Year Mathematics & Computer Science",
      bio: "Organizes weekly contests and coordinates with other university programming clubs.",
      achievements: ["Math Olympiad Finalist", "Google Kickstart Round 2", "CodeChef 5-Star Rating"]
    }
  ];

  return (
    <div className="app">
      <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <Link to="/">
              <img src="/logo_full_white_4x.png" alt="SCPC Logo" />
            </Link>
          </div>
          <div className="nav-links desktop-nav">
            <Link to="/" className="nav-button">Home</Link>
            <Link to="/events" className="nav-button">Events</Link>
            <button className="nav-button">Challenges</button>
            <button className="nav-button primary">
              Sign In
            </button>
          </div>
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
        <div className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}>
          <Link to="/" className="nav-button mobile">Home</Link>
          <Link to="/events" className="nav-button mobile">Events</Link>
          <button className="nav-button mobile">Challenges</button>
          <button className="nav-button primary mobile">
            Sign In
          </button>
        </div>
      </nav>

      <main>
        <div className="about-hero">
          <div className="about-hero-content">
            <h1 className="about-title">About SCPC</h1>
            <p className="about-subtitle">
              Building Sydney's most passionate competitive programming community
            </p>
          </div>
        </div>

        <div className="about-content">
          <div className="about-container">
            
            <div className="about-section" data-aos="fade-up">
              <div className="section-window">
                <h2 className="section-title">Our Story</h2>
                <div className="section-content">
                  <p>
                    Founded in 2024 by a group of passionate University of Sydney students, SCPC emerged from a simple idea: 
                    competitive programming is more fun and effective when done together. What started as informal study sessions 
                    in the library has grown into a vibrant community of problem-solvers, algorithm enthusiasts, and future tech leaders.
                  </p>
                  <p>
                    We believe that competitive programming shouldn't be intimidating or isolating. Our club creates a welcoming 
                    environment where students of all skill levels can learn, practice, and compete together. Whether you're a 
                    complete beginner or aiming for ICPC World Finals, you'll find your place in our community.
                  </p>
                </div>
              </div>
            </div>

            <div className="about-section" data-aos="fade-up">
              <div className="section-window">
                <h2 className="section-title">What We Do</h2>
                <div className="section-content">
                  <div className="activities-grid">
                    <div className="activity-card">
                      <div className="activity-icon">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3>Weekly Training Sessions</h3>
                      <p>Regular practice sessions covering algorithms, data structures, and problem-solving techniques.</p>
                    </div>
                    <div className="activity-card">
                      <div className="activity-icon">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3>Internal Competitions</h3>
                      <p>Monthly contests to practice problem-solving under time pressure and track improvement.</p>
                    </div>
                    <div className="activity-card">
                      <div className="activity-icon">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3>ICPC Training</h3>
                      <p>Specialized preparation for ACM-ICPC and other major competitive programming competitions.</p>
                    </div>
                    <div className="activity-card">
                      <div className="activity-icon">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3>Study Groups</h3>
                      <p>Collaborative learning sessions and peer mentoring for algorithm mastery.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-section" data-aos="fade-up">
              <div className="section-window">
                <h2 className="section-title">Meet the Team</h2>
                <div className="section-content">
                  <p className="team-intro">
                    Our executive team is composed of dedicated students who are passionate about competitive programming 
                    and committed to fostering an inclusive, supportive community.
                  </p>
                  <div className="team-grid">
                    {execTeam.map((member, index) => (
                      <div key={index} className="team-card">
                        <div className="team-member-header">
                          <div className="member-avatar">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="member-info">
                            <h3 className="member-name">{member.name}</h3>
                            <p className="member-role">{member.role}</p>
                            <p className="member-year">{member.year}</p>
                          </div>
                        </div>
                        <p className="member-bio">{member.bio}</p>
                        <div className="member-achievements">
                          <h4>Key Achievements:</h4>
                          <ul>
                            {member.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="about-section" data-aos="fade-up">
              <div className="section-window">
                <h2 className="section-title">Join Our Community</h2>
                <div className="section-content">
                  <p>
                    Ready to level up your programming skills and be part of something amazing? We welcome students of all 
                    backgrounds and skill levels. Whether you're just starting your coding journey or you're already solving 
                    complex algorithms, there's a place for you in SCPC.
                  </p>
                  <div className="join-cta">
                    <a href="https://discord.gg/uhZbmVcpS7" target="_blank" rel="noopener noreferrer" className="cta-button primary">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
                      </svg>
                      <span>Join Our Discord</span>
                    </a>
                    <Link to="/" className="cta-button secondary">
                      <span>Back to Home</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>About SCPC</h3>
              <p>
                Sydney Competitive Programming Club is dedicated to helping students improve their 
                algorithmic thinking and competitive programming skills.
              </p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <a href="/problems">Practice Problems</a>
                </li>
                <li>
                  <a href="/competitions">Competitions</a>
                </li>
                <li>
                  <a href="/resources">Resources</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Connect With Us</h3>
              <div className="social-links">
                <a 
                  href="https://discord.gg/scpc" 
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Discord"
                >
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com/scpc-org" 
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                >
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="mailto:contact@scpc.org.au"
                  title="Email"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; 2025 Sydney Competitive Programming Club
            </p>
            <p>
              Developed by James Zhao
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;