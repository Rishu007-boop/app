import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects = [
    {
      id: 'react-commerce',
      title: 'React Commerce',
      description:
        'A modern e-commerce platform built with React, featuring product browsing, cart management, and seamless checkout. Implements reusable components and dynamic data rendering.',
      image: '/project-react-commerce.jpg',
      techStack: ['React', 'Redux', 'Tailwind CSS', 'Stripe API'],
      liveLink: 'https://rishu-portfolio.netlify.app/',
      githubLink: 'https://github.com/Rishu007-boop/Online-Store-main',
      color: '#3b82f6',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'reddit-clone',
      title: 'TypeScript Reddit Clone',
      description:
        'A full-featured Reddit clone built with TypeScript and React. Includes post creation, voting, commenting, and subreddit management with real-time updates.',
      image: '/project-reddit-clone.jpg',
      techStack: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
      liveLink: 'https://rishu-portfolio.netlify.app/',
      githubLink: 'https://github.com/Rishu007-boop',
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'food-app',
      title: 'Vanilla JS Food App',
      description:
        'A food ordering platform built with vanilla JavaScript. Features menu browsing, cart functionality, and order placement with a clean, intuitive interface.',
      image: '/project-food-app.jpg',
      techStack: ['JavaScript ES6+', 'HTML5', 'CSS3', 'Local Storage'],
      liveLink: 'https://rishu-portfolio.netlify.app/',
      githubLink: 'https://github.com/Rishu007-boop/online-food-app',
      color: '#f59e0b',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'travel-platform',
      title: 'Next.js Travel Platform',
      description:
        'A travel discovery platform built with Next.js. Features destination browsing, accommodation search, and travel planning tools with SEO optimization.',
      image: '/project-travel-web.jpg',
      techStack: ['Next.js', 'React', 'Tailwind CSS', 'REST APIs'],
      liveLink: 'https://rishu-portfolio.netlify.app/',
      githubLink: 'https://github.com/Rishu007-boop',
      color: '#10b981',
      gradient: 'from-green-500 to-teal-500',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.projects-header',
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

      // Project cards with 3D tilt effect
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            y: 100, 
            opacity: 0,
            rotateX: 20,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            delay: index * 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Parallax on project images
      gsap.utils.toArray<HTMLElement>('.project-image').forEach((img) => {
        gsap.to(img, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, projectId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });

    setHoveredProject(projectId);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
    setHoveredProject(null);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="projects-header text-center mb-16">
          <span className="inline-block text-sm font-semibold text-blue-400 tracking-widest uppercase mb-4">
            Projects
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Featured Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for building great products
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8" style={{ perspective: '1000px' }}>
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl bg-gradient-to-r ${project.gradient}`}
                  style={{ filter: 'blur(20px)', opacity: hoveredProject === project.id ? 0.3 : 0 }}
                />

                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-[#0a0a0a] rounded-full font-semibold hover:bg-gray-100 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6 lg:p-8">
                  {/* Title with sparkle */}
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles 
                      className="w-5 h-5 transition-colors duration-300" 
                      style={{ color: project.color }}
                    />
                    <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                      style={{ 
                        backgroundImage: `linear-gradient(135deg, ${project.color}, white)`,
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/Rishu007-boop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
