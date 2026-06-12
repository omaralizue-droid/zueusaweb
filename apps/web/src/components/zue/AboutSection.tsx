'use client';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-[120px] px-10 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto flex gap-20 items-center flex-wrap">
        <div className="flex-[1_1_400px]">
          <div className="text-[#E00000] font-bold text-xs tracking-[3px] uppercase mb-3.5">
            Who We Are
          </div>
          <h2
            className="font-extrabold text-[#0F172A] mb-5 leading-[1.2]"
            style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}
          >
            Empowering Businesses
            <br />
            Through Outsourcing
            <br />
            <span className="text-[#E00000]">& Offshoring</span>
          </h2>
          <p className="text-[#64748B] text-[17px] leading-[1.9] mb-9">
            ZUE is a leading Business Process Outsourcing (BPO) company dedicated to driving
            operational excellence for companies across the United States. With a strong foundation
            in the Healthcare industry, we also proudly serve Real Estate, Law Firms, Technology,
            and a wide range of service-based businesses.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-10">
            {[
              { label: 'Years Experience', value: '10+' },
              { label: 'Team Members', value: '200+' },
              { label: 'Countries', value: '3' },
              { label: 'Industries Served', value: '5+' },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white border-[1.5px] border-[#E2E8F0] rounded-[14px] p-[20px_22px] shadow-sm"
              >
                <div className="text-[26px] font-extrabold text-[#E00000]">{s.value}</div>
                <div className="text-[13px] text-[#64748B] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <button className="btn-primary px-9 py-3.5 text-[15px]">
            Learn More <ArrowRight size={16} />
          </button>
        </div>
        <div className="flex-[1_1_400px] relative">
          <div
            className="rounded-[24px] overflow-hidden border-2 border-[#E2E8F0] shadow-xl"
            style={{ animation: 'floatY 6s ease-in-out infinite' }}
          >
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
              alt="ZUE Team"
              className="w-full block object-cover"
            />
          </div>
          <div
            className="absolute -bottom-5 -left-5 bg-[#E00000] rounded-[18px] p-[18px_22px] shadow-lg text-white"
            style={{ animation: 'pulseRed 3s ease-in-out infinite' }}
          >
            <div className="text-[26px] font-extrabold">98%</div>
            <div className="text-xs opacity-90 mt-0.5">Client Satisfaction</div>
          </div>
          <div className="absolute -top-5 -right-5 bg-[#0F172A] rounded-[14px] p-[14px_18px] shadow-lg text-white">
            <div className="text-xl font-extrabold">500+</div>
            <div className="text-[11px] opacity-75 mt-0.5">Clients Worldwide</div>
          </div>
        </div>
      </div>
    </section>
  );
}
