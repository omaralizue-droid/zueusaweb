'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  Clock3,
  Headphones,
  Layers3,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react';

type FocusKey =
  | 'customer-support'
  | 'back-office'
  | 'lead-generation'
  | 'healthcare-admin'
  | 'finance-ops';

const FOCUS_OPTIONS: {
  key: FocusKey;
  title: string;
  summary: string;
  icon: typeof Headphones;
  color: string;
  services: string[];
}[] = [
  {
    key: 'customer-support',
    title: 'Customer Support',
    summary: 'Inbound calls, omnichannel support, QA, and 24/7 customer handling.',
    icon: Headphones,
    color: '#E00000',
    services: ['Voice support agents', 'QA monitoring', 'Escalation desk'],
  },
  {
    key: 'back-office',
    title: 'Back Office',
    summary: 'Data entry, reporting, admin workflows, and documentation support.',
    icon: Layers3,
    color: '#2563EB',
    services: ['Data processing pod', 'Admin support VA', 'Daily reporting lane'],
  },
  {
    key: 'lead-generation',
    title: 'Lead Generation',
    summary: 'Prospecting, CRM updates, follow-ups, and appointment setting.',
    icon: BriefcaseBusiness,
    color: '#D97706',
    services: ['Outbound callers', 'CRM cleanup', 'Appointment setters'],
  },
  {
    key: 'healthcare-admin',
    title: 'Healthcare Admin',
    summary: 'Medical billing, intake, scheduling, verification, and patient support.',
    icon: Stethoscope,
    color: '#059669',
    services: ['RCM specialists', 'Insurance verification', 'Patient scheduling desk'],
  },
  {
    key: 'finance-ops',
    title: 'Finance Ops',
    summary: 'Bookkeeping assistance, reconciliations, collections, and AR/AP support.',
    icon: ShieldCheck,
    color: '#7C3AED',
    services: ['AR/AP support', 'Collections workflow', 'Reconciliation analysts'],
  },
];

const COVERAGE_OPTIONS = [
  { value: 8, label: '8 Hours', note: 'Single shift coverage' },
  { value: 16, label: '16 Hours', note: 'Extended business coverage' },
  { value: 24, label: '24 Hours', note: 'Round-the-clock support' },
];

export default function BpoPlannerSection() {
  const [teamSize, setTeamSize] = useState(12);
  const [localSalary, setLocalSalary] = useState(3200);
  const [coverage, setCoverage] = useState(16);
  const [focus, setFocus] = useState<FocusKey>('customer-support');

  const plan = useMemo(() => {
    const selectedFocus = FOCUS_OPTIONS.find((item) => item.key === focus) ?? FOCUS_OPTIONS[0];
    const offshoreSalary = Math.round(localSalary * 0.4);
    const monthlyLocal = teamSize * localSalary;
    const monthlyOffshore = teamSize * offshoreSalary;
    const monthlySavings = monthlyLocal - monthlyOffshore;
    const annualSavings = monthlySavings * 12;
    const shifts = coverage === 24 ? 3 : coverage === 16 ? 2 : 1;
    const leaders = Math.max(1, Math.ceil(teamSize / 8));
    const launchWeeks = Math.min(6, Math.max(2, Math.ceil(teamSize / 10) + shifts - 1));
    const recommendedSeats = teamSize + leaders;
    const savingsRate = Math.round((monthlySavings / monthlyLocal) * 100);

    return {
      selectedFocus,
      offshoreSalary,
      monthlyLocal,
      monthlyOffshore,
      monthlySavings,
      annualSavings,
      shifts,
      leaders,
      launchWeeks,
      recommendedSeats,
      savingsRate,
    };
  }, [coverage, focus, localSalary, teamSize]);

  return (
    <section id="planner" className="py-[120px] px-10 bg-[#0B1220] text-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(224,0,0,0.2), transparent 28%), radial-gradient(circle at 85% 22%, rgba(37,99,235,0.18), transparent 22%), linear-gradient(180deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: 'auto, auto, 54px 54px, 54px 54px',
        }}
      />
      <div className="max-w-[1240px] mx-auto relative z-[1]">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E0000045] bg-[#E000001A] px-5 py-2 mb-4">
            <Sparkles size={14} color="#FF7A7A" />
            <span className="text-[12px] font-bold tracking-[2px] uppercase text-[#FFD6D6]">
              Smart BPO Tool
            </span>
          </div>
          <h2
            className="font-extrabold mb-4 leading-[1.08]"
            style={{ fontSize: 'clamp(2rem,4vw,3.6rem)' }}
          >
            Build Your Ideal
            <br />
            <span className="text-[#FF5A5A]">BPO Delivery Plan</span>
          </h2>
          <p className="max-w-[720px] mx-auto text-white/65 text-[17px] leading-[1.8]">
            Team size, local payroll, and service focus select karein aur foran dekhein ke
            outsourcing se kitni savings, kitni seats, aur kis type ki team aap ko chahiye hogi.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 md:p-9 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-[22px] border border-white/10 bg-[#101A30] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-white/55 text-sm">Required Team Size</div>
                    <div className="text-3xl font-extrabold mt-1">{teamSize} FTE</div>
                  </div>
                  <div className="w-12 h-12 rounded-[14px] bg-[#E000001A] border border-[#E0000030] flex items-center justify-center">
                    <Users size={22} color="#FF6A6A" />
                  </div>
                </div>
                <input
                  type="range"
                  min={2}
                  max={80}
                  step={1}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="planner-range w-full"
                  aria-label="Required team size"
                />
                <div className="flex justify-between text-xs text-white/40 mt-3">
                  <span>2</span>
                  <span>80</span>
                </div>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-[#101A30] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-white/55 text-sm">Local Monthly Salary</div>
                    <div className="text-3xl font-extrabold mt-1">${localSalary.toLocaleString()}</div>
                  </div>
                  <div className="w-12 h-12 rounded-[14px] bg-[#2563EB1A] border border-[#2563EB30] flex items-center justify-center">
                    <BadgeDollarSign size={22} color="#7DB0FF" />
                  </div>
                </div>
                <input
                  type="range"
                  min={800}
                  max={9000}
                  step={100}
                  value={localSalary}
                  onChange={(e) => setLocalSalary(Number(e.target.value))}
                  className="planner-range w-full"
                  aria-label="Local monthly salary"
                />
                <div className="flex justify-between text-xs text-white/40 mt-3">
                  <span>$800</span>
                  <span>$9,000</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-sm font-semibold text-white mb-3">Coverage Window</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {COVERAGE_OPTIONS.map((item) => {
                  const active = coverage === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setCoverage(item.value)}
                      className="rounded-[18px] border p-4 text-left transition-all duration-300"
                      style={{
                        borderColor: active ? '#E00000' : 'rgba(255,255,255,0.1)',
                        background: active ? 'rgba(224,0,0,0.16)' : 'rgba(255,255,255,0.03)',
                        boxShadow: active ? '0 18px 35px rgba(224,0,0,0.18)' : 'none',
                      }}
                    >
                      <div className="text-[15px] font-bold">{item.label}</div>
                      <div className="text-sm text-white/55 mt-1">{item.note}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-white mb-3">Primary BPO Focus</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {FOCUS_OPTIONS.map((item) => {
                  const Icon = item.icon;
                  const active = focus === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setFocus(item.key)}
                      className="rounded-[20px] border p-4 text-left transition-all duration-300"
                      style={{
                        borderColor: active ? item.color : 'rgba(255,255,255,0.1)',
                        background: active ? `${item.color}1A` : 'rgba(255,255,255,0.03)',
                        transform: active ? 'translateY(-2px)' : 'none',
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0"
                          style={{ background: active ? item.color : `${item.color}22` }}
                        >
                          <Icon size={20} color="#fff" />
                        </div>
                        <div>
                          <div className="font-bold text-[15px]">{item.title}</div>
                          <div className="text-sm text-white/55 mt-1 leading-[1.6]">
                            {item.summary}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#F8FAFC] text-[#0F172A] p-7 md:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-7">
              <div>
                <div className="text-[#E00000] text-xs font-bold tracking-[3px] uppercase mb-2">
                  Live Estimate
                </div>
                <h3 className="text-[30px] font-extrabold leading-[1.1]">Your Recommended Plan</h3>
              </div>
              <div
                className="rounded-[18px] px-4 py-3 text-right"
                style={{ background: `${plan.selectedFocus.color}12` }}
              >
                <div className="text-xs text-[#64748B]">Savings Rate</div>
                <div
                  className="text-2xl font-extrabold"
                  style={{ color: plan.selectedFocus.color }}
                >
                  {plan.savingsRate}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
              {[
                {
                  label: 'Estimated Monthly Savings',
                  value: `$${plan.monthlySavings.toLocaleString()}`,
                  color: '#E00000',
                },
                {
                  label: 'Estimated Annual Savings',
                  value: `$${plan.annualSavings.toLocaleString()}`,
                  color: '#059669',
                },
                {
                  label: 'Recommended Seats',
                  value: `${plan.recommendedSeats} seats`,
                  color: '#2563EB',
                },
                {
                  label: 'Go-Live Timeline',
                  value: `${plan.launchWeeks} weeks`,
                  color: '#D97706',
                },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-sm"
                >
                  <div className="text-sm text-[#64748B] mb-1">{metric.label}</div>
                  <div className="text-[28px] font-extrabold" style={{ color: metric.color }}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[22px] bg-[#0F172A] p-6 text-white mb-6">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <div className="text-white/55 text-sm">Cost Comparison</div>
                  <div className="text-xl font-bold mt-1">Local vs Offshore Team Cost</div>
                </div>
                <Clock3 size={18} color="#FF6A6A" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Local payroll</span>
                    <span className="font-semibold">${plan.monthlyLocal.toLocaleString()} / mo</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-white/80 w-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Offshore delivery</span>
                    <span className="font-semibold">
                      ${plan.monthlyOffshore.toLocaleString()} / mo
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.max(18, (plan.monthlyOffshore / plan.monthlyLocal) * 100)}%`,
                        background: 'linear-gradient(90deg, #E00000, #FF7A7A)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[22px] border border-[#E2E8F0] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={17} color={plan.selectedFocus.color} />
                <div className="text-lg font-bold">Suggested Delivery Stack</div>
              </div>
              <div className="text-[#64748B] leading-[1.75] mb-4">
                {plan.selectedFocus.title} ke liye {plan.shifts} shift model, {plan.leaders} team
                lead aur average offshore payroll ${plan.offshoreSalary.toLocaleString()} per agent
                recommend hota hai taa ke SLA, quality control, aur customer experience stable
                rahain.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {plan.selectedFocus.services.map((service) => (
                  <div
                    key={service}
                    className="rounded-[16px] bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-3 text-sm font-medium"
                  >
                    {service}
                  </div>
                ))}
                <div className="rounded-[16px] bg-[#FFF5F5] border border-[#FFD6D6] px-4 py-3 text-sm font-medium text-[#B42318]">
                  Team lead + QA governance
                </div>
              </div>
              <button
                type="button"
                className="btn-primary px-7 py-3.5 text-[15px]"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Request This Plan <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
