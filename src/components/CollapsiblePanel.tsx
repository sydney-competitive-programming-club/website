import React, { useState } from 'react';
import './CollapsiblePanel.css';

interface CollapsiblePanelProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  onToggle?: (isOpen: boolean) => void;
}

const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({
  title,
  children,
  defaultOpen = true,
  className = '',
  onToggle
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className={`collapsible-panel ${className} ${isOpen ? 'expanded' : 'collapsed'}`}>
      <div 
        className="panel-header"
        onClick={handleToggle}
      >
        <h3 className="panel-title">{title}</h3>
        <button className="panel-toggle">
          <svg 
            width="20" 
            height="20" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            className={`chevron ${isOpen ? 'open' : ''}`}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </button>
      </div>
      
      <div className={`panel-content ${isOpen ? 'open' : 'closed'}`}>
        <div className="panel-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsiblePanel;