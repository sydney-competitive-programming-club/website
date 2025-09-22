import Header from './components/Header';
import Footer from './components/Footer';
import Accordion from './components/Accordion';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useScrollAnimations } from './hooks/useScrollAnimations';

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

interface PracticeSet {
  title: string;
  description: string;
  problems: Array<{ label: string; href: string }>;
}

const leetCodeSets: PracticeSet[] = [
  {
    title: 'Foundations',
    description: 'Warm up with data-structure staples and quick wins to build confidence.',
    problems: [
      { label: '#1 · Two Sum', href: `https://leetcode.com/problems/${slugify('Two Sum')}/` },
      { label: '#20 · Valid Parentheses', href: `https://leetcode.com/problems/${slugify('Valid Parentheses')}/` },
      { label: '#704 · Binary Search', href: `https://leetcode.com/problems/${slugify('Binary Search')}/` },
      { label: '#206 · Reverse Linked List', href: `https://leetcode.com/problems/${slugify('Reverse Linked List')}/` },
      { label: '#121 · Best Time to Buy and Sell Stock', href: `https://leetcode.com/problems/${slugify('Best Time to Buy and Sell Stock')}/` },
      { label: '#53 · Maximum Subarray', href: `https://leetcode.com/problems/${slugify('Maximum Subarray')}/` },
      { label: '#141 · Linked List Cycle', href: `https://leetcode.com/problems/${slugify('Linked List Cycle')}/` }
    ]
  },
  {
    title: 'Core Patterns',
    description: 'Introduce sliding window, counting, and recursion patterns that appear everywhere.',
    problems: [
      { label: '#3 · Longest Substring Without Repeating Characters', href: `https://leetcode.com/problems/${slugify('Longest Substring Without Repeating Characters')}/` },
      { label: '#347 · Top K Frequent Elements', href: `https://leetcode.com/problems/${slugify('Top K Frequent Elements')}/` },
      { label: '#39 · Combination Sum', href: `https://leetcode.com/problems/${slugify('Combination Sum')}/` },
      { label: '#46 · Permutations', href: `https://leetcode.com/problems/${slugify('Permutations')}/` },
      { label: '#79 · Word Search', href: `https://leetcode.com/problems/${slugify('Word Search')}/` },
      { label: '#438 · Find All Anagrams in a String', href: `https://leetcode.com/problems/${slugify('Find All Anagrams in a String')}/` },
      { label: '#560 · Subarray Sum Equals K', href: `https://leetcode.com/problems/${slugify('Subarray Sum Equals K')}/` }
    ]
  },
  {
    title: 'Contest Readiness',
    description: 'Longer implementations and trickier case analysis to mimic ICPC/CF-style thinking.',
    problems: [
      { label: '#295 · Find Median from Data Stream', href: `https://leetcode.com/problems/${slugify('Find Median from Data Stream')}/` },
      { label: '#301 · Remove Invalid Parentheses', href: `https://leetcode.com/problems/${slugify('Remove Invalid Parentheses')}/` },
      { label: '#212 · Word Search II', href: `https://leetcode.com/problems/${slugify('Word Search II')}/` },
      { label: '#76 · Minimum Window Substring', href: `https://leetcode.com/problems/${slugify('Minimum Window Substring')}/` },
      { label: '#51 · N-Queens', href: `https://leetcode.com/problems/${slugify('N-Queens')}/` },
      { label: '#224 · Basic Calculator', href: `https://leetcode.com/problems/${slugify('Basic Calculator')}/` },
      { label: '#84 · Largest Rectangle in Histogram', href: `https://leetcode.com/problems/${slugify('Largest Rectangle in Histogram')}/` }
    ]
  },
  {
    title: 'Graphs & Trees',
    description: 'Traverse, search, and reason about connectivity and hierarchy.',
    problems: [
      { label: '#200 · Number of Islands', href: `https://leetcode.com/problems/${slugify('Number of Islands')}/` },
      { label: '#133 · Clone Graph', href: `https://leetcode.com/problems/${slugify('Clone Graph')}/` },
      { label: '#543 · Diameter of Binary Tree', href: `https://leetcode.com/problems/${slugify('Diameter of Binary Tree')}/` },
      { label: '#437 · Path Sum III', href: `https://leetcode.com/problems/${slugify('Path Sum III')}/` },
      { label: '#329 · Longest Increasing Path in a Matrix', href: `https://leetcode.com/problems/${slugify('Longest Increasing Path in a Matrix')}/` },
      { label: '#310 · Minimum Height Trees', href: `https://leetcode.com/problems/${slugify('Minimum Height Trees')}/` }
    ]
  }
];

const codeforcesSets: PracticeSet[] = [
  {
    title: 'Warm-Up',
    description: 'Fast IO, implementation basics, and the habit of reading carefully.',
    problems: [
      { label: '4A · Watermelon', href: 'https://codeforces.com/problemset/problem/4/A' },
      { label: '71A · Way Too Long Words', href: 'https://codeforces.com/problemset/problem/71/A' },
      { label: '231A · Team', href: 'https://codeforces.com/problemset/problem/231/A' },
      { label: '282A · Bit++', href: 'https://codeforces.com/problemset/problem/282/A' },
      { label: '339A · Helpful Maths', href: 'https://codeforces.com/problemset/problem/339/A' },
      { label: '112A · Petya and Strings', href: 'https://codeforces.com/problemset/problem/112/A' },
      { label: '133A · HQ9+', href: 'https://codeforces.com/problemset/problem/133/A' }
    ]
  },
  {
    title: 'Build Speed',
    description: 'Observation heavy questions—aim to solve 3/5 within 30 minutes each.',
    problems: [
      { label: '318A · Even Odds', href: 'https://codeforces.com/problemset/problem/318/A' },
      { label: '479A · Expression', href: 'https://codeforces.com/problemset/problem/479/A' },
      { label: '546A · Soldier and Bananas', href: 'https://codeforces.com/problemset/problem/546/A' },
      { label: '520A · Pangram', href: 'https://codeforces.com/problemset/problem/520/A' },
      { label: '266A · Stones on the Table', href: 'https://codeforces.com/problemset/problem/266/A' },
      { label: '492B · Vanya and Lanterns', href: 'https://codeforces.com/problemset/problem/492/B' },
      { label: '1328A · Divisibility Problem', href: 'https://codeforces.com/problemset/problem/1328/A' }
    ]
  },
  {
    title: 'Contest Sim',
    description: 'Treat these as timed sets—sit down with a 90-minute clock and compare notes afterwards.',
    problems: [
      { label: '479C · Exams', href: 'https://codeforces.com/problemset/problem/479/C' },
      { label: '520B · Two Buttons', href: 'https://codeforces.com/problemset/problem/520/B' },
      { label: '455A · Boredom', href: 'https://codeforces.com/problemset/problem/455/A' },
      { label: '580C · Kefa and Park', href: 'https://codeforces.com/problemset/problem/580/C' },
      { label: '518D · Ilya and Escalator', href: 'https://codeforces.com/problemset/problem/518/D' },
      { label: '1692F · 3SUM', href: 'https://codeforces.com/problemset/problem/1692/F' },
      { label: '1605C · Dominant Character', href: 'https://codeforces.com/problemset/problem/1605/C' }
    ]
  },
  {
    title: 'Binary Search Pack',
    description: 'Classic array + binary search puzzles for quick contest reps.',
    problems: [
      { label: '706B · Interesting Drink', href: 'https://codeforces.com/problemset/problem/706/B' },
      { label: '279B · Books', href: 'https://codeforces.com/problemset/problem/279/B' },
      { label: '1485A · Add and Divide', href: 'https://codeforces.com/problemset/problem/1485/A' },
      { label: '812C · Sagheer and Nubian Market', href: 'https://codeforces.com/problemset/problem/812/C' },
      { label: '189A · Cut Ribbon', href: 'https://codeforces.com/problemset/problem/189/A' },
      { label: '702A · Maximum Increase', href: 'https://codeforces.com/problemset/problem/702/A' }
    ]
  }
];

function Gym() {
  useScrollToTop();
  useScrollAnimations('[data-aos="fade-up"]');

  const renderProblems = (problems: PracticeSet['problems']) => (
    <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-white/70 md:grid-cols-2 md:gap-3">
      {problems.map((problem) => (
        <li key={problem.label}>
          <a
            href={problem.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-between gap-3 rounded-lg border border-white/0 bg-white/0 px-3 py-2 font-medium text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
          >
            <span className="text-left leading-5">{problem.label}</span>
            <span className="text-xs text-orange-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-orange-200">→</span>
          </a>
        </li>
      ))}
    </ul>
  );

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
                <span className="bg-gradient-to-br from-orange-200 via-pink-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_12px_45px_rgba(244,114,182,0.35)]">
                  Practice Gym
                </span>
              </h1>
            </div>
            <p className="text-sm leading-7 text-white/70">
              Curated ladders that keep everyone on the same page. Expand a block, pick what you want to tackle, and log wins together in Discord.
            </p>
          </section>

          <section className="space-y-12">
            <article className="space-y-5">
              <header className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">LeetCode Circuit</h2>
                <p className="text-sm leading-7 text-white/70">
                  We stack LeetCode practice into themed blocks. Expand one to pick what you want to focus on this week.
                </p>
              </header>
              <div className="space-y-3">
                {leetCodeSets.map((set, index) => (
                  <div key={set.title} data-aos="fade-up" data-aos-delay={`${index * 80}`}>
                    <Accordion title={set.title} defaultOpen={index === 0}>
                      <p className="text-sm leading-6 text-white/70">{set.description}</p>
                      {renderProblems(set.problems)}
                    </Accordion>
                  </div>
                ))}
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
                {codeforcesSets.map((set, index) => (
                  <div key={set.title} data-aos="fade-up" data-aos-delay={`${index * 80}`}>
                    <Accordion title={set.title} defaultOpen={index === 0}>
                      <p className="text-sm leading-6 text-white/70">{set.description}</p>
                      {renderProblems(set.problems)}
                    </Accordion>
                  </div>
                ))}
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
