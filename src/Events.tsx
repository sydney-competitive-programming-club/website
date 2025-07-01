import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { Link } from 'react-router-dom';
import './Events.css';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'contest' | 'workshop' | 'social' | 'meeting';
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  registrationRequired: boolean;
  maxParticipants?: number;
  currentParticipants?: number;
}

function Events() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showPastEvents, setShowPastEvents] = useState(false);
  
  useScrollToTop();
  useScrollAnimations('.event-card[data-aos="fade-up"]');

  // Placeholder event data - will be replaced with backend fetch later
  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Weekly Coding Session #8',
      date: '2025-07-05',
      time: '14:00',
      location: 'Engineering Building Room 301',
      type: 'workshop',
      description: 'This week we\'re focusing on dynamic programming techniques. We\'ll solve classic problems like coin change, longest common subsequence, and knapsack variants. Perfect for beginners and advanced members alike!',
      status: 'upcoming',
      registrationRequired: false
    },
    {
      id: '2',
      title: 'SCPC Internal Contest #3',
      date: '2025-07-12',
      time: '13:00',
      location: 'Online (Discord + Codeforces)',
      type: 'contest',
      description: 'Monthly competitive programming contest with problems ranging from beginner to advanced levels. Prizes for top 3 performers and special recognition for most improved member!',
      status: 'upcoming',
      registrationRequired: true,
      maxParticipants: 50,
      currentParticipants: 23
    },
    {
      id: '3',
      title: 'ICPC Team Formation Workshop',
      date: '2025-07-19',
      time: '15:30',
      location: 'Computer Science Building Seminar Room',
      type: 'workshop',
      description: 'Learn about ICPC team strategies, roles, and how to form effective teams for the upcoming regional competition. Includes team-building exercises and practice problems.',
      status: 'upcoming',
      registrationRequired: true,
      maxParticipants: 30,
      currentParticipants: 18
    },
    {
      id: '4',
      title: 'Social Coding Night',
      date: '2025-07-26',
      time: '18:00',
      location: 'Manning Bar + Online',
      type: 'social',
      description: 'Casual evening of coding, pizza, and getting to know fellow members. We\'ll have fun programming challenges, coding games, and plenty of time to socialize!',
      status: 'upcoming',
      registrationRequired: false
    },
    {
      id: '5',
      title: 'Algorithm Study Group - Graphs',
      date: '2025-08-02',
      time: '16:00',
      location: 'Fisher Library Study Room 12',
      type: 'workshop',
      description: 'Deep dive into graph algorithms including BFS, DFS, shortest paths (Dijkstra, Floyd-Warshall), and minimum spanning trees. Bring your laptop for hands-on practice.',
      status: 'upcoming',
      registrationRequired: false
    },
    {
      id: '6',
      title: 'Mock ICPC Regional Contest',
      date: '2025-08-09',
      time: '09:00',
      location: 'Engineering Building Lab 2',
      type: 'contest',
      description: 'Full-length mock contest simulating the ICPC Regional experience. Teams of 3 will have 5 hours to solve as many problems as possible. Great preparation for the real thing!',
      status: 'upcoming',
      registrationRequired: true,
      maxParticipants: 45,
      currentParticipants: 31
    },
    {
      id: '7',
      title: 'Guest Lecture: Industry Perspective',
      date: '2025-08-16',
      time: '17:00',
      location: 'Lecture Theatre 2',
      type: 'workshop',
      description: 'Special guest speaker from Google Sydney will discuss how competitive programming skills translate to real-world software engineering and technical interviews.',
      status: 'upcoming',
      registrationRequired: true,
      maxParticipants: 100,
      currentParticipants: 67
    }
  ];

  const pastEvents: Event[] = [
    {
      id: '101',
      title: 'Weekly Coding Session #7',
      date: '2025-06-28',
      time: '14:00',
      location: 'Engineering Building Room 301',
      type: 'workshop',
      description: 'Focused on graph algorithms and tree traversal techniques. Great turnout with 25 participants working through classic problems.',
      status: 'completed',
      registrationRequired: false
    },
    {
      id: '102',
      title: 'SCPC Internal Contest #2',
      date: '2025-06-21',
      time: '13:00',
      location: 'Online (Discord + Codeforces)',
      type: 'contest',
      description: 'Successful monthly contest with 35 participants. Congratulations to top performers Alex, Sarah, and Marcus!',
      status: 'completed',
      registrationRequired: true,
      maxParticipants: 50,
      currentParticipants: 35
    },
    {
      id: '103',
      title: 'Algorithm Deep Dive - DP',
      date: '2025-06-14',
      time: '15:30',
      location: 'Computer Science Building Seminar Room',
      type: 'workshop',
      description: 'Comprehensive workshop on dynamic programming. Covered classic problems and optimization techniques.',
      status: 'completed',
      registrationRequired: true,
      maxParticipants: 30,
      currentParticipants: 28
    },
    {
      id: '104',
      title: 'Welcome Social Event',
      date: '2025-06-07',
      time: '18:00',
      location: 'Manning Bar',
      type: 'social',
      description: 'Great start to the semester! Met new members and enjoyed pizza while solving fun coding challenges.',
      status: 'completed',
      registrationRequired: false
    }
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'contest':
        return (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'workshop':
        return (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'social':
        return (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'meeting':
        return (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'contest':
        return '#FF4815';
      case 'workshop':
        return '#FFB800';
      case 'social':
        return '#FF6B35';
      case 'meeting':
        return '#9333EA';
      default:
        return '#6B7280';
    }
  };


  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-AU', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const eventTypes = [
    { id: 'all', label: 'All Events', color: '#6B7280' },
    { id: 'contest', label: 'Contests', color: '#FF4815' },
    { id: 'workshop', label: 'Workshops', color: '#FFB800' },
    { id: 'social', label: 'Social', color: '#FF6B35' },
    { id: 'meeting', label: 'Meetings', color: '#9333EA' }
  ];

  const currentEvents = showPastEvents ? pastEvents : upcomingEvents;
  const filteredEvents = activeFilter === 'all' 
    ? currentEvents 
    : currentEvents.filter(event => event.type === activeFilter);

  return (
    <div className="app">
      <Header />

      <main>
        <div className="events-content">
          <div className="events-container">
            
            <div className="events-header">
              <div className="events-nav">
                <button
                  className={`nav-tab ${!showPastEvents ? 'active' : ''}`}
                  onClick={() => setShowPastEvents(false)}
                >
                  Upcoming Events ({upcomingEvents.length})
                </button>
                <button
                  className={`nav-tab ${showPastEvents ? 'active' : ''}`}
                  onClick={() => setShowPastEvents(true)}
                >
                  Past Events ({pastEvents.length})
                </button>
              </div>
              
              <div className="events-filters">
                <div className="filter-buttons">
                  {eventTypes.map((type) => (
                    <button
                      key={type.id}
                      className={`filter-button ${activeFilter === type.id ? 'active' : ''}`}
                      onClick={() => setActiveFilter(type.id)}
                      style={{
                        borderColor: activeFilter === type.id ? type.color : 'rgba(255, 255, 255, 0.2)',
                        backgroundColor: activeFilter === type.id ? `${type.color}20` : 'transparent',
                        color: activeFilter === type.id ? type.color : '#d1d5db'
                      }}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="events-grid">
              {filteredEvents.map((event, index) => (
                <div key={event.id} className="event-card" data-aos="fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="event-header">
                    <div className="event-icon" style={{ backgroundColor: getEventTypeColor(event.type) }}>
                      {getEventTypeIcon(event.type)}
                    </div>
                    <div className="event-meta">
                      <span 
                        className="event-type"
                        style={{ color: getEventTypeColor(event.type) }}
                      >
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                      <span className="event-status">
                        {event.status === 'upcoming' && '🔜'}
                        {event.status === 'ongoing' && '🔴'}
                        {event.status === 'completed' && '✅'}
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="event-title">{event.title}</h3>
                  
                  <div className="event-details">
                    <div className="event-date">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {new Date(event.date).toLocaleDateString('en-AU', { 
                          month: 'short', 
                          day: 'numeric'
                        })} • {formatTime(event.time)}
                      </span>
                    </div>
                    
                    <div className="event-location">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="event-description">{event.description}</p>
                  
                  {event.registrationRequired ? (
                    <div className="event-registration">
                      {event.maxParticipants && event.currentParticipants && (
                        <div className="participant-count">
                          {event.currentParticipants}/{event.maxParticipants} registered
                        </div>
                      )}
                      <button 
                        className="register-button"
                        style={{ backgroundColor: getEventTypeColor(event.type) }}
                      >
                        Register Now
                      </button>
                    </div>
                  ) : (
                    <div className="event-info">
                      <span className="no-registration">Drop-in event</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="no-events">
                <h3>No {showPastEvents ? 'past' : 'upcoming'} events found</h3>
                <p>No events match the selected filter. Try selecting a different category.</p>
              </div>
            )}

            <div className="events-footer">
              <div className="events-cta">
                <h3>Stay Updated!</h3>
                <p>Join our Discord to get notified about new events and last-minute updates.</p>
                <div className="events-cta-buttons">
                  <a href="https://discord.gg/uhZbmVcpS7" target="_blank" rel="noopener noreferrer" className="cta-button primary">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
                    </svg>
                    <span>Join Discord</span>
                  </a>
                  <Link to="/" className="cta-button secondary">
                    <span>Back to Home</span>
                  </Link>
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

export default Events;