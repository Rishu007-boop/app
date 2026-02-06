import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());

  const skillCategories = [
    {
      name: 'Frontend Core',
      color: '#3b82f6',
      icon: '⚛️',
      skills: [
        { name: 'React.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'JavaScript/ES6+', level: 95 },
        { name: 'HTML5/CSS3', level: 95 },
        { name: 'Next.js', level: 85 },
      ],
    },
    {
      name: 'State & Data',
      color: '#8b5cf6',
      icon: '🔄',
      skills: [
        { name: 'Redux', level: 90 },
        { name: 'TanStack Query', level: 85 },
        { name: 'Context API', level: 90 },
        { name: 'REST APIs', level: 95 },
        { name: 'GraphQL', level: 75 },
      ],
    },
    {
      name: 'Styling & UI',
      color: '#06b6d4',
      icon: '🎨',
      skills: [
        { name: 'Tailwind CSS', level: 95 },
        { name: 'SCSS/SASS', level: 90 },
        { name: 'Styled Components', level: 85 },
        { name: 'Bootstrap', level: 80 },
        { name: 'Material UI', level: 85 },
      ],
    },
    {
      name: 'Testing & Tools',
      color: '#10b981',
      icon: '🧪',
      skills: [
        { name: 'Jest', level: 85 },
        { name: 'React Testing Library', level: 90 },
        { name: 'Enzyme', level: 80 },
        { name: 'Git/GitHub', level: 95 },
        { name: 'CI/CD', level: 80 },
      ],
    },
    {
      name: 'Backend & Other',
      color: '#f59e0b',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 75 },
        { name: 'Java', level: 70 },
        { name: 'Python', level: 65 },
        { name: 'SQL', level: 75 },
        { name: 'AWS/Azure', level: 70 },
      ],
    },
  ];

  const floatingSkills = [
    { name: 'React', x: 10, y: 20, size: 60, delay: 0 },
    { name: 'TS', x: 85, y: 15, size: 50, delay: 0.5 },
    { name: 'Node', x: 75, y: 70, size: 55, delay: 1 },
    { name: 'CSS', x: 15, y: 75, size: 45, delay: 1.5 },
    { name: 'Git', x: 90, y: 50, size: 40, delay: 2 },
    { name: 'JS', x: 5, y: 50, size: 50, delay: 2.5 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.skills-header',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating skills animation
      gsap.to('.floating-skill', {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        rotation: 'random(-10, 10)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.5,
          from: 'random',
        },
      });

      // Skill cards animation
      gsap.fromTo(
        '.skill-card',
        { y: 80, opacity: 0, rotateX: -30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Orbit rotation
      gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      // Counter-rotate orbit items
      gsap.to('.orbit-skill', {
        rotation: -360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      // Animate progress bars when in view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const skillKey = entry.target.getAttribute('data-skill');
              if (skillKey) {
                setTimeout(() => {
                  setAnimatedSkills((prev) => new Set([...prev, skillKey]));
                }, Math.random() * 300);
              }
            }
          });
        },
        { threshold: 0.5 }
      );

      const bars = document.querySelectorAll('.skill-progress');
      bars.forEach((bar) => observer.observe(bar));

      return () => observer.disconnect();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Floating Background Skills */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingSkills.map((skill) => (
          <div
            key={skill.name}
            className="floating-skill absolute font-bold text-white/5"
            style={{
              left: `${skill.x}%`,
              top: `${skill.y}%`,
              fontSize: `${skill.size}px`,
              animationDelay: `${skill.delay}s`,
            }}
          >
            {skill.name}
          </div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="skills-header text-center mb-16">
          <span className="inline-block text-sm font-semibold text-blue-400 tracking-widest uppercase mb-4">
            Skills
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Technologies I Master
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My toolkit for building modern, scalable web applications
          </p>
        </div>

        {/* Central Orbit Display */}
        <div className="flex justify-center mb-16">
          <div className="relative w-64 h-64">
            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-4xl shadow-lg shadow-blue-500/30">
                💻
              </div>
            </div>
            
            {/* Orbit Ring */}
            <div
              ref={orbitRef}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 border border-white/10 rounded-full" />
              {['⚛️', '📘', '🟢', '🎨'].map((emoji, i) => (
                <div
                  key={i}
                  className="orbit-skill absolute w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-lg"
                  style={{
                    transform: `rotate(${i * 90}deg) translateX(100px) rotate(-${i * 90}deg)`,
                    left: 'calc(50% - 20px)',
                    top: 'calc(50% - 20px)',
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="skill-card group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 lg:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]"
              style={{ perspective: '1000px' }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white/5 group-hover:scale-110 transition-transform"
                  style={{ 
                    boxShadow: `0 0 20px ${category.color}30`,
                  }}
                >
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                      <span className="text-sm font-bold" style={{ color: category.color }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="skill-progress h-full rounded-full transition-all duration-1000 ease-out relative"
                        data-skill={`${category.name}-${skill.name}`}
                        style={{
                          width: animatedSkills.has(`${category.name}-${skill.name}`)
                            ? `${skill.level}%`
                            : '0%',
                          backgroundColor: category.color,
                        }}
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Frontend', value: '95%', color: '#3b82f6', icon: '🎨' },
            { label: 'Backend', value: '75%', color: '#8b5cf6', icon: '⚙️' },
            { label: 'Testing', value: '85%', color: '#10b981', icon: '🧪' },
            { label: 'DevOps', value: '70%', color: '#f59e0b', icon: '🚀' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div
                className="text-3xl lg:text-4xl font-bold mb-1 group-hover:scale-110 transition-transform"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
