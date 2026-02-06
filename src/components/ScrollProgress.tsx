import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Progress bar animation
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    // Rocket animation that follows scroll
    gsap.to(rocketRef.current, {
      y: window.innerHeight - 100,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === document.body) st.kill();
      });
    };
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-[100]">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Flying Rocket */}
      <div
        ref={rocketRef}
        className="fixed right-8 z-[99] pointer-events-none hidden lg:block"
        style={{ top: '50px' }}
      >
        <div className="relative">
          {/* Rocket Trail */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-blue-500/50 to-transparent" />
          
          {/* Rocket Body */}
          <svg
            width="40"
            height="60"
            viewBox="0 0 40 60"
            fill="none"
            className="animate-pulse"
          >
            {/* Rocket */}
            <path
              d="M20 0C20 0 5 15 5 35C5 45 10 50 15 52L20 60L25 52C30 50 35 45 35 35C35 15 20 0 20 0Z"
              fill="url(#rocketGradient)"
            />
            {/* Window */}
            <circle cx="20" cy="28" r="8" fill="#1a1a1a" />
            <circle cx="20" cy="28" r="5" fill="#3b82f6" />
            {/* Flame */}
            <path
              d="M15 52L20 60L25 52C22 55 18 55 15 52Z"
              fill="#f59e0b"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="rocketGradient" x1="20" y1="0" x2="20" y2="60">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
};

export default ScrollProgress;
