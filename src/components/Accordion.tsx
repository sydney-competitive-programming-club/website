import { ReactNode, useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white transition hover:bg-white/10"
      >
        <span>{title}</span>
        <LuChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="space-y-3 border-t border-white/10 px-5 py-4 text-sm text-white/70">{children}</div>}
    </div>
  );
}

export default Accordion;
