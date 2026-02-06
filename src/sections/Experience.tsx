import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, MapPin, Calendar, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      company: 'Mercor',
      role: 'Expert Project Manager (EPM) / Web Developer Expert',
      location: 'Remote',
      period: 'Mar 2025 – Present',
      description:
        'Collaborating with AI research labs on frontend evaluation and managing expert communities for AI training initiatives.',
      achievements: [
        'Trained AI models on UI/UX detection with expert-level assessments',
        'Managed distributed community of domain experts',
        'Performed data QA and maintained structured documentation',
        'Tracked and distributed weekly project metrics',
      ],
      color: '#3b82f6',
      icon: '🚀',
    },
    {
      company: 'Samsung',
      role: 'Software Frontend Developer',
      location: 'Ridgefield Park, NJ',
      period: 'Feb 2021 – Feb 2024',
      description:
        'Led frontend development for enterprise applications, implementing reusable React components and improving performance by 30%.',
      achievements: [
        'Enhanced UI development with 20+ reusable React components, reducing state errors by 15%',
        'Implemented Redux for centralized state management',
        'Engineered Next.js applications, improving SEO by 30%',
        'Championed TDD with Jest and Enzyme, reducing bugs by 40%',
        'Led Agile ceremonies, achieving 95% sprint goals',
      ],
      color: '#1428a0',
      icon: '📱',
    },
    {
      company: 'HariSkyline',
      role: 'Web Developer',
      location: 'Ahmedabad, India',
      period: 'Aug 2018 – May 2019',
      description:
        'Developed interactive web applications and automated workflows for streaming services.',
      achievements: [
        'Reduced load times by 20% through React optimization',
        'Resolved 50+ critical issues through bi-weekly debugging',
        'Integrated RESTful APIs for streaming service requirements',
        'Automated subtitle generation with Python bots',
      ],
      color: '#10b981',
      icon: '💻',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.experience-header',
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

      // Timeline line draw animation
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Experience cards with 3D flip
      const cards = document.querySelectorAll('.experience-card');
      cards.forEach((card, index) => {
        const isLeft = index % 2 === 0;
        gsap.fromTo(
          card,
          {
            x: isLeft ? -100 : 100,
            opacity: 0,
            rotateY: isLeft ? 30 : -30,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: isLeft ? 5 : -5,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Timeline nodes with bounce
      gsap.fromTo(
        '.timeline-node',
        { scale: 0, rotate: -180 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Achievement items stagger
      gsap.fromTo(
        '.achievement-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.achievements-list',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax effect on scroll
      gsap.to('.timeline-bg', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="timeline-bg absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="experience-header text-center mb-20">
          <span className="inline-block text-sm font-semibold text-blue-400 tracking-widest uppercase mb-4">
            Experience
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            My Professional Journey
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            A timeline of my career growth and the amazing companies I've worked with
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 transform md:-translate-x-1/2 rounded-full overflow-hidden">
            <div
              className="timeline-line absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start md:items-center`}
                style={{ perspective: '1000px' }}
              >
                {/* Timeline Node */}
                <div
                  className="timeline-node absolute left-4 md:left-1/2 w-12 h-12 rounded-full transform -translate-x-1/2 z-10 flex items-center justify-center text-2xl border-4 border-[#0a0a0a]"
                  style={{ 
                    backgroundColor: exp.color,
                    boxShadow: `0 0 30px ${exp.color}60`,
                  }}
                >
                  {exp.icon}
                </div>

                {/* Card */}
                <div
                  className={`experience-card ml-16 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <div
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 lg:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                    style={{
                      transform: index % 2 === 0 ? 'rotateY(5deg)' : 'rotateY(-5deg)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Glow Effect */}
                    <div 
                      className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                      style={{ 
                        background: `linear-gradient(135deg, ${exp.color}20, transparent)`,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300"
                            style={{ 
                              backgroundImage: `linear-gradient(135deg, ${exp.color}, white)`,
                            }}
                          >
                            {exp.company}
                          </h3>
                          <p className="text-lg font-medium mt-1" style={{ color: exp.color }}>
                            {exp.role}
                          </p>
                        </div>
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform"
                        >
                          <Briefcase className="w-6 h-6" style={{ color: exp.color }} />
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 mb-6">{exp.description}</p>

                      {/* Achievements */}
                      <div className="achievements-list space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <div
                            key={i}
                            className="achievement-item flex items-start gap-2 text-sm group/item"
                          >
                            <Star
                              className="w-4 h-4 mt-0.5 flex-shrink-0 transition-colors"
                              style={{ color: exp.color }}
                            />
                            <span className="text-gray-400 group-hover/item:text-gray-300 transition-colors">
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
