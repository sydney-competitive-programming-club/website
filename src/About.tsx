import { ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import './About.css';

interface DocSection {
  heading: string;
  blocks: ReactNode[];
}

function About() {
  useScrollToTop();
  useScrollAnimations('[data-aos="fade-up"]');

  const sections: DocSection[] = [
    {
      heading: 'What do we work on?',
      blocks: [
        'Each training block mixes Codeforces ladders, LeetCode sets, AtCoder tasks, and in-house write-ups. We rotate themes (data structures, graph theory, DP, geometry) so there is always a clear focus.',
        'Sessions alternate between guided walkthroughs, paired problem solving, and contest simulations. If you enjoy learning by doing, you will feel at home here.'
      ]
    },
    {
      heading: 'How we stay organised',
      blocks: [
        <>Announcements live on <a href="https://www.instagram.com/scpc_usyd/" target="_blank" rel="noopener noreferrer" className="about-link">Instagram</a> — follow us to know when the next session kicks off.</>,
        <>If you prefer chat, the <a href="https://discord.gg/uhZbmVcpS7" target="_blank" rel="noopener noreferrer" className="about-link">Discord</a> announcements channel mirrors the schedule, and we keep dedicated threads for accountability, editorials, and office-hours style help.</>
      ]
    },
    {
      heading: 'Why ICPC and SPAR?',
      blocks: [
        <>The <strong>ICPC</strong> circuit is the gold standard for collegiate problem solving. Learn more about our region: <a href="https://sppcontests.org/south-pacific-icpc/" target="_blank" rel="noopener noreferrer" className="about-link">ICPC South Pacific</a>.</>,
        <>We qualify through <strong>SPAR</strong>. See expectations and past problems at <a href="https://sppcontests.org/about/" target="_blank" rel="noopener noreferrer" className="about-link">sppcontests.org</a>. We structure our Gym sets to mirror their pacing so everyone feels ready by contest day.</>,
        'New to competitive programming? We pair newcomers with a pod so you can ramp up without pressure.'
      ]
    }
  ];

  return (
    <div className="app about-page">
      <Header />

      <main>
        <div className="about-shell">
          <section className="about-hero" data-aos="fade-up">
            <img src="/about.png" alt="About SCPC" className="about-hero-image" />
            <div className="about-hero-text">
              <p className="about-lead">
                We&apos;re a student-led crew at the University of Sydney who think algorithms are more fun with friends. Founded in 2024, the club grew out of late-night library sessions where we realised competitive programming is easier—and a lot more enjoyable—when you have a squad solving alongside you.
              </p>
              <p>
                We aim to keep things welcoming for every skill level: whether you&apos;re chasing your first AC or preparing for ICPC World Finals, you&apos;ll find peers, guidance, and plenty of chances to practice together.
              </p>
            </div>
          </section>

          <section className="about-doc" data-aos="fade-up">
            {sections.map(({ heading, blocks }) => (
              <article key={heading} className="doc-section">
                <h2>{heading}</h2>
                {blocks.map((content, index) => (
                  <p key={index}>{content}</p>
                ))}
              </article>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default About;
