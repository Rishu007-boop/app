import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Award, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const education = [
    {
      institution: 'Cleveland State University',
      location: 'Cleveland, OH',
      degree: 'Master of Computer and Information Science',
      gpa: '3.18/4.0',
      period: '2019 - 2021',
      color: '#3b82f6',
      icon: '🎓',
      courses: ['Advanced Algorithms', 'Software Engineering', 'Database Systems', 'Web Development'],
    },
    {
      institution: 'Mount Vernon Nazarene University',
      location: 'Ohio',
      degree: 'Master of Science in Management',
      gpa: '3.9/4.0',
      period: 'Completed',
      color: '#8b5cf6',
      icon: '📊',
      courses: ['Strategic Management', 'Leadership', 'Business Analytics', 'Project Management'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.education-header',
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

      // Connection line draw
      gsap.fromTo(
        '.connection-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation with 3D flip
      gsap.fromTo(
        '.education-card:first-child',
        { x: -80, opacity: 0, rotateY: 30 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.education-card:last-child',
        { x: 80, opacity: 0, rotateY: -30 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          delay: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // GPA badges bounce
      gsap.fromTo(
        '.gpa-badge',
        { scale: 0, rotate: -180 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Course tags stagger
      gsap.fromTo(
        '.course-tag',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          scrollTrigger: {
            trigger: '.courses-list',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-900/10 to-transparent rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="education-header text-center mb-16">
          <span className="inline-block text-sm font-semibold text-blue-400 tracking-widest uppercase mb-4">
            Education
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Academic Background
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My educational journey that laid the foundation for my career
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="relative grid md:grid-cols-2 gap-8">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-1/2 w-32 h-0.5 -translate-x-1/2 -translate-y-1/2">
            <div className="connection-line absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 origin-left" 
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          {education.map((edu) => (
            <div
              key={edu.institution}
              className="education-card group relative"
              style={{ perspective: '1000px' }}
            >
              <div 
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glow */}
                <div 
                  className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${edu.color}20, transparent)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-white/5 group-hover:scale-110 transition-transform"
                      style={{ boxShadow: `0 0 30px ${edu.color}30` }}
                    >
                      {edu.icon}
                    </div>
                    <div
                      className="gpa-badge px-4 py-2 rounded-full flex items-center gap-2 bg-white/5 border border-white/10"
                    >
                      <Award className="w-4 h-4" style={{ color: edu.color }} />
                      <span className="text-sm font-bold" style={{ color: edu.color }}>
                        GPA: {edu.gpa}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                    style={{ 
                      backgroundImage: `linear-gradient(135deg, ${edu.color}, white)`,
                    }}
                  >
                    {edu.institution}
                  </h3>
                  <p className="text-lg font-medium mb-4" style={{ color: edu.color }}>
                    {edu.degree}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {edu.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {edu.period}
                    </div>
                  </div>

                  {/* Courses */}
                  <div className="courses-list">
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                      <BookOpen className="w-4 h-4" />
                      <span>Key Courses</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className="course-tag px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
