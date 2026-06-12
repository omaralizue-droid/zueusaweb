'use client';
import { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', company: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-[120px] px-10 bg-[#F8FAFC]">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-[70px]">
          <div className="text-[#E00000] font-bold text-xs tracking-[3px] uppercase mb-3.5">
            Contact Us
          </div>
          <h2
            className="font-extrabold text-[#0F172A] mb-4"
            style={{ fontSize: 'clamp(2rem,4vw,3.4rem)' }}
          >
            Let's Talk About Your
            <br />
            <span className="text-[#E00000]">Business Needs</span>
          </h2>
        </div>
        <div className="flex gap-[60px] flex-wrap">
          <div className="flex-[1_1_280px]">
            <div className="flex flex-col gap-4 mb-7">
              {[
                {
                  icon: Phone,
                  label: 'Call Us',
                  value: '+92 2133329280',
                  href: 'tel:+922133329280',
                },
                {
                  icon: Mail,
                  label: 'Email Us',
                  value: 'careers@zueusa.com',
                  href: 'mailto:careers@zueusa.com',
                },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <a
                    key={i}
                    href={c.href}
                    className="flex gap-4 items-start bg-white border-[1.5px] border-[#E2E8F0] rounded-[14px] p-[18px_22px] no-underline text-inherit shadow-sm hover:border-[#E00000] hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-[42px] h-[42px] rounded-[10px] bg-[#E0000010] border border-[#E0000025] flex items-center justify-center flex-shrink-0">
                      <Icon size={18} color="#E00000" />
                    </div>
                    <div>
                      <div className="text-xs text-[#94A3B8] mb-0.5">{c.label}</div>
                      <div className="font-semibold text-[#0F172A]">{c.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>
            <div className="bg-white border-[1.5px] border-[#E2E8F0] rounded-[14px] p-[20px_22px] shadow-sm">
              <div className="flex gap-3.5 items-start">
                <div className="w-[42px] h-[42px] rounded-[10px] bg-[#E0000010] border border-[#E0000025] flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} color="#E00000" />
                </div>
                <div>
                  <div className="text-xs text-[#94A3B8] mb-2">Find Us</div>
                  <div className="font-bold text-[#0F172A] mb-1">Headquarters</div>
                  <div className="text-[#64748B] text-sm mb-3">Washington DC, USA</div>
                  <div className="font-bold text-[#0F172A] mb-1">Regional Offices</div>
                  <div className="text-[#64748B] text-sm">
                    Karachi, Pakistan
                    <br />
                    Manila, Philippines
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[2_1_400px]">
            {sent ? (
              <div className="text-center py-20 px-10 bg-white border-[1.5px] border-[#E2E8F0] rounded-[22px] shadow-md">
                <CheckCircle size={60} color="#E00000" className="mx-auto mb-5" />
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2.5">Message Sent!</h3>
                <p className="text-[#64748B]">We'll get back to you shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border-[1.5px] border-[#E2E8F0] rounded-[22px] p-[40px_36px] shadow-md flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[13px] font-semibold text-[#1F2937] block mb-2">
                      Your Name
                    </label>
                    <input
                      className="zue-input"
                      required
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-semibold text-[#1F2937] block mb-2">
                      Email Address
                    </label>
                    <input
                      className="zue-input"
                      required
                      type="email"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#1F2937] block mb-2">
                    Company
                  </label>
                  <input
                    className="zue-input"
                    placeholder="Your Company Name"
                    value={form.company}
                    onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#1F2937] block mb-2">
                    Message
                  </label>
                  <textarea
                    className="zue-input resize-y"
                    required
                    rows={5}
                    placeholder="Tell us about your business needs..."
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  />
                </div>
                <button type="submit" className="btn-primary py-4 text-base justify-center">
                  Send Message <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
