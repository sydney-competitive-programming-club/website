import Header from './components/Header';
import Footer from './components/Footer';
import Accordion from './components/Accordion';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import './Gym.css';

const slugify = (name: string) => name
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
      { label: '706B · Interesting drink', href: 'https://codeforces.com/problemset/problem/706/B' },
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

  return (
    <div className="app gym-page">
      <Header />

      <main>
        <div className="gym-shell">
          <section className="gym-hero" data-aos="fade-up">
            <div className="gym-hero-text">
              <h1>Practice Gym</h1>
              <p>
                A relaxed hub of curated practice sets. Expand a block, grab a couple of problems, and sync up with the crew when you want company.
              </p>
            </div>
          </section>

          <section className="gym-doc" data-aos="fade-up">
            <article className="gym-section">
              <h2>LeetCode Circuit</h2>
              <p>
                We break LeetCode practice into themed blocks. Pick whichever feels right for your current focus and expand it when you&apos;re ready.
              </p>
              {leetCodeSets.map((set, index) => (
                <Accordion key={set.title} title={set.title} defaultOpen={index === 0}>
                  <p>{set.description}</p>
                  <ul>
                    {set.problems.map((problem) => (
                      <li key={problem.label}>
                        <a href={problem.href} target="_blank" rel="noopener noreferrer" className="gym-link">
                          {problem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              ))}
            </article>

            <article className="gym-section" data-aos="fade-up">
              <h2>Codeforces Ladders</h2>
              <p>
                Pair these ladders with live contests. Expand a ladder to get a short list of problems for the week.
              </p>
              {codeforcesSets.map((set, index) => (
                <Accordion key={set.title} title={set.title} defaultOpen={index === 0}>
                  <p>{set.description}</p>
                  <ul>
                    {set.problems.map((problem) => (
                      <li key={problem.label}>
                        <a href={problem.href} target="_blank" rel="noopener noreferrer" className="gym-link">
                          {problem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              ))}
            </article>

          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Gym;
