import React from 'react';
import { motion } from 'framer-motion';
import Upload from '../components/Upload';
import { HiOutlineLightBulb, HiOutlineShieldCheck, HiOutlineSparkles } from 'react-icons/hi';

const AnalyzeView = ({ onUpload }) => {
  return (
    <div className="space-y-10 pb-20">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="bg-blue-500/10 p-2 rounded-xl border border-blue-500/20">
            <HiOutlineSparkles className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">AI Processing Center</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-black text-white tracking-tight leading-tight"
        >
          Analyze your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Subscriptions</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 mt-6 text-xl leading-relaxed max-w-2xl font-medium"
        >
          Securely upload your statements. Our advanced ML clusters merchants 
          and exposes hidden billing cycles in seconds.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl"
      >
        <Upload onDataUpload={onUpload} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
           className="p-8 border border-slate-800/50 bg-slate-900/20 backdrop-blur-md rounded-[2rem] relative overflow-hidden group"
         >
            <div className="absolute top-0 right-0 p-6 text-slate-800 group-hover:text-blue-500/20 transition-colors">
               <HiOutlineLightBulb className="w-16 h-16" />
            </div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2 relative z-10 text-lg">
               AI Vectorization
            </h3>
            <p className="text-slate-400 leading-relaxed font-medium relative z-10">
                Our AI uses TF-IDF normalizations, ensuring that variations like "Netflx" or "NF* Netflix" 
                are instantly recognized as the same recurring service.
            </p>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="p-8 border border-slate-800/50 bg-slate-900/20 backdrop-blur-md rounded-[2rem] relative overflow-hidden group"
         >
            <div className="absolute top-0 right-0 p-6 text-slate-800 group-hover:text-emerald-500/20 transition-colors">
               <HiOutlineShieldCheck className="w-16 h-16" />
            </div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2 relative z-10 text-lg">
               Local Processing
            </h3>
            <p className="text-slate-400 leading-relaxed font-medium relative z-10">
                Your privacy is paramount. Raw financial data is parsed locally in your browser 
                before reaching our isolated AI analysis engine.
            </p>
         </motion.div>
      </div>
    </div>
  );
};

export default AnalyzeView;
