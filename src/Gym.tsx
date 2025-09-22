import { useEffect, useState } from 'react';
import { LuCheck, LuSparkles } from 'react-icons/lu';
import practiceSetsRaw from './data/practiceSets.json';
import Header from './components/Header';
import Footer from './components/Footer';
import Accordion from './components/Accordion';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useScrollAnimations } from './hooks/useScrollAnimations';

interface PracticeProblem {
  label: string;
  href: string;
}

interface PracticeSet {
  title: string;
  description: string;
  problems: PracticeProblem[];
}

interface PracticeSetsFile {
  leetcodeSets: PracticeSet[];
  codeforcesSets: PracticeSet[];
}

const { leetcodeSets, codeforcesSets } = practiceSetsRaw as PracticeSetsFile;

type PracticePlatform = 'LeetCode' | 'Codeforces';

interface LuckyProblem extends PracticeProblem {
  setTitle: string;
  platform: PracticePlatform;
  storageKey: string;
}

const STORAGE_KEY = 'scpc-gym-progress';

const getProblemKey = (platform: PracticePlatform, setTitle: string, label: string) =>
  `${platform}::${setTitle}::${label}`;

const practiceProblemPool: LuckyProblem[] = [
  ...leetcodeSets.flatMap((set) =>
    set.problems.map((problem) => ({
      ...problem,
      setTitle: set.title,
      platform: 'LeetCode' as PracticePlatform,
      storageKey: getProblemKey('LeetCode', set.title, problem.label),
    }))
  ),
  ...codeforcesSets.flatMap((set) =>
    set.problems.map((problem) => ({
      ...problem,
      setTitle: set.title,
      platform: 'Codeforces' as PracticePlatform,
      storageKey: getProblemKey('Codeforces', set.title, problem.label),
    }))
  )
];

function Gym() {
  useScrollToTop();
  useScrollAnimations('[data-aos="fade-up"]');
  const [luckyProblem, setLuckyProblem] = useState<LuckyProblem | null>(null);
  const [luckyProblemKey, setLuckyProblemKey] = useState(0);
  const [completedProblems, setCompletedProblems] = useState<Record<string, boolean>>({});
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, boolean>;
        setCompletedProblems(parsed);
      }
    } catch (error) {
      console.warn('Failed to load practice progress from localStorage', error);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated || typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedProblems));
    } catch (error) {
      console.warn('Failed to persist practice progress to localStorage', error);
    }
  }, [completedProblems, hasHydrated]);

  const handleLuckyClick = () => {
    if (practiceProblemPool.length === 0) {
      setLuckyProblem(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * practiceProblemPool.length);
    setLuckyProblem(practiceProblemPool[randomIndex]);
    setLuckyProblemKey((prev) => prev + 1);
  };

  const toggleProblem = (key: string) => {
    if (!hasHydrated) return;
    setCompletedProblems((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      return next;
    });
  };

  const renderProblems = (
    problems: PracticeSet['problems'],
    setTitle: string,
    platform: PracticePlatform
  ) => (
    <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-white/70 md:grid-cols-2 md:gap-3">
      {problems.map((problem) => {
        const problemKey = getProblemKey(platform, setTitle, problem.label);
        const isCompleted = Boolean(completedProblems[problemKey]);

        return (
          <li key={problemKey}>
            <div
              className={`group flex items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 ${
                isCompleted
                  ? 'border-emerald-400/30 bg-emerald-500/10'
                  : 'border-white/0 bg-white/0 hover:border-white/10 hover:bg-white/[0.04]'
              }`}
            >
              <button
                type="button"
                aria-pressed={isCompleted}
                aria-label={`${isCompleted ? 'Mark as incomplete' : 'Mark as complete'} for ${problem.label}`}
                onClick={() => toggleProblem(problemKey)}
                disabled={!hasHydrated}
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300/60 focus:ring-offset-0 ${
                  isCompleted
                    ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 shadow-inner shadow-emerald-400/40'
                    : 'border-white/20 text-white/40 hover:border-white/40 hover:text-white/70'
                }`}
              >
                <LuCheck className="h-4 w-4" />
              </button>

              <a
                href={problem.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-between gap-2"
              >
                <span
                  className={`text-left text-sm font-medium leading-5 transition-colors duration-200 ${
                    isCompleted ? 'text-white/50 line-through' : 'text-white/80 group-hover:text-white'
                  }`}
                >
                  {problem.label}
                </span>
                <span
                  className={`text-xs transition-transform duration-200 ${
                    isCompleted
                      ? 'text-white/40'
                      : 'text-orange-300 group-hover:translate-x-1 group-hover:text-orange-200'
                  }`}
                >
                  →
                </span>
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );

  const luckyProblemCompleted = luckyProblem
    ? Boolean(completedProblems[luckyProblem.storageKey])
    : false;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-14 px-6 text-white/80">
          <section className="mx-auto max-w-3xl space-y-5 text-center">
            <div className="relative mx-auto inline-flex flex-col items-center gap-4">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[-30%] -top-16 h-24 rounded-full bg-gradient-to-r from-orange-500/20 via-pink-400/10 to-indigo-500/20 blur-3xl"
              />
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                Practice
              </span>
              <h1 className="text-4xl font-semibold text-white md:text-5xl">
                <span className="font-gym-title bg-gradient-to-br from-orange-200 via-pink-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_12px_45px_rgba(244,114,182,0.35)]">
                  Practice Gym
                </span>
              </h1>
            </div>
            <p className="text-sm leading-7 text-white/70">
              Curated ladders that keep everyone on the same page. Expand a block, pick what you want to tackle, and log wins together in Discord.
            </p>
          </section>

          <section className="space-y-12">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
              <button
                type="button"
                onClick={handleLuckyClick}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:bg-white/12 hover:text-white"
              >
                <LuSparkles className="h-4 w-4 text-orange-300" />
                Give me some luck
              </button>

              {luckyProblem && (
                <div
                  key={luckyProblemKey}
                  data-aos="fade-up"
                  className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-left shadow-lg shadow-black/10 animate-lucky-pop"
                >
                  <span className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-orange-500/15 blur-3xl" aria-hidden="true" />
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                    <span>{luckyProblem.platform}</span>
                    <span className="text-white/30">•</span>
                    <span>{luckyProblem.setTitle}</span>
                  </div>
                  <h3
                    className={`mt-3 text-lg font-semibold ${
                      luckyProblemCompleted ? 'text-white/50 line-through' : 'text-white'
                    }`}
                  >
                    {luckyProblem.label}
                  </h3>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleProblem(luckyProblem.storageKey)}
                      disabled={!hasHydrated}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-orange-300/60 focus:ring-offset-0 ${
                        luckyProblemCompleted
                          ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-200 hover:border-emerald-400 hover:bg-emerald-500/25'
                          : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <LuCheck className="h-4 w-4" />
                      {luckyProblemCompleted ? 'Marked done' : 'Mark as done'}
                    </button>
                    <a
                      href={luckyProblem.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-orange-300 transition hover:text-orange-200"
                    >
                      Open problem
                      <span className="text-base">→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <article className="space-y-5">
              <header className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">LeetCode Circuit</h2>
                <p className="text-sm leading-7 text-white/70">
                  We stack LeetCode practice into themed blocks. Expand one to pick what you want to focus on this week.
                </p>
              </header>
              <div className="space-y-3">
                {leetcodeSets.map((set, index) => {
                  const setCompleted =
                    hasHydrated &&
                    set.problems.every((problem) =>
                      completedProblems[getProblemKey('LeetCode', set.title, problem.label)]
                    );

                  return (
                    <div key={set.title} data-aos="fade-up" data-aos-delay={`${index * 80}`}>
                      <Accordion title={set.title} defaultOpen={index === 0} isComplete={setCompleted}>
                        <p className="text-sm leading-6 text-white/70">{set.description}</p>
                        {renderProblems(set.problems, set.title, 'LeetCode')}
                      </Accordion>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="space-y-5">
              <header className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">Codeforces Ladders</h2>
                <p className="text-sm leading-7 text-white/70">
                  Pair these ladders with live contests. Expand a tier and aim to finish a handful before the next meet-up.
                </p>
              </header>
              <div className="space-y-3">
                {codeforcesSets.map((set, index) => {
                  const setCompleted =
                    hasHydrated &&
                    set.problems.every((problem) =>
                      completedProblems[getProblemKey('Codeforces', set.title, problem.label)]
                    );

                  return (
                    <div key={set.title} data-aos="fade-up" data-aos-delay={`${index * 80}`}>
                      <Accordion title={set.title} defaultOpen={index === 0} isComplete={setCompleted}>
                        <p className="text-sm leading-6 text-white/70">{set.description}</p>
                        {renderProblems(set.problems, set.title, 'Codeforces')}
                      </Accordion>
                    </div>
                  );
                })}
              </div>
            </article>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Gym;
