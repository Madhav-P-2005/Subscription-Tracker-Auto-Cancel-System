import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiOutlineCloudUpload,
  HiOutlineShieldCheck, 
  HiOutlineLightningBolt, 
  HiOutlineSparkles,
  HiOutlineChip,
  HiOutlineCreditCard,
  HiOutlineBell,
  HiOutlineArrowRight,
  HiOutlineViewGrid
} from 'react-icons/hi';
import { FaGithub, FaInstagram, FaCode } from 'react-icons/fa';
import { Activity } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800/50 backdrop-blur-xl hover:border-blue-500/30 transition-all group"
  >
    <div className="bg-blue-600/10 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
      <Icon className="w-8 h-8 text-blue-500" />
    </div>
    <h3 className="text-xl font-black text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-slate-400 leading-relaxed font-medium">{description}</p>
  </motion.div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Decorative Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-2xl shadow-xl shadow-blue-500/20">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            Track<span className="text-blue-500">MySub</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Login</Link>
          <Link to="/signup" className="bg-white text-[#020617] px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl shadow-white/5 active:scale-95">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6 max-w-7xl mx-auto text-center md:text-left grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-8"
          >
            <HiOutlineSparkles className="text-blue-400 w-5 h-5" />
            <span className="text-blue-400 text-xs font-black uppercase tracking-widest">FinTech Excellence</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8"
          >
            Master Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-glow">Subscriptions.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl md:text-2xl font-medium leading-relaxed max-w-xl mb-12"
          >
            Users often forget recurring expenses, leading to unnecessary spending. Our AI system detects, tracks, and allows you to cancel subscriptions in one click.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link to="/signup" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-[#020617] px-8 py-5 rounded-3xl font-black text-lg hover:bg-blue-50 transition-all active:scale-95 shadow-2xl shadow-white/5 group">
              Start Free Analysis
              <HiOutlineArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto text-slate-500 hover:text-white font-black uppercase tracking-widest text-sm transition-all py-5 px-8">Learn Methodology</a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative lg:block hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-[100px] rounded-full"></div>
          
          <div className="relative bg-[#020617]/90 backdrop-blur-3xl border border-slate-800/80 p-6 rounded-[3rem] shadow-[0_0_60px_-15px_rgba(59,130,246,0.2)] overflow-hidden active-glow aspect-square md:aspect-[4/3] flex flex-col justify-between transform rotate-2 hover:rotate-0 transition-transform duration-700">
             {/* Mockup Header */}
             <div className="flex justify-between items-center px-2 py-2 border-b border-slate-800/80 pb-4">
                <div className="flex gap-2.5">
                   <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                   <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                   <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
                <div className="h-6 w-32 bg-slate-800/60 rounded-full"></div>
             </div>
             
             {/* Mockup Content */}
             <div className="flex-1 flex flex-col gap-5 mt-6 relative z-10 w-full">
                <div className="flex gap-4">
                  <div className="flex-1 bg-slate-800/40 rounded-3xl p-5 border border-slate-700/50 shadow-inner">
                     <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-500/30">
                        <HiOutlineViewGrid className="w-6 h-6 text-blue-400" />
                     </div>
                     <div className="w-2/3 h-3 bg-slate-600/50 rounded-full mb-3"></div>
                     <div className="w-full h-6 bg-slate-300/80 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-slate-800/40 rounded-3xl p-5 border border-slate-700/50 shadow-inner">
                     <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-4 border border-indigo-500/30">
                        <HiOutlineCreditCard className="w-6 h-6 text-indigo-400" />
                     </div>
                     <div className="w-2/3 h-3 bg-slate-600/50 rounded-full mb-3"></div>
                     <div className="w-full h-6 bg-slate-300/80 rounded-full"></div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  {[
                    { color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
                    { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                    { color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" }
                  ].map((style, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-2xl border border-slate-700/40 backdrop-blur-md">
                       <div className="flex items-center gap-4 w-2/3">
                          <div className={`w-12 h-12 rounded-[1rem] ${style.bg} ${style.border} border flex shrink-0 items-center justify-center`}>
                             <div className={`w-5 h-5 rounded-full ${style.bg.replace('/10', '/50')}`}></div>
                          </div>
                          <div className="w-full">
                             <div className="w-full max-w[120px] h-4 bg-slate-400/80 rounded-full mb-2"></div>
                             <div className="w-2/3 h-3 bg-slate-600/60 rounded-full"></div>
                          </div>
                       </div>
                       <div className={`w-20 h-8 ${style.bg} rounded-xl border ${style.border} shrink-0`}></div>
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent pointer-events-none z-20"></div>
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="relative z-10 py-32 px-6 border-y border-slate-800/50 bg-slate-950/40 divide-y divide-slate-800/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center mb-32">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-8">
              The <span className="text-rose-500">Problem</span> Statement
            </h2>
            <p className="text-slate-400 text-xl leading-relaxed font-medium mb-10">
              In a digital-first economy, subscriptions are the new invisible tax. Services are designed to keep you paying long after you've stopped using them.
            </p>
            <div className="space-y-6">
              {[
                "Unintentional recurring payments (OTT, apps, trials)",
                "Fragmented billing cycles across multiple providers",
                "Complex cancellation paths designed to frustrate"
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="bg-rose-500/10 p-2 rounded-lg shrink-0 mt-1">
                    <HiOutlineArrowRight className="w-4 h-4 text-rose-500" />
                  </div>
                  <p className="text-slate-200 font-bold">{item}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-900/40 border border-slate-800/50 p-12 rounded-[3.5rem] relative">
             <div className="absolute top-0 right-0 p-12 text-blue-500/10">
                <HiOutlineShieldCheck className="w-40 h-40" />
             </div>
             <p className="text-slate-500 uppercase font-black tracking-widest text-xs mb-4">Our Mission</p>
             <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Financial Empowerment</h3>
             <p className="text-slate-400 text-lg leading-relaxed font-medium">
               Our primary objective is to provide professional-grade tools to identify recurring spending, manage billing portfolios, and eliminate unnecessary expenses with a single click.
             </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Core Infrastructure Features</h2>
          <p className="text-slate-500 text-lg font-bold uppercase tracking-[0.3em]">Full Spectrum Control</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            delay={0.1}
            icon={HiOutlineCloudUpload}
            title="Seamless Ingestion"
            description="Securely upload or import transaction history from any major banking statement format."
          />
          <FeatureCard 
            delay={0.2}
            icon={HiOutlineChip}
            title="AI Pattern Detection"
            description="Advanced ML clusters merchants and flags recurring payments across weekly and monthly cycles."
          />
          <FeatureCard 
            delay={0.3}
            icon={HiOutlineViewGrid}
            title="Central Dashboard"
            description="Unified view of active subscriptions, total burn rate, and projected yearly expenses."
          />
          <FeatureCard 
            delay={0.4}
            icon={HiOutlineBell}
            title="Renewal Intelligence"
            description="Real-time notifications (SMS/Email) via Twilio ensure you never miss a billing cycle update."
          />
          <FeatureCard 
            delay={0.5}
            icon={HiOutlineLightningBolt}
            title="Auto-Cancel System"
            description="Execute cancellation protocols instantly through our automated simulation engine."
          />
          <FeatureCard 
            delay={0.6}
            icon={HiOutlineShieldCheck}
            title="Privacy Centric"
            description="Secure data processing and stateless analysis ensuring your transaction history remains completely private."
          />
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="relative z-10 py-32 px-6 bg-blue-600/5 border-y border-blue-500/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-20 text-center">3 Steps to Financial Freedom</h2>
          
          <div className="grid lg:grid-cols-3 gap-12 w-full">
            {[
              { step: "01", title: "Import Data", desc: "Upload your transaction CSV. Our system handles data parsing locally for privacy." },
              { step: "02", title: "AI Analysis", desc: "Our engine vectorizes transactions to identify recurring subscription patterns." },
              { step: "03", title: "Take Control", desc: "Use our dashboard to monitor, track alerts, or execute auto-cancellations." }
            ].map((item, i) => (
              <div key={i} className="relative p-12 bg-slate-900/50 rounded-[3rem] border border-slate-800/50 group hover:border-blue-500/40 transition-all">
                <span className="text-7xl font-black text-blue-500/10 absolute top-8 left-8 group-hover:text-blue-500/20 transition-colors">{item.step}</span>
                <div className="relative z-10 mt-12">
                   <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
                   <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-none">
            Ready to <span className="text-blue-500">Stop the Drain?</span>
          </h2>
          <p className="text-slate-400 text-xl font-medium mb-12">Start your subscription audit today. It takes less than 60 seconds.</p>
          <Link to="/signup" className="inline-flex items-center gap-4 bg-white text-[#020617] px-12 py-6 rounded-[2rem] font-black text-2xl hover:bg-blue-50 transition-all active:scale-95 shadow-2xl shadow-white/10">
            Create Free Account
          </Link>
          <p className="text-slate-600 font-bold uppercase tracking-widest text-xs mt-10 opacity-50">Enterprise-Grade Infrastructure • Secure Processing</p>
        </div>
      </section>

      <footer className="relative z-10 py-24 px-6 mt-10 overflow-hidden border-t border-slate-800/80 bg-slate-950/50 relative">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[200px] bg-blue-500/10 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center relative z-10">
          <div className="inline-flex items-center justify-center gap-3 bg-slate-900/60 border border-slate-800/80 px-8 py-4 rounded-full backdrop-blur-md mb-16 shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:border-blue-500/30 transition-all cursor-default group">
             <div className="bg-blue-500/20 p-2 rounded-full group-hover:bg-blue-500/30 transition-all">
                <FaCode className="w-5 h-5 text-blue-400" />
             </div>
             <span className="text-white font-black tracking-[0.3em] uppercase text-sm">Team Hack Horizon</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 mb-20 w-full max-w-4xl">
             {/* Dev 1 */}
             <div className="flex flex-col items-center gap-4 group">
                <div className="w-24 h-24 rounded-full bg-slate-800/50 border border-slate-700/50 p-1.5 group-hover:border-blue-500/50 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-500">
                   <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="text-3xl font-black text-slate-500 group-hover:text-blue-400 transition-colors z-10">MP</span>
                   </div>
                </div>
                <div className="text-center">
                   <h4 className="text-white font-bold tracking-wide text-lg group-hover:text-blue-400 transition-colors">Madhav P</h4>
                   <div className="flex items-center justify-center gap-3 mt-4">
                     <a href="https://github.com/Madhav-P-2005" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors bg-slate-800/40 border border-slate-700/50 p-2.5 rounded-xl hover:bg-slate-700 hover:border-slate-500 shadow-inner group/icon">
                       <FaGithub className="w-5 h-5 group-hover/icon:scale-110 transition-transform" />
                     </a>
                     <a href="https://www.instagram.com/madhavp_14/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-rose-400 transition-colors bg-slate-800/40 border border-slate-700/50 p-2.5 rounded-xl hover:bg-rose-500/10 hover:border-rose-500/30 shadow-inner group/icon">
                       <FaInstagram className="w-5 h-5 group-hover/icon:scale-110 transition-transform" />
                     </a>
                   </div>
                </div>
             </div>
             
             {/* Dev 2 */}
             <div className="flex flex-col items-center gap-4 group">
                <div className="w-24 h-24 rounded-full bg-slate-800/50 border border-slate-700/50 p-1.5 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-all duration-500 cursor-default">
                   <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="text-3xl font-black text-slate-500 group-hover:text-indigo-400 transition-colors z-10">RB</span>
                   </div>
                </div>
                <div className="text-center">
                   <h4 className="text-white font-bold tracking-wide text-lg group-hover:text-indigo-400 transition-colors">Ramnath Bhat</h4>
                   <p className="text-slate-600 text-[0.65rem] font-black uppercase tracking-[0.2em] mt-3">Developer</p>
                </div>
             </div>

             {/* Dev 3 */}
             <div className="flex flex-col items-center gap-4 group">
                <div className="w-24 h-24 rounded-full bg-slate-800/50 border border-slate-700/50 p-1.5 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-500 cursor-default">
                   <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="text-3xl font-black text-slate-500 group-hover:text-emerald-400 transition-colors z-10">VG</span>
                   </div>
                </div>
                <div className="text-center">
                   <h4 className="text-white font-bold tracking-wide text-lg group-hover:text-emerald-400 transition-colors">Vinay G B</h4>
                   <p className="text-slate-600 text-[0.65rem] font-black uppercase tracking-[0.2em] mt-3">Developer</p>
                </div>
             </div>

             {/* Dev 4 */}
             <div className="flex flex-col items-center gap-4 group">
                <div className="w-24 h-24 rounded-full bg-slate-800/50 border border-slate-700/50 p-1.5 group-hover:border-amber-500/50 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all duration-500 cursor-default">
                   <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="text-3xl font-black text-slate-500 group-hover:text-amber-400 transition-colors z-10">MR</span>
                   </div>
                </div>
                <div className="text-center">
                   <h4 className="text-white font-bold tracking-wide text-lg group-hover:text-amber-400 transition-colors">Mayur</h4>
                   <p className="text-slate-600 text-[0.65rem] font-black uppercase tracking-[0.2em] mt-3">Developer</p>
                </div>
             </div>
          </div>

          <div className="flex flex-col items-center gap-2 mt-8">
            <div className="flex items-center gap-3 opacity-40">
              <Activity className="w-4 h-4 text-slate-400" />
              <p className="text-slate-400 font-bold block text-[0.7rem] tracking-[0.3em] uppercase">Powered by Advanced Machine Learning</p>
            </div>
            <div className="opacity-30 flex items-center gap-2">
              <p className="text-slate-500 font-black block text-[0.6rem] tracking-[0.2em] uppercase text-center">
                 Proudly represented by KLE's BCA P.C Jabins College, Hubballi
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;