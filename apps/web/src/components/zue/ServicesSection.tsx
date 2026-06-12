'use client';
import { useState } from 'react';
import {
  HeartPulse,
  Home,
  Scale,
  Cpu,
  Building2,
  ArrowRight,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';
import { INDUSTRIES } from '@/app/data';

const ICONS = [HeartPulse, Home, Scale, Cpu, Building2];

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const ind = INDUSTRIES[active];
  const Icon = ICONS[active];

  return (
    <section id="services" className="py-[120px] px-10 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-[72px]">
          <div className="text-[#E00000] font-bold text-xs tracking-[3px] uppercase mb-3.5">
            What We Do
          </div>
          <h2
            className="font-extrabold text-[#0F172A] mb-4"
            style={{ fontSize: 'clamp(2rem,4vw,3.4rem)' }}
          >
            Tailored Outsourcing Solutions
            <br />
            <span className="text-[#E00000]">for Every Industry</span>
          </h2>
          <p className="text-[#64748B] text-lg max-w-[480px] mx-auto">
            We serve a diverse range of industries with precision and expertise.
          </p>
        </div>
        <div className="flex gap-7 flex-wrap">
          <div className="flex-[1_1_280px] flex flex-col gap-2.5">
            {INDUSTRIES.map((item, i) => {
              const ItemIcon = ICONS[i];
              const isActive = active === i;
              return (
                <div
                  key={i}
                  onClick={() => setActive(i)}
                  className="p-[18px_22px] rounded-[14px] cursor-pointer flex items-center gap-4 transition-all duration-300"
                  style={{
                    background: isActive ? `${item.color}0D` : '#F8FAFC',
                    border: `1.5px solid ${isActive ? item.color : '#E2E8F0'}`,
                    transform: isActive ? 'translateX(6px)' : 'none',
                    boxShadow: isActive ? `0 4px 20px ${item.color}20` : 'none',
                  }}
                >
                  <div
                    className="w-[42px] h-[42px] rounded-[10px] flex-shrink-0 flex items-center justify-center transition-all"
                    style={{ background: isActive ? item.color : `${item.color}18` }}
                  >
                    <ItemIcon size={20} color={isActive ? '#fff' : item.color} />
                  </div>
                  <div className="flex-1">
                    <div
                      className="font-bold text-[15px]"
                      style={{ color: isActive ? '#0F172A' : '#1F2937' }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: isActive ? item.color : '#94A3B8' }}
                    >
                      {item.stats}
                    </div>
                  </div>
                  {isActive && <ArrowRight size={16} color={item.color} />}
                </div>
              );
            })}
          </div>
          <div className="flex-[1_1_400px]">
            <div className="bg-white border-[1.5px] border-[#E2E8F0] rounded-[24px] p-12 h-full min-h-[420px] relative overflow-hidden shadow-md">
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-[24px]"
                style={{ background: ind.color }}
              />
              <div
                className="w-[72px] h-[72px] rounded-[18px] mb-7 flex items-center justify-center"
                style={{ background: `${ind.color}12`, border: `1.5px solid ${ind.color}30` }}
              >
                <Icon size={32} color={ind.color} />
              </div>
              <h3 className="text-[28px] font-extrabold text-[#0F172A] mb-4">{ind.title}</h3>
              <p className="text-[#64748B] text-base leading-[1.85] mb-7">{ind.desc}</p>
              <div
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5"
                style={{ background: `${ind.color}10`, border: `1px solid ${ind.color}25` }}
              >
                <TrendingUp size={15} color={ind.color} />
                <span className="font-bold text-sm" style={{ color: ind.color }}>
                  {ind.stats}
                </span>
              </div>
              <div className="mt-8 flex flex-col gap-3">
                {[
                  'Dedicated account manager',
                  '24/7 operations support',
                  'Weekly performance reports',
                ].map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2.5">
                    <CheckCircle size={16} color={ind.color} />
                    <span className="text-[#1F2937] text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
