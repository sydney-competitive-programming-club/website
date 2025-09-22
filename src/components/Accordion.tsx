import { ReactNode, useState } from 'react';
import './Accordion.css';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`accordion ${isOpen ? 'open' : 'closed'}`}>
      <button className="accordion-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span className={`chevron ${isOpen ? 'chevron-open' : ''}`}>▾</span>
      </button>
      {isOpen && <div className="accordion-body">{children}</div>}
    </div>
  );
}

export default Accordion;
