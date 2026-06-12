'use client';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ChevronDown, ArrowRight, Globe, Menu } from 'lucide-react';
import { C, STATS } from './data';
import ServicesSection from '@/components/zue/ServicesSection';
import AboutSection from '@/components/zue/AboutSection';
import ProcessSection from '@/components/zue/ProcessSection';
import ContactSection from '@/components/zue/ContactSection';

export default function ZuePage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm ZUE's AI assistant. How can I help you learn about our outsourcing solutions today?",
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<
    { x: number; size: number; speed: number; opacity: number }[]
  >([]);

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 15 }, () => ({
        x: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.4 + 0.15,
      }))
    );
  }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = { role: 'user', content: chatInput };
    setChatMessages((p) => [...p, userMsg]);
    setChatInput('');
    setChatLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatMessages, userMsg] }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setChatMessages((p) => [
        ...p,
        { role: 'assistant', content: data.message || "Sorry, I couldn't process that." },
      ]);
    } catch {
      setChatMessages((p) => [
        ...p,
        { role: 'assistant', content: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="font-inter bg-white text-[#1F2937] overflow-x-hidden">
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] px-10 py-3.5 flex items-center justify-between transition-all duration-400 ${scrolled ? 'bg-white/97 backdrop-blur-lg border-b border-[#E2E8F0] shadow-sm' : ''}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-[38px] h-[38px] rounded-[10px] bg-[#E00000] flex items-center justify-center font-black text-lg text-white shadow-md">
            Z
          </div>
          <span
            className={`font-black text-xl tracking-tight ${scrolled ? 'text-[#0F172A]' : 'text-white'}`}
          >
            ZUE
          </span>
          <span className="text-[#E00000] text-xs font-bold ml-0.5">USA</span>
        </div>
        <div className="desktop-nav flex gap-8 items-center">
          {['Home', 'Services', 'About', 'Process', 'Contact'].map((i) => (
            <a
              key={i}
              className={scrolled ? 'nav-link-dark' : 'nav-link'}
              onClick={() => scrollTo(i.toLowerCase())}
            >
              {i}
            </a>
          ))}
          <button className="btn-primary px-6 py-2.5 text-sm" onClick={() => scrollTo('contact')}>
            Get Started <ArrowRight size={14} />
          </button>
        </div>
        <button
          className="mobile-btn hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: scrolled ? C.navy : '#fff',
          }}
        >
          <Menu size={24} />
        </button>
      </nav>
      {menuOpen && (
        <div className="fixed top-[66px] left-0 right-0 z-[99] bg-white border-b border-[#E2E8F0] p-4 flex flex-col gap-4 shadow-lg">
          {['Home', 'Services', 'About', 'Process', 'Contact'].map((i) => (
            <a key={i} className="nav-link-dark" onClick={() => scrollTo(i.toLowerCase())}>
              {i}
            </a>
          ))}
          <button className="btn-primary py-3 justify-center" onClick={() => scrollTo('contact')}>
            Get Started <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* HERO */}
      <section
        id="home"
        className="hero-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-10"
        style={{
          paddingTop: 130,
          paddingBottom: 180,
        }}
      >
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}%`,
              bottom: 0,
              width: p.size,
              height: p.size,
              background: i % 2 === 0 ? '#E00000' : 'rgba(255,255,255,0.5)',
              opacity: p.opacity,
              animation: `particleFloat ${12 + p.speed * 18}s linear ${i * 0.5}s infinite`,
            }}
          />
        ))}
        <div
          className="absolute top-[15%] left-[8%] w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(224,0,0,0.1) 0%, transparent 70%)',
            animation: 'floatY 7s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: 'linear-gradient(90deg, transparent, #E00000, transparent)' }}
        />

        {/* Main content */}
        <div
          className={`relative z-[2] text-center max-w-[920px] w-full ${mounted ? 'hero-visible' : ''}`}
        >
          {/* badge */}
          <div className="hero-item inline-flex items-center gap-2 bg-[rgba(224,0,0,0.12)] border border-[rgba(224,0,0,0.35)] rounded-full px-5 py-2 mb-9">
            <Globe size={13} color="#E00000" />
            <span className="text-[13px] text-[#E00000] font-bold">
              A Group of Companies · Washington DC, USA
            </span>
          </div>

          {/* heading */}
          <h1
            className="hero-item text-white font-black leading-[1.07] mb-7 block"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5.4rem)' }}
          >
            Empower Your Workforce
            <br />
            <span className="shimmer-text">with Elite Offshore</span>
            <br />
            Remote Talent
          </h1>

          {/* sub */}
          <p
            className="hero-item text-white/65 max-w-[600px] mx-auto mb-12 leading-[1.8]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.18rem)' }}
          >
            ZUE is a leading BPO company delivering operational excellence for businesses across
            every industry — from Healthcare to Real Estate, Law Firms, and beyond.
          </p>

          {/* buttons */}
          <div className="hero-item flex gap-4 justify-center flex-wrap">
            <button
              className="btn-primary px-10 py-4 text-base"
              onClick={() => scrollTo('services')}
            >
              Explore Services <ArrowRight size={18} />
            </button>
            <button
              className="btn-outline px-10 py-4 text-base"
              onClick={() => scrollTo('contact')}
            >
              Contact Us
            </button>
          </div>

          {/* stats */}
          <div className="hero-item flex justify-center mt-14">
            <div
              className="flex border border-white/10 rounded-[20px] overflow-hidden flex-wrap"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="py-4 px-8 text-center"
                  style={{
                    borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}
                >
                  <div
                    className="font-extrabold text-[#E00000]"
                    style={{ fontSize: 'clamp(1.2rem,2.5vw,1.8rem)' }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5 whitespace-nowrap">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll arrow */}
        <div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          style={{ animation: 'floatY 2.2s ease-in-out infinite' }}
        >
          <ChevronDown size={22} color="rgba(255,255,255,0.3)" />
        </div>
      </section>

      <ServicesSection />
      <AboutSection />
      <ProcessSection />

      {/* CTA */}
      <section className="mx-10 mb-[120px] rounded-[28px] bg-[#0F172A] py-20 px-14 text-center relative overflow-hidden shadow-xl">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(224,0,0,0.07) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, transparent, ${C.red}, transparent)` }}
        />
        <div className="relative z-[1]">
          <h2
            className="font-extrabold text-white mb-4"
            style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            Let's Elevate Your Business Together
          </h2>
          <p className="text-white/60 text-lg max-w-[500px] mx-auto mb-10">
            Discover how ZUE's tailored BPO solutions can help you save time, cut costs, and scale
            smarter.
          </p>
          <button
            className="btn-primary px-12 py-4 text-[17px]"
            onClick={() => scrollTo('contact')}
          >
            Get Started Today <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <ContactSection />

      {/* FOOTER */}
      <footer className="bg-[#0F172A] border-t-[3px] border-[#E00000] py-11 px-12">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-[#E00000] flex items-center justify-center font-black text-base text-white">
              Z
            </div>
            <div>
              <div className="font-extrabold text-lg text-white">
                ZUE <span className="text-[#E00000]">USA</span>
              </div>
              <div className="text-xs text-white/40">A Group of Companies</div>
            </div>
          </div>
          <div className="text-white/35 text-[13px]">© 2026 ZUE USA. All rights reserved.</div>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((l) => (
              <a
                key={l}
                href="#"
                className="text-white/40 text-[13px] no-underline hover:text-[#E00000] transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* CHAT */}
      <div className="fixed bottom-[30px] right-[30px] z-[1000]">
        {chatOpen && (
          <div
            className="absolute bottom-[74px] right-0 w-[370px] bg-white border-[1.5px] border-[#E2E8F0] rounded-[22px] overflow-hidden shadow-2xl"
            style={{ animation: 'chatPop 0.3s ease' }}
          >
            <div className="p-[18px_22px] bg-[#0F172A] flex items-center gap-3.5">
              <div
                className="w-[42px] h-[42px] rounded-[10px] bg-[#E00000] flex items-center justify-center font-black text-[17px] text-white"
                style={{ animation: 'pulseRed 3s ease-in-out infinite' }}
              >
                Z
              </div>
              <div className="flex-1">
                <div className="font-bold text-[15px] text-white">ZUE AI Assistant</div>
                <div className="text-xs text-[#E00000] flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  Online
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="bg-transparent border-none text-white/50 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="h-[300px] overflow-y-auto p-[18px] flex flex-col gap-3.5 bg-[#F8FAFC]">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-[15px] py-[11px] text-[13px] leading-[1.6] shadow-sm ${msg.role === 'user' ? 'bg-[#E00000] text-white rounded-[16px_16px_4px_16px]' : 'bg-white text-[#1F2937] border border-[#E2E8F0] rounded-[16px_16px_16px_4px]'}`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex gap-1.5 px-3 py-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-[7px] h-[7px] rounded-full bg-[#E00000]"
                      style={{ animation: `typingDot 1.4s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-3.5 border-t border-[#E2E8F0] flex gap-2.5 bg-white">
              <input
                className="zue-input flex-1 !rounded-[10px] !py-[11px] !px-[15px] !text-[13px]"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendChat()}
                placeholder="Ask about ZUE's services..."
              />
              <button
                onClick={sendChat}
                disabled={chatLoading || !chatInput.trim()}
                className="w-[42px] h-[42px] rounded-[10px] border-none flex-shrink-0 flex items-center justify-center transition-all"
                style={{
                  background: chatInput.trim() ? C.red : C.border,
                  cursor: chatInput.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                <Send size={15} color="#fff" />
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-[58px] h-[58px] rounded-full border-none bg-[#E00000] cursor-pointer flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          style={{ animation: 'pulseRed 3s ease-in-out infinite' }}
        >
          {chatOpen ? <X size={22} color="#fff" /> : <MessageCircle size={22} color="#fff" />}
        </button>
      </div>
    </div>
  );
}
