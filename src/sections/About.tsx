import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Zap, Layers, GitBranch, TestTube, Database, Cloud, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section label animation
      gsap.fromTo(
        '.about-label',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Headline animation
      gsap.fromTo(
        '.about-headline',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Bio paragraphs with stagger
      gsap.fromTo(
        '.bio-paragraph',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      gsap.fromTo(
        '.stat-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image reveal with 3D effect
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0, rotateY: 30 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Tech icons stagger animation
      gsap.fromTo(
        '.tech-icon-card',
        { y: 50, opacity: 0, rotateY: -30 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.tech-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Journey path animation
      gsap.fromTo(
        '.journey-path',
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: journeyRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Journey dots
      gsap.fromTo(
        '.journey-dot',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          stagger: 0.3,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: journeyRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const techIcons = [
    { icon: Code2, name: 'React', color: '#61DAFB' },
    { icon: Zap, name: 'TypeScript', color: '#3178C6' },
    { icon: Layers, name: 'Next.js', color: '#ffffff' },
    { icon: Palette, name: 'Tailwind', color: '#06B6D4' },
    { icon: GitBranch, name: 'Git', color: '#F05032' },
    { icon: TestTube, name: 'Jest', color: '#C21325' },
    { icon: Database, name: 'Node.js', color: '#339933' },
    { icon: Cloud, name: 'AWS', color: '#FF9900' },
  ];

  const journeyPoints = [
    { year: '2018', label: 'Started at HariSkyline', color: '#10b981' },
    { year: '2019', label: 'Master\'s Degree', color: '#3b82f6' },
    { year: '2021', label: 'Joined Samsung', color: '#1428a0' },
    { year: '2024', label: 'Expert at Mercor', color: '#8b5cf6' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <span className="about-label inline-block text-sm font-semibold text-blue-400 tracking-widest uppercase mb-4">
            About Me
          </span>
          <h2 className="about-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Who I Am
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div ref={contentRef} className="space-y-6">
            <p className="bio-paragraph text-lg text-gray-400 leading-relaxed">
              I'm <span className="font-semibold text-white">Ram Mohan Singh</span>, a
              Frontend Software Engineer based in Irvine, California. With a Master's in Computer
              Science from Cleveland State University and 3+ years of professional experience, I
              specialize in building scalable, high-performance web applications.
            </p>

            <p className="bio-paragraph text-lg text-gray-400 leading-relaxed">
              My journey began at <span className="font-semibold text-white">HariSkyline</span>{' '}
              in India, where I honed my React skills. I then joined{' '}
              <span className="font-semibold text-white">Samsung's</span> Ridgefield Park
              office, where I led frontend development for enterprise applications.
            </p>

            <p className="bio-paragraph text-lg text-gray-400 leading-relaxed">
              Today, I combine my technical expertise with a passion for creating intuitive user
              experiences. I believe great software should feel invisible—seamlessly helping users
              achieve their goals.
            </p>

            {/* Journey Timeline */}
            <div ref={journeyRef} className="pt-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-400" />
                My Journey
              </h3>
              <div className="relative">
                {/* SVG Path */}
                <svg className="absolute top-0 left-0 w-full h-full" style={{ overflow: 'visible' }}>
                  <path
                    className="journey-path"
                    d="M 20 20 Q 150 20 150 80 Q 150 140 280 140 Q 410 140 410 80 Q 410 20 540 20"
                    fill="none"
                    stroke="url(#journeyGradient)"
                    strokeWidth="2"
                    strokeDasharray="1000"
                    strokeDashoffset="1000"
                  />
                  <defs>
                    <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="33%" stopColor="#3b82f6" />
                      <stop offset="66%" stopColor="#1428a0" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Journey Points */}
                <div className="flex justify-between relative z-10">
                  {journeyPoints.map((point) => (
                    <div key={point.year} className="journey-dot flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
                        style={{ backgroundColor: point.color }}
                      >
                        {point.year.slice(-2)}
                      </div>
                      <span className="text-xs text-gray-500 mt-2 text-center max-w-[80px]">
                        {point.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="stats-container flex flex-wrap gap-4 pt-6">
              <div className="stat-card px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="text-3xl font-bold text-blue-400 group-hover:scale-110 transition-transform">3+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="stat-card px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 group">
                <div className="text-3xl font-bold text-purple-400 group-hover:scale-110 transition-transform">20+</div>
                <div className="text-sm text-gray-500">Projects Completed</div>
              </div>
              <div className="stat-card px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-green-500/50 transition-all duration-300 group">
                <div className="text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform">95%</div>
                <div className="text-sm text-gray-500">Sprint Goals</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative" style={{ perspective: '1000px' }}>
            <div
              ref={imageRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-white/10"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="/profile-photo.png"
                alt="Ram Mohan Singh - Professional"
                className="w-full h-[400px] lg:h-[500px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">Full Stack</div>
                  <div className="text-sm text-gray-400">React & Node.js</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Technologies I Work With
          </h3>
          <div className="tech-grid grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-6">
            {techIcons.map((tech) => (
              <div
                key={tech.name}
                className="tech-icon-card group flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                style={{ perspective: '500px' }}
              >
                <tech.icon
                  className="w-8 h-8 transition-all duration-300 group-hover:scale-125"
                  style={{ color: tech.color }}
                />
                <span className="text-xs font-medium text-gray-500 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
