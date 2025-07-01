import { useEffect } from 'react';

export const useScrollAnimations = (selector: string = '[data-aos="fade-up"]') => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.8) {
          element.classList.add('aos-animate');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger on mount for elements already in view
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selector]);
};