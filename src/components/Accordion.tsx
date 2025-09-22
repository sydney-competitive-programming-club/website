import { ReactNode, useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  isComplete?: boolean;
}

function Accordion({ title, children, defaultOpen = false, isComplete = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const borderClass = isComplete ? 'border-emerald-400/40 bg-emerald-500/10' : 'border-white/10 bg-white/[0.04]';
  const titleClass = isComplete ? 'text-emerald-200 line-through' : 'text-white';
  const caretClass = `h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${
    isComplete ? 'text-emerald-200' : 'text-white'
  }`;

  return (
    <div className={`overflow-hidden rounded-2xl border ${borderClass} backdrop-blur transition-colors duration-200`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold transition ${
          isComplete ? 'text-emerald-100/80 hover:bg-emerald-500/15' : 'text-white hover:bg-white/10'
        }`}
      >
        <span className={`flex-1 ${titleClass}`}>{title}</span>
        <div className="flex items-center gap-2">
          {isComplete && (
            <span className="rounded-full border border-emerald-400/50 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.27em] text-emerald-200/90">
              Complete
            </span>
          )}
          <LuChevronDown className={caretClass} />
        </div>
      </button>
      {isOpen && (
        <div
          className={`space-y-3 border-t px-5 py-4 text-sm text-white/70 transition-colors duration-200 ${
            isComplete ? 'border-emerald-400/20' : 'border-white/10'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default Accordion;
