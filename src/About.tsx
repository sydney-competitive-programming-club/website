import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import './About.css';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  year: string;
  bio: string;
  achievements: string[];
  imageUrl?: string;
}

function About() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);
  
  useScrollToTop();
  useScrollAnimations('.about-section[data-aos="fade-up"]');

  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchTeamMembers = async () => {
    //   try {
    //     const response = await fetch('/api/team-members');
    //     const data = await response.json();
    //     setTeamMembers(data); // This will be used when API is implemented
    //   } catch (error) {
    //     console.error('Failed to fetch team members:', error);
    //   } finally {
    //     setIsLoadingTeam(false);
    //   }
    // };
    // fetchTeamMembers();
    
    // Simulate API call for now
    setTimeout(() => {
      setIsLoadingTeam(false);
    }, 1000);
  }, [setTeamMembers]); // Include setTeamMembers in dependency array to acknowledge its future use

  // Sample team member for styling preview (will be hidden when real data is available)
  const sampleMember: TeamMember = {
    id: "sample-1",
    name: "Sample Member",
    role: "Sample Role",
    year: "Sample Year",
    bio: "This is a sample team member card to show the styling. This will be removed once backend data is successfully fetched.",
    achievements: ["Sample Achievement 1", "Sample Achievement 2", "Sample Achievement 3"]
  };

  return (
    <div className="app">
      <Header />

      <main>
        <div className="about-content">
          <div className="about-container">
            
            <div className="story-content">
              <img src="/about.png" alt="About SCPC" className="about-logo" />
              <p>
                Founded in 2024 by a group of passionate University of Sydney students, SCPC emerged from a simple idea: 
                competitive programming is more fun and effective when done together. What started as informal study sessions 
                in the library has grown into a vibrant community of problem-solvers, algorithm enthusiasts, and future tech leaders.
              </p>
              <p>
                We are committed to promoting competitive programming across the university and beyond. Our mission is to create 
                a welcoming environment where students of all skill levels can learn, practice, and compete together. We hope 
                you'll join us on this exciting journey as we build something amazing together.
              </p>
            </div>


            <div className="about-section" data-aos="fade-up">
              <div className="team-panel">
                <h2 className="section-title">Meet the Team</h2>
                <p className="team-intro">
                  Our executive team is composed of dedicated students who are passionate about competitive programming 
                  and committed to fostering an inclusive, supportive community.
                </p>
                
                {isLoadingTeam && (
                  <div className="team-loading">
                    <p>Loading team members...</p>
                  </div>
                )}
                
                <div className="team-matrix">
                  {teamMembers.length > 0 ? (
                    teamMembers.map((member) => (
                      <div key={member.id} className="team-member">
                        <div className="member-avatar">
                          {member.imageUrl ? (
                            <img src={member.imageUrl} alt={member.name} />
                          ) : (
                            member.name.split(' ').map(n => n[0]).join('')
                          )}
                        </div>
                        <span className="member-name">{member.name}</span>
                      </div>
                    ))
                  ) : (
                    !isLoadingTeam && (
                      <div className="team-member sample-member">
                        <div className="member-avatar">
                          {sampleMember.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="member-name">{sampleMember.name}</span>
                      </div>
                    )
                  )}
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

export default About;