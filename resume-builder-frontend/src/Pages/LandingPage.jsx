import React from "react";
import { useNavigate } from "react-router-dom";
import Resume1 from "../assets/Resume1.png"; 
import Resume2 from "../assets/Resume2.png"; 
import Resume3 from "../assets/Resume3.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 antialiased selection:bg-red-50 selection:text-red-600">
      
      {/* 1. SAAS NAVIGATION */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => navigate("/")}>
            <div className="bg-red-600 p-2 rounded-xl text-white shadow-lg shadow-red-200 group-hover:scale-105 transition-all">
              <span className="material-symbols-outlined text-xl font-bold">description</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Resume<span className="text-red-600">  Pro</span></h2>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => navigate("/signin")} className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-slate-900 hover:bg-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-md shadow-slate-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative w-full py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">🤖 AI-Powered ATS Analysis</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.3] mb-8 text-slate-900">
              The resume builder <br />
              built for <span className="relative inline-block px-2">
                <span className="relative z-10 text-red-600">modern</span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-red-100 -z-0"></span>
              </span> talent.
            </h1>
            <p className="text-lg text-slate-500 max-w-lg mb-10 leading-relaxed font-medium">
              Don't get lost in the stack. Create a high-performance, ATS-ready A4 resume in minutes with our recruiter-vetted design engine.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={() => navigate("/signup")}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold h-14 px-10 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-red-100 active:scale-95"
              >
                Build My Resume
                <span className="material-symbols-outlined font-bold">arrow_forward</span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3 overflow-hidden">
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User" />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="User" />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User" />
                  <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-white bg-red-600 text-[10px] font-bold text-white">50k+</div>
                </div>
                <div className="text-xs font-bold text-slate-400 leading-tight">Trusted by <br/>Professionals</div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-10 bg-gradient-to-tr from-red-100/30 to-slate-100/30 blur-3xl rounded-full" />
            
            <div className="absolute -bottom-6 -left-6 z-20 bg-white/90 backdrop-blur-xl border border-slate-200 p-5 rounded-3xl shadow-2xl flex items-center gap-4 group-hover:translate-y-[-5px] transition-transform duration-500">
                <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                    <span className="material-symbols-outlined font-bold">analytics</span>
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 leading-none mb-1">✅ ATS Verified</p>
                    <p className="text-lg font-bold text-slate-900 leading-none">98 / 100</p>
                </div>
            </div>

            <div className="relative bg-white aspect-[1/1.414] w-full max-w-[440px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] rounded-lg border border-slate-100 p-12 flex flex-col gap-8 transition-all duration-700 group-hover:border-red-500/20 group-hover:shadow-red-200/20">
              <div className="space-y-3 text-left">
                  <div className="h-1.5 w-12 bg-red-600 rounded-full" />
                  <h4 className="text-3xl font-bold text-slate-900 tracking-tighter text-wrap uppercase">Sarah Jenkins</h4>
                  <p className="text-slate-400 text-sm font-semibold tracking-wide">FULL STACK DEVELOPER</p>
              </div>

              <div className="grid grid-cols-1 gap-8 pt-4 text-left">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">Experience</span>
                        <div className="h-px flex-1 bg-slate-100" />
                    </div>
                    {[1, 2].map(i => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between items-center font-bold text-slate-800 text-xs">
                                <span>Senior Engineer @ Vercel</span>
                                <span className="text-slate-400 font-medium text-[10px]">2022 — 2024</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-50 rounded-full" />
                            <div className="h-1.5 w-5/6 bg-slate-50 rounded-full" />
                        </div>
                    ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

   
<section className="py-24 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 text-center md:text-left">
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold tracking-tight leading-[1.3] text-slate-900 mb-4 uppercase">
          Expertly Crafted <span className="text-red-600 italic">Templates</span>
        </h2>
        <p className="text-slate-500 font-medium  tracking-tight leading-[1.3] uppercase text-xs ">
          Recruiter-approved designs tailored for every industry.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {[
        { name: "The Minimalist", src: Resume1, tag: "Clean" },
        { name: "Modern Executive", src: Resume2, tag: "Professional" },
        { name: "Creative Edge", src: Resume3, tag: "Bold" },
      ].map((tmpl, idx) => (
        <div 
          key={idx} 
          className="group relative flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          {/* Animated Template Container */}
          <div className="relative w-full aspect-[1/1.414] bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl group-hover:shadow-red-200/50 group-hover:border-red-200">
            
            {/* ACTUAL IMAGE INCLUSION */}
            <img 
              src={tmpl.src} 
              alt={tmpl.name} 
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Hover Overlay - Keeping your styling */}
            <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              <div className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl shadow-xl flex items-center gap-2">
                Use Template
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-1 block">
              {tmpl.tag}
             </span>
             <h3 className="text-lg font-bold text-slate-900">{tmpl.name}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* 4. PRICING SECTION */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4 uppercase">Pricing <span className="text-red-600 italic">Plans</span></h2>
          <p className="text-slate-500 font-medium tracking-widest uppercase text-xs">Simple. Honest. Professional.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {[
            { title: "Standard", price: "0", feat: ["1 Resume Slot", "Standard PDF", "Core Templates"], hot: false },
            { title: "Professional", price: "12", feat: ["Unlimited Resumes", "AI Impact Writer", "All Premium Formats"], hot: true },
            { title: "Lifetime", price: "99", feat: ["One-time Payment", "Everything in Pro", "Lifetime Updates"], hot: false }
          ].map((plan, i) => (
            <div key={i} className={`p-10 rounded-[2.5rem] bg-white border border-slate-200 flex flex-col transition-all hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-100/50 ${plan.hot ? 'ring-2 ring-red-600 ring-offset-8 scale-105' : ''}`}>
              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">{plan.title}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight text-slate-900">${plan.price}</span>
                  <span className="text-sm font-bold text-slate-400 uppercase">{plan.price === "99" ? "once" : "/mo"}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.feat.map(f => (
                  <li key={f} className="flex gap-3 text-sm font-semibold text-slate-600 items-center uppercase tracking-tighter">
                    <span className="material-symbols-outlined text-red-500 text-lg font-bold">check</span> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.hot ? 'bg-red-600 text-white hover:bg-red-700 shadow-xl shadow-red-200' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                {plan.hot ? 'Unlock Professional' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. EXPANDED FAQ */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12 uppercase">Frequently Asked <span className="text-red-600 italic">Questions</span></h2>
        <div className="grid gap-4">
          {[
            { q: "Is it really free?", a: "Yes. Our standard plan allows you to create and download one resume completely free of charge." },
            { q: "How does the ATS score work?", a: "We scan your content against a database of 10,000+ job descriptions to ensure your keywords and formatting match recruiter expectations." },
            { q: "Can I download my resume as a PDF?", a: "Absolutely. All resumes are exported in high-resolution, print-ready PDF format to maintain pixel-perfect layouts." },
            { q: "Is my personal data secure?", a: "Your data is encrypted with bank-grade security and never shared with third parties without your explicit permission." }
          ].map((item, i) => (
            <details key={i} className="group border border-slate-100 rounded-2xl bg-white transition-all hover:border-red-500/30">
              <summary className="list-none flex justify-between items-center p-6 cursor-pointer font-bold text-slate-800 text-sm uppercase tracking-widest">
                {item.q}
                <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-red-500 font-bold">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-sm font-medium text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 p-2 rounded-xl text-white">
                <span className="material-symbols-outlined text-sm font-bold">description</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">Resume<span className="text-red-600">  Pro</span></h2>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Built for the future of work.</p>
          </div>
          <nav className="flex gap-10 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-red-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-red-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-red-600 transition-colors">Support</a>
          </nav>
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            © 2026 ResumePro • All Rights Reserved to Arjo Ghosh • 
          </p>
        </div>
      </footer>
    </div>
  );
}