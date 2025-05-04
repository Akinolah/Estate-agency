
// src/components/back-to-top.jsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    // Check if window is defined
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    // Run only on client
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'fixed bottom-4 right-4 z-50 rounded-full shadow-lg transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
