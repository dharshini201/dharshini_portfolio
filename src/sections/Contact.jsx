import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import GlassPanel from '../components/GlassPanel';

export default function Contact() {
  const contactInfo = {
    email: 'dharshinithirumurugan2424@gmail.com',
    phone: '+91 9360084723',
    location: 'Dindigul, Tamil Nadu, India',
    github: 'https://github.com/dharshini201',
    linkedin: 'https://linkedin.com/in/dharshini2003',
  };

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setStatus({ submitting: false, submitted: false, error: 'Please fill in all required fields.' });
      return;
    }

    if (!formState.email.includes('@') || !formState.email.includes('.')) {
      setStatus({ submitting: false, submitted: false, error: 'Please enter a valid email address.' });
      return;
    }

    setStatus({ submitting: true, submitted: false, error: '' });

    const subject = encodeURIComponent(
      formState.subject || `Portfolio Message from ${formState.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nSubject: ${formState.subject}\n\nMessage:\n${formState.message}`
    );

    setTimeout(() => {
      window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
      setStatus({ submitting: false, submitted: true, error: '' });
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 py-24 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto">
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/40 text-xs font-mono text-blue-300 tracking-widest uppercase mb-3 shadow-glowCyan">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            NEPTUNE • ORBIT 08
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-orbitron text-white tracking-wide">
            LET'S CONNECT AND <span className="text-space-cyan">BUILD SOMETHING GREAT.</span>
          </h2>
          <p className="text-sm font-mono text-white/50 tracking-wider uppercase mt-1">
            OPEN FOR FULL-STACK DEVELOPER ROLES, FREELANCE & INNOVATION
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <GlassPanel accent="cyan" className="p-6 md:p-8">
              <h3 className="text-xl font-bold font-orbitron text-white mb-2">
                COMMUNICATION ARRAY
              </h3>
              <p className="text-xs md:text-sm text-white/70 font-sans leading-relaxed mb-6">
                Have an inquiry, project proposal, or full-stack software opportunity? Get in touch directly through any channel.
              </p>

              <div className="space-y-3 font-mono text-xs">
                {/* Email */}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-space-cyan hover:bg-space-cyan/10 transition-all text-white group"
                >
                  <div className="p-2 rounded-lg bg-space-cyan/10 text-space-cyan group-hover:scale-110 transition-transform">
                    <Mail size={16} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] text-white/40 uppercase">DIRECT EMAIL</div>
                    <div className="truncate font-medium">{contactInfo.email}</div>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-space-cyan hover:bg-space-cyan/10 transition-all text-white group"
                >
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                    <Github size={16} />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] text-white/40 uppercase">GITHUB REPOSITORIES</div>
                    <div className="font-medium truncate">github.com/dharshini201</div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-space-cyan hover:bg-space-cyan/10 transition-all text-white group"
                >
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                    <Linkedin size={16} />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] text-white/40 uppercase">LINKEDIN PROFILE</div>
                    <div className="font-medium truncate">linkedin.com/in/dharshini2003</div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-space-gold hover:bg-space-gold/10 transition-all text-white group"
                >
                  <div className="p-2 rounded-lg bg-space-gold/10 text-space-gold group-hover:scale-110 transition-transform">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-white/40 uppercase">PHONE / WHATSAPP</div>
                    <div className="font-medium">{contactInfo.phone}</div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-white">
                  <div className="p-2 rounded-lg bg-white/10 text-white/60">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-white/40 uppercase">BASE LOCATION</div>
                    <div className="font-medium">{contactInfo.location}</div>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <GlassPanel accent="cyan" className="p-6 md:p-8">
              <h3 className="text-xl font-bold font-orbitron text-white mb-1">
                TRANSMIT A MESSAGE
              </h3>
              <p className="text-xs text-white/60 font-mono mb-6">
                Launches your configured mail client with prefilled transmission details.
              </p>

              {status.submitted && (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 font-mono text-xs flex items-center gap-2.5 mb-5 shadow-sm">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span>
                    Transmission prefilled and prepared! Your mail application has been opened.
                  </span>
                </div>
              )}

              {status.error && (
                <div className="p-4 rounded-xl bg-red-500/15 border border-red-400/40 text-red-300 font-mono text-xs flex items-center gap-2.5 mb-5">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 font-mono text-[11px] uppercase tracking-wider mb-1.5">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-space-deep/80 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-space-cyan focus:shadow-glowCyan transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 font-mono text-[11px] uppercase tracking-wider mb-1.5">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-space-deep/80 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-space-cyan focus:shadow-glowCyan transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 font-mono text-[11px] uppercase tracking-wider mb-1.5">
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Project Inquiry / Full Stack Role"
                    className="w-full px-4 py-3 rounded-xl bg-space-deep/80 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-space-cyan focus:shadow-glowCyan transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-mono text-[11px] uppercase tracking-wider mb-1.5">
                    MESSAGE *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-space-deep/80 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-space-cyan focus:shadow-glowCyan transition-all font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-space-cyan via-sky-400 to-blue-500 text-space-deep font-bold font-mono text-sm tracking-wider uppercase shadow-glowCyan hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  {status.submitting ? (
                    <>
                      <Sparkles size={16} className="animate-spin-slow" />
                      <span>PREPARING TRANSMISSION...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}

