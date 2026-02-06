import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type TechIcon = {
  name: string;
  color: string;
  position: string;
};

type Star = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        '.headline-line',
        { y: 100, opacity: 0, rotateX: -45 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.15 }
      )
        .fromTo(
          '.hero-subtext',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          '.hero-buttons button, .hero-buttons a',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          '-=0.4'
        )
        .fromTo(
          '.hero-social a',
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'back.out(2)',
          },
          '-=0.3'
        )
        .fromTo(
          '.hero-stats > div',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          '-=0.2'
        )
        .fromTo(
          imageRef.current,
          { x: 100, opacity: 0, rotateY: -30 },
          { x: 0, opacity: 1, rotateY: -8, duration: 1.2 },
          '-=1'
        );

      gsap.to(imageRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.orbit-icon', {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.star', {
        opacity: 0.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.2,
          from: 'random',
        },
      });

      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(imageRef.current, {
        y: -50,
        rotateY: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(starsRef.current, {
        y: -200,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector<HTMLElement>('#projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const techIcons: TechIcon[] = [
    { name: 'React', color: '#61DAFB', position: '0deg' },
    { name: 'TS', color: '#3178C6', position: '90deg' },
    { name: 'Node', color: '#339933', position: '180deg' },
    { name: 'Next', color: '#000000', position: '270deg' },
  ];

  const stars: Star[] = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Animated Stars Background */}
      <div ref={starsRef} className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-2" style={{ perspective: '1000px' }}>
              <div className="headline-line overflow-hidden">
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
                  Frontend
                </span>
              </div>
              <div className="headline-line overflow-hidden">
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
                  Software
                </span>
              </div>
              <div className="headline-line overflow-hidden">
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                  Engineer
                </span>
              </div>
              <div className="headline-line overflow-hidden pt-2">
                <span className="block text-2xl sm:text-3xl font-medium text-gray-400">
                  & UI Designer
                </span>
              </div>
            </div>

            <p className="hero-subtext text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed">
              Crafting exceptional digital experiences with{' '}
              <span className="text-blue-400 font-semibold">3+ years</span> of expertise in React,
              TypeScript, and modern web technologies. I transform complex problems into elegant,
              performant solutions.
            </p>

            <div className="hero-buttons flex flex-wrap gap-4">
              <button
                onClick={scrollToProjects}
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                View My Work
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
              <a
                href="mailto:singhrammohan321@gmail.com"
                className="group px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </a>
            </div>

            <div className="hero-social flex items-center gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/rammohansingh-web-developer"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-blue-500 hover:border-blue-500 hover:scale-110 transition-all duration-300 text-white"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Rishu007-boop"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-purple-500 hover:border-purple-500 hover:scale-110 transition-all duration-300 text-white"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:singhrammohan321@gmail.com"
                className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-pink-500 hover:border-pink-500 hover:scale-110 transition-all duration-300 text-white"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <div className="hero-stats flex flex-wrap gap-8 pt-6">
              <div className="text-center group cursor-default">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">3+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">20+</div>
                <div className="text-sm text-gray-500">Projects Delivered</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">95%</div>
                <div className="text-sm text-gray-500">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Profile Card with Orbit */}
          <div
            className="relative flex justify-center lg:justify-end"
            style={{ perspective: '1200px' }}
          >
            {/* Orbit Ring */}
            <div
              ref={orbitRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{ width: '500px', height: '500px', margin: 'auto' }}
            >
              {/* Orbit Path */}
              <div className="absolute inset-0 border border-white/10 rounded-full" />
              <div className="absolute inset-4 border border-white/5 rounded-full" />
              
              {techIcons.map((tech) => (
                <div
                  key={tech.name}
                  className="orbit-icon absolute w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center font-bold text-sm shadow-lg shadow-black/50"
                  style={{
                    transform: `rotate(${tech.position}) translateX(220px) rotate(-${tech.position})`,
                    color: tech.color,
                  }}
                >
                  {tech.name}
                </div>
              ))}
            </div>

            {/* Profile Card */}
            <div
              ref={imageRef}
              className="relative w-80 h-[420px] sm:w-96 sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20"
              style={{
                transform: 'rotateY(-8deg) rotateX(5deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              <img
                src="/profile-photo.png"
                alt="Ram Mohan Singh"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Status Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Available for Work</div>
                    <div className="text-sm text-gray-400">Open to new opportunities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-sm text-gray-500">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;