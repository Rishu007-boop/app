import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Linkedin, Github, CheckCircle, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'singhrammohan321@gmail.com',
      href: 'mailto:singhrammohan321@gmail.com',
      color: '#3b82f6',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (216) 235-1703',
      href: 'tel:+12162351703',
      color: '#10b981',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Irvine, California',
      href: '#',
      color: '#f59e0b',
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/rammohansingh-web-developer', label: 'LinkedIn', color: '#0077b5' },
    { icon: Github, href: 'https://github.com/Rishu007-boop', label: 'GitHub', color: '#ffffff' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        '.contact-headline span',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subheadline
      gsap.fromTo(
        '.contact-subheadline',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact items with stagger
      gsap.fromTo(
        '.contact-item',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Social icons bounce
      gsap.fromTo(
        '.social-icon',
        { scale: 0, rotate: -180 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.social-links',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form fields
      gsap.fromTo(
        '.form-field',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Submit button
      gsap.fromTo(
        '.submit-btn',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-900/10 to-transparent rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Content */}
          <div>
            <h2 className="contact-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {'Let\'s Work Together'.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-3">
                  {word}
                </span>
              ))}
            </h2>

            <p className="contact-subheadline text-lg text-gray-400 mb-12">
              Have a project in mind? Let's create something amazing together.
            </p>

            {/* Contact Info */}
            <div className="contact-info space-y-4 mb-12">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="contact-item group flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                    <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="social-links flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="relative">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="form-field relative">
                <label 
                  htmlFor="name" 
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'name' || formState.name 
                      ? '-top-2.5 text-xs text-blue-400 bg-[#0a0a0a] px-2' 
                      : 'top-4 text-gray-500'
                  }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>

              {/* Email Field */}
              <div className="form-field relative">
                <label 
                  htmlFor="email" 
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'email' || formState.email 
                      ? '-top-2.5 text-xs text-blue-400 bg-[#0a0a0a] px-2' 
                      : 'top-4 text-gray-500'
                  }`}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>

              {/* Message Field */}
              <div className="form-field relative">
                <label 
                  htmlFor="message" 
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'message' || formState.message 
                      ? '-top-2.5 text-xs text-blue-400 bg-[#0a0a0a] px-2' 
                      : 'top-4 text-gray-500'
                  }`}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`submit-btn w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02]'
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/* Decorative Message Icon */}
            <div className="absolute -top-8 -right-8 w-24 h-24 opacity-10">
              <MessageSquare className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
