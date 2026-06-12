'use client';
import { useEffect, useState } from 'react';
import { Users, Star, Zap, TrendingUp } from 'lucide-react';
import { STEPS } from '@/app/data';

const ICONS = [Users, Star, Zap, TrendingUp];
const COLORS = ['#E00000', '#0F172A', '#D97706', '#059669'];

export default function ProcessSection() {
  const [visible, setVisible] = useState<Set<string>>(new Set());

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible((p) => new Set([...p, e.target.id]));
        }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-step]').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="process" className="py-[120px] px-10 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-20">
          <div className="text-[#E00000] font-bold text-xs tracking-[3px] uppercase mb-3.5">
            How We Do It
          </div>
          <h2
            className="font-extrabold text-[#0F172A]"
            style={{ fontSize: 'clamp(2rem,4vw,3.4rem)' }}
          >
            Process. <span className="text-[#E00000]">People.</span> Performance.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => {
            const Icon = ICONS[i];
            const sc = COLORS[i];
            const isVis = visible.has(`step-${i}`);
            return (
              <div
                key={i}
                id={`step-${i}`}
                data-step
                className="card-hover bg-white border-[1.5px] border-[#E2E8F0] rounded-[22px] p-[36px_26px] relative overflow-hidden transition-all duration-700"
                style={{
                  opacity: isVis ? 1 : 0,
                  transform: isVis ? 'translateY(0)' : 'translateY(36px)',
                  transitionDelay: `${i * 0.13}s`,
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: sc }} />
                <div
                  className="text-[64px] font-black absolute top-2 right-[18px] leading-none"
                  style={{ color: `${sc}12` }}
                >
                  {step.num}
                </div>
                <div
                  className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-5"
                  style={{ background: `${sc}10`, border: `1.5px solid ${sc}25` }}
                >
                  <Icon size={22} color={sc} />
                </div>
                <div className="text-[11px] font-bold tracking-[2px] mb-2.5" style={{ color: sc }}>
                  STEP {step.num}
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-3.5 leading-[1.35]">
                  {step.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-[1.8]">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
