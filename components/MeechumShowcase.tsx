"use client";

import { useEffect, useState, useRef } from "react";
import { Brain, ExternalLink, Zap } from "lucide-react";

type Thought = {
  id: string;
  content: string;
  slug: string;
  author: string;
  created_at: string;
};

type MeechumData = {
  username: string;
  thoughts: Thought[];
  meechumUrl: string;
};

export default function MeechumShowcase() {
  const [data, setData] = useState<MeechumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [inView, setInView] = useState<boolean[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        setScrollY(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/meechum-thoughts')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
        setInView(new Array(data.thoughts?.length || 0).fill(false));
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!data) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          data.thoughts.slice(0, 3).forEach((_, index) => {
            setTimeout(() => {
              setInView(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 250);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [data]);

  if (loading) {
    return (
      <section className="relative py-20 px-6" style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)'
      }}>
        <div className="max-w-6xl mx-auto flex justify-center py-20">
          <div className="w-10 h-10 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (!data || data.thoughts.length === 0) {
    return null;
  }

  const getAlignment = (index: number) => {
    const patterns = ['left', 'center', 'right'];
    return patterns[index % 3];
  };

  const getWidth = (index: number) => {
    const widths = ['max-w-2xl', 'max-w-3xl', 'max-w-2xl'];
    return widths[index % 3];
  };

  return (
    <section 
      className="relative py-20 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)',
        minHeight: '100vh'
      }}
    >
      {/* Animated Tech Grid Background */}
      <div className="absolute inset-0 opacity-25">
        {/* Vertical lines that pulse */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${12.5 * (i + 1)}%`,
              background: 'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.4) 50%, transparent 100%)',
              animation: `pulse ${2 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
        
        {/* Horizontal lines that pulse */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${16.6 * (i + 1)}%`,
              background: 'linear-gradient(90deg, transparent 0%, rgba(20, 184, 166, 0.4) 50%, transparent 100%)',
              animation: `pulse ${2.5 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}

        {/* Connection nodes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`node-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? '#10b981' : '#14b8a6',
              boxShadow: `0 0 20px ${i % 2 === 0 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(20, 184, 166, 0.6)'}`,
              animation: `pulse ${1.5 + Math.random()}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}

        {/* Scanning effect */}
        <div 
          className="absolute left-0 right-0 h-40"
          style={{
            top: `${scrollY * 100}%`,
            background: 'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%)',
            transition: 'top 0.3s ease-out',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Elevated Container with Teal/Emerald Accent */}
      <div 
        className="max-w-5xl mx-auto relative z-10 rounded-3xl overflow-hidden"
        ref={containerRef}
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.92) 100%)',
          boxShadow: '0 60px 120px rgba(0, 0, 0, 0.6), 0 0 100px rgba(16, 185, 129, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(20, 184, 166, 0.3)',
          transform: inView.some(v => v) ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
          opacity: inView.some(v => v) ? 1 : 0,
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Inner glow effect */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div 
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'float 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'float 8s ease-in-out infinite',
              animationDelay: '4s'
            }}
          />
        </div>

        <div className="relative z-10 p-12">
          {/* Header */}
          <div className="mb-10 text-center">
            <div 
              className="inline-flex items-center gap-3 px-5 py-2.5 mb-5 border border-emerald-400/30 bg-slate-900/60 backdrop-blur-sm rounded-full"
              style={{
                animation: 'fadeInDown 0.8s ease-out 0.3s both',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.15)'
              }}
            >
              <Brain className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                Live Neural Feed
              </span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>

            <h2 
              className="text-5xl md:text-6xl font-black mb-3 tracking-tight text-white"
              style={{
                animation: 'fadeInDown 0.8s ease-out 0.5s both'
              }}
            >
              Meechum <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Insights</span>
            </h2>
            <p 
              className="text-neutral-400 text-base"
              style={{
                animation: 'fadeInDown 0.8s ease-out 0.7s both'
              }}
            >
             Here are some of mine, live from Meechum. Come on, let's blog.
            </p>
          </div>

          {/* Staggered Rows with Gliding Animation */}
          <div className="space-y-4 mb-10">
            {data.thoughts.slice(0, 3).map((thought, index) => {
              const alignment = getAlignment(index);
              const width = getWidth(index);
              const isLeft = alignment === 'left';
              const isRight = alignment === 'right';

              return (
                <div
                  key={thought.id}
                  className={`flex ${isLeft ? 'justify-start' : isRight ? 'justify-end' : 'justify-center'}`}
                >
                  <a
                    href="https://meechum.vercel.app/users/recorder-152c"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`block relative group ${width} w-full`}
                    style={{
                      opacity: inView[index] ? 1 : 0,
                      transform: inView[index] 
                        ? 'translateX(0) translateY(0) scale(1)' 
                        : isLeft 
                          ? 'translateX(-80px) translateY(20px) scale(0.9)' 
                          : isRight 
                            ? 'translateX(80px) translateY(20px) scale(0.9)'
                            : 'translateY(30px) scale(0.9)',
                      transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: `${0.3 + index * 0.2}s`
                    }}
                  >
                    <div 
                      className="relative border border-slate-700/50 bg-slate-900/40 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-700"
                      style={{
                        transform: hoveredIndex === index ? 'translateY(-6px)' : 'translateY(0)',
                        boxShadow: hoveredIndex === index 
                          ? '0 20px 50px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                          : 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      {/* Top glow bar */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-px transition-all duration-700"
                        style={{
                          background: hoveredIndex === index 
                            ? 'linear-gradient(90deg, transparent, #10b981, #14b8a6, transparent)' 
                            : 'transparent',
                          boxShadow: hoveredIndex === index ? '0 0 20px rgba(16, 185, 129, 0.6)' : 'none'
                        }}
                      />

                      <div className="grid grid-cols-12 gap-4 p-5 items-center">
                        
                        <div className="col-span-2 md:col-span-1 flex flex-col items-center gap-2">
                          <span className={`text-2xl font-black font-mono transition-all duration-700 ${
                            hoveredIndex === index ? 'text-emerald-400 scale-110' : 'text-slate-600'
                          }`}
                          style={{
                            textShadow: hoveredIndex === index ? '0 0 20px rgba(16, 185, 129, 0.8)' : 'none'
                          }}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className={`w-1 rounded-full transition-all duration-700 ${
                            hoveredIndex === index ? 'bg-gradient-to-b from-emerald-400 to-teal-400 h-12' : 'bg-slate-700 h-8'
                          }`}
                          style={{
                            boxShadow: hoveredIndex === index ? '0 0 15px rgba(16, 185, 129, 0.6)' : 'none'
                          }}
                          />
                        </div>

                        <div className="col-span-9 md:col-span-10">
                          <p className="text-neutral-300 group-hover:text-white transition-colors duration-700 leading-relaxed text-sm md:text-base line-clamp-3 mb-2">
                            {thought.content}
                          </p>
                          
                          <div className="flex items-center gap-2">
                            <div className={`w-1 h-1 rounded-full transition-all duration-500 ${
                              hoveredIndex === index ? 'bg-emerald-400 scale-150' : 'bg-slate-600'
                            }`}
                            style={{
                              boxShadow: hoveredIndex === index ? '0 0 8px rgba(16, 185, 129, 0.8)' : 'none'
                            }}
                            />
                            <span className={`text-xs font-mono transition-colors duration-500 ${
                              hoveredIndex === index ? 'text-emerald-400' : 'text-slate-500'
                            }`}>
                              Author
                            </span>
                          </div>
                        </div>

                        <div className="col-span-1 flex justify-end">
                          <ExternalLink 
                            className={`w-4 h-4 transition-all duration-700 ${
                              hoveredIndex === index 
                                ? 'text-emerald-400 translate-x-0.5 -translate-y-0.5' 
                                : 'text-slate-600'
                            }`}
                            style={{
                              filter: hoveredIndex === index ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))' : 'none'
                            }}
                          />
                        </div>
                      </div>

                      {/* Corner accents */}
                      <div className={`absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 rounded-tl-xl transition-all duration-700 ${
                        hoveredIndex === index ? 'border-emerald-400' : 'border-transparent'
                      }`}
                      style={{
                        boxShadow: hoveredIndex === index ? '0 0 15px rgba(16, 185, 129, 0.5)' : 'none'
                      }}
                      />
                      <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-xl transition-all duration-700 ${
                        hoveredIndex === index ? 'border-teal-400' : 'border-transparent'
                      }`}
                      style={{
                        boxShadow: hoveredIndex === index ? '0 0 15px rgba(20, 184, 166, 0.5)' : 'none'
                      }}
                      />
                    </div>

                    {/* Side accent */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-700 ${
                      hoveredIndex === index ? 'bg-gradient-to-b from-emerald-400 to-teal-400 shadow-lg shadow-emerald-500/50' : 'bg-transparent'
                    }`} />
                  </a>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div 
            className="text-center pt-4"
            style={{
              animation: 'fadeInUp 0.8s ease-out 1.3s both'
            }}
          >
            <a
              href={data.meechumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-emerald-400/40 bg-slate-900/60 hover:bg-slate-900/80 hover:border-emerald-400 backdrop-blur-sm rounded-xl transition-all duration-700 group hover:scale-105"
              style={{
                boxShadow: '0 10px 40px rgba(16, 185, 129, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(16, 185, 129, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(16, 185, 129, 0.15)';
              }}
            >
              <Zap className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-500" />
              <span className="font-mono text-sm text-white uppercase tracking-widest">
                Explore Full Archive
              </span>
              <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -20px);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}