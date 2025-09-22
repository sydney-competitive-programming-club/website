import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaDiscord } from 'react-icons/fa';
import { SiCodeforces } from 'react-icons/si';
import { LuDumbbell } from 'react-icons/lu';
import Header from './components/Header';
import Footer from './components/Footer';
import { useScrollToTop } from './hooks/useScrollToTop';

interface ActionLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
  as?: 'a' | 'link';
}

function App() {
  useScrollToTop();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="relative isolate pt-28 pb-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center">
          <div className="h-72 w-72 translate-y-[-50%] rounded-full bg-orange-400/20 blur-[160px]" />
        </div>

        <section className="mx-auto flex min-h-[calc(100vh-200px)] max-w-6xl flex-col items-center justify-center gap-14 px-6 text-center">
          <div className="space-y-10">
            <img
              src="/logo_full_white_4x.png"
              alt="Sydney Competitive Programming Club"
              className="hero-logo mx-auto w-full max-w-[44rem] drop-shadow-[0_26px_70px_rgba(15,23,42,0.55)]"
            />
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Solve harder problems with people who get it.
              </h1>
              <p className="mx-auto max-w-2xl text-sm leading-7 text-white/70">
                Weekly sessions, curated practice sets, and a supportive crew at the University of Sydney who love cracking problems together.
                Jump in for interview prep, contest reps, or just to get better at building things fast.
              </p>
            </div>
          </div>

          <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ActionLink
              href="https://www.instagram.com/scpc_usyd/"
              label="Follow on Instagram"
              icon={<FaInstagram />}
            />
            <ActionLink
              href="https://discord.gg/uhZbmVcpS7"
              label="Join the Discord"
              icon={<FaDiscord />}
            />
            <ActionLink
              href="/gym"
              label="Explore Practice Gym"
              icon={<LuDumbbell />}
              as="link"
            />
            <ActionLink
              href="https://codeforces.com/"
              label="Compete on Codeforces"
              icon={<SiCodeforces />}
            />
          </div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">
            Weekly Tuesday · J12 SIT Lecture Room 123 · Open to everyone
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ActionLink({ href, label, icon, as = 'a' }: ActionLinkProps) {
  const baseClass =
    'group flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-white/[0.12] hover:shadow-lg hover:shadow-orange-500/10 backdrop-blur';

  if (as === 'link') {
    return (
      <Link to={href} className={baseClass}>
        <span className="text-lg text-orange-300 transition group-hover:text-orange-200">{icon}</span>
        <span className="text-white/80 group-hover:text-white">{label}</span>
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={baseClass}>
      <span className="text-lg text-orange-300 transition group-hover:text-orange-200">{icon}</span>
      <span className="text-white/80 group-hover:text-white">{label}</span>
    </a>
  );
}

export default App;
