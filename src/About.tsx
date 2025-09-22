import { ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useScrollAnimations } from './hooks/useScrollAnimations';

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
        <>Announcements live on <a href="https://www.instagram.com/scpc_usyd/" target="_blank" rel="noopener noreferrer" className="text-orange-300 transition hover:text-orange-200">Instagram</a> — follow us to know when the next session kicks off.</>,
        <>Prefer chat? The <a href="https://discord.gg/uhZbmVcpS7" target="_blank" rel="noopener noreferrer" className="text-orange-300 transition hover:text-orange-200">Discord</a> announcements channel mirrors the schedule, and we keep dedicated threads for accountability, editorials, and help.</>
      ]
    },
    {
      heading: 'Why ICPC and SPAR?',
      blocks: [
        <>The <strong>ICPC</strong> circuit is the gold standard for collegiate problem solving. Learn more about our region: <a href="https://sppcontests.org/south-pacific-icpc/" target="_blank" rel="noopener noreferrer" className="text-orange-300 transition hover:text-orange-200">ICPC South Pacific</a>.</>,
        <>We qualify through <strong>SPAR</strong>. See expectations and past problems at <a href="https://sppcontests.org/about/" target="_blank" rel="noopener noreferrer" className="text-orange-300 transition hover:text-orange-200">sppcontests.org</a>. We structure our Gym sets to mirror their pacing so everyone feels ready by contest day.</>,
        'New to competitive programming? We pair newcomers with a pod so you can ramp up without pressure.'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 text-white/80">
          <section className="grid items-start gap-10 md:grid-cols-[minmax(220px,260px)_minmax(0,1fr)]">
            <img src="/about.png" alt="About SCPC" className="w-full max-w-xs justify-self-center drop-shadow-[0_12px_35px_rgba(15,23,42,0.45)]" />
            <div className="space-y-5 text-sm leading-7 text-white/70">
              <h1 className="text-3xl font-semibold text-white">Sydney Competitive Programming Club</h1>
              <p>
                We&apos;re a student-led crew at the University of Sydney who think algorithms are more fun with friends. Founded in 2024, we grew out of late-night library sessions where we realised competitive programming is easier—and a lot more enjoyable—when you have a squad solving alongside you.
              </p>
              <p>
                We aim to keep things welcoming for every skill level: whether you&apos;re chasing your first AC or preparing for ICPC World Finals, you&apos;ll find peers, guidance, and plenty of chances to practice together.
              </p>
            </div>
          </section>

          <section className="space-y-10">
            {sections.map(({ heading, blocks }, idx) => (
              <article key={heading} className="relative overflow-hidden pl-6">
                <span className="absolute left-0 top-2 h-[calc(100%-1rem)] w-0.5 bg-gradient-to-b from-orange-400 via-orange-300/60 to-transparent" />
                <h2 className="text-xl font-semibold text-white">{heading}</h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-white/70">
                  {blocks.map((content, index) => (
                    <p key={index}>{content}</p>
                  ))}
                </div>
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
