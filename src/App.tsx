import Header from './components/Header';
import Footer from './components/Footer';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  useScrollToTop();
  useScrollAnimations('.qa-item[data-aos="fade-up"]');

  return (
    <div className="app">
      <Header hideLogoWhenHeroVisible={true} />

      <main>
        <div className="hero">
          <img src="/logo_full_white_4x.png" alt="Sydney Competitive Programming Club" className="hero-logo" />
        </div>

        <div className="qa-section">
          <div className="qa-container">
            
            <div className="qa-item" data-aos="fade-up">
              <h2 className="question">Who are we?</h2>
              <div className="answer">
                <p>Hey! We're just a bunch of students at the University of Sydney who love solving coding problems & figured it'd be more fun to do it together. 
                Started in 2024, we're pretty new but super passionate about competitive programming. Think of us as your coding study group, 
                but with more algorithms and less stress about assignments</p>
                <p>We run weekly coding sessions, help each other prep for tech interviews, and basically just hang out while getting better at programming.</p>
                <p>Want to know more about our team and what we're all about? Check: <a href="/about" className="link">detailed story and meet the team</a></p>
              </div>
            </div>

            <div className="qa-item" data-aos="fade-up">
              <h2 className="question">What kind of competitions?</h2>
              <div className="answer">
                <p>We're all about <strong>competitive programming challenges</strong>: those brain-bending problems that make you think 
                "how the heck do I solve this efficiently?" Think problems like finding the shortest path through a maze, optimizing resource allocation, 
                or figuring out complex patterns in data. We practice on platforms like Codeforces, AtCoder, and LeetCode, and we organize our own friendly competitions too.</p>
                <p>The big goal? Getting ready for major competitions like <strong>ICPC</strong> and representing USYD!
                Practicing these problems also helps you prepare for <strong>technical interviews and online assessments</strong> for job opportunities, 
                as companies heavily emphasize algorithmic problem-solving to evaluate candidates' logical thinking, coding skills, and ability to handle complexity under pressure.</p>
                <p>This practice can also generally improve your ability to tackle any coding task in your degree by strengthening critical thinking and problem-solving skills. 
                Even if you're just starting out, we've got beginner-friendly contests to get you going.</p>
              </div>
            </div>

            <div className="qa-item" data-aos="fade-up">
              <h2 className="question">What is ICPC and SPAR?</h2>
              <div className="answer">
                <p><strong>ICPC (International Collegiate Programming Contest)</strong> is basically the Olympics of competitive programming! 
                Teams of 3 students work together to solve complex algorithmic problems under time pressure. It's intense, it's fun, 
                  and it's a great way to test your skills against the best programmers worldwide. Learn more: <a href='https://sppcontests.org/south-pacific-icpc/' target="_blank" rel="noopener noreferrer" className="link">ICPC</a>. </p>
                <p><strong>SPAR (South Pacific Region)</strong> is our regional competition. 
                  Check out <a href="https://sppcontests.org/about/" target="_blank" rel="noopener noreferrer" className="link">about SPAR</a> - this is where we compete against other universities in our region. Get ready with these SPAR contests and show off later in the ICPC regional contests to proceed to further international contests!</p>
                <p>Don't worry if this sounds intimidating - we train together and build up to these competitions step by step. 
                Everyone starts somewhere, and we're here to help you level up! 🚀</p>
              </div>
            </div>

          </div>
        </div>

        <div className="home-sections">
          <div className="sections-container">
            <div className="explore">
              <div className="explore-window">
                <h3 className="section-title">Explore</h3>
                <p className="section-description">
                  Upcoming events & competitions
                </p>
                <Link to="/events" className="section-button">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  View Events
                </Link>
              </div>
            </div>

            <div className="connect">
              <div className="connect-window">
                <h3 className="section-title">Get Connected</h3>
                <p className="section-description">
                  Join our community
                </p>
                <div className="connect-buttons">
                  <a href="https://discord.gg/uhZbmVcpS7" target="_blank" rel="noopener noreferrer" className="section-button primary">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
                    </svg>
                    Discord
                  </a>
                  <a href="https://www.instagram.com/scpc_usyd/" target="_blank" rel="noopener noreferrer" className="section-button secondary">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C8.396 0 8.002.01 6.78.048 2.979.206.206 2.979.048 6.78.01 8.002 0 8.396 0 12.017c0 3.624.01 4.021.048 5.242.158 3.8 2.931 6.574 6.732 6.732 1.222.038 1.618.048 5.242.048 3.624 0 4.021-.01 5.242-.048 3.8-.158 6.574-2.931 6.732-6.732.038-1.221.048-1.618.048-5.242 0-3.624-.01-4.021-.048-5.242C23.832 2.979 21.062.206 17.259.048 16.037.01 15.641 0 12.017 0zM12.017 2.17c3.556 0 3.97.01 5.37.048 2.948.134 4.282 1.481 4.415 4.415.038 1.399.048 1.813.048 5.37 0 3.556-.01 3.97-.048 5.37-.134 2.948-1.481 4.282-4.415 4.415-1.399.038-1.813.048-5.37.048-3.556 0-3.97-.01-5.37-.048-2.948-.134-4.282-1.481-4.415-4.415-.038-1.399-.048-1.813-.048-5.37 0-3.556.01-3.97.048-5.37.134-2.948 1.481-4.282 4.415-4.415 1.399-.038 1.813-.048 5.37-.048zm0 3.692c-3.13 0-5.657 2.527-5.657 5.657 0 3.13 2.527 5.657 5.657 5.657 3.13 0 5.657-2.527 5.657-5.657 0-3.13-2.527-5.657-5.657-5.657zm0 9.315c-2.021 0-3.658-1.637-3.658-3.658 0-2.021 1.637-3.658 3.658-3.658 2.021 0 3.658 1.637 3.658 3.658 0 2.021-1.637 3.658-3.658 3.658zm7.188-9.539c0 .731-.593 1.324-1.324 1.324-.731 0-1.324-.593-1.324-1.324 0-.731.593-1.324 1.324-1.324.731 0 1.324.593 1.324 1.324z"/>
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
