import React, { useState } from 'react';
import Papa from 'papaparse';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  HiOutlineCloudUpload, 
  HiOutlineCheckCircle, 
  HiOutlineDocumentText, 
  HiOutlineArrowRight,
  HiOutlineRefresh
} from 'react-icons/hi';

const Upload = ({ onDataUpload }) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data);
          setSuccess(false);
        },
      });
    }
  };

  const handleProcessData = async () => {
    if (data.length === 0) return;
    setLoading(true);
    
    try {
      if (onDataUpload) {
        await onDataUpload(data);
      }
      setLoading(false);
      setSuccess(true);
      toast.success("AI Analysis Complete!");
    } catch (error) {
      setLoading(false);
      toast.error("Analysis failed. Please try again.");
    }
  };

  return (
    <div className="bg-slate-800/20 backdrop-blur-3xl border border-slate-700/50 p-10 rounded-[2.5rem] shadow-2xl w-full relative overflow-hidden">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
           <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
             <HiOutlineCloudUpload className="text-blue-500 w-8 h-8" /> 
             Data Import
           </h2>
           <p className="text-slate-500 text-sm font-bold mt-1 uppercase tracking-widest">Supports .CSV statements</p>
        </div>
        
        {file && (
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex items-center gap-4 bg-slate-900/60 p-3 pr-5 rounded-2xl border border-blue-500/20 shadow-lg"
           >
              <div className="bg-blue-500/10 p-2 rounded-xl">
                 <HiOutlineDocumentText className="text-blue-400 w-6 h-6" />
              </div>
              <div className="flex flex-col min-w-0 max-w-[150px]">
                 <span className="text-white text-sm font-black truncate">{file.name}</span>
                 <span className="text-slate-500 text-[0.65rem] font-bold uppercase">{data.length} records detected</span>
              </div>
           </motion.div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!data.length || success ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`group relative h-64 border-4 border-dashed rounded-[2rem] flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden
              ${success ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-800 hover:border-blue-500/30 bg-slate-900/20 hover:bg-slate-900/40'}
            `}
          >
            <input 
              type="file" 
              accept=".csv"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            
            {success ? (
               <motion.div 
                 initial={{ scale: 0.8 }} 
                 animate={{ scale: 1 }} 
                 className="flex flex-col items-center"
               >
                  <div className="bg-emerald-500 rounded-full p-4 mb-4 shadow-xl shadow-emerald-500/20">
                    <HiOutlineCheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white text-glow">Analysis Locked In</h3>
                  <p className="text-emerald-400/80 font-bold mt-2 uppercase tracking-widest text-xs">AI clusters successfully identified</p>
                  <button 
                    onClick={() => { setFile(null); setData([]); setSuccess(false); }}
                    className="mt-6 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-widest relative z-30"
                  >
                    <HiOutlineRefresh className="w-4 h-4" /> Reset
                  </button>
               </motion.div>
            ) : (
               <>
                  <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500 shadow-2xl">
                    <HiOutlineCloudUpload className="w-10 h-10 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight">Drop statements here</h3>
                  <p className="text-slate-500 text-sm mt-2 font-medium">or click to browse local files</p>
                  <div className="mt-6 flex gap-4">
                     <span className="px-3 py-1 bg-slate-800/80 rounded-lg text-[0.6rem] font-black text-slate-400 uppercase tracking-tighter">DATE</span>
                     <span className="px-3 py-1 bg-slate-800/80 rounded-lg text-[0.6rem] font-black text-slate-400 uppercase tracking-tighter">DESC</span>
                     <span className="px-3 py-1 bg-slate-800/80 rounded-lg text-[0.6rem] font-black text-slate-400 uppercase tracking-tighter">AMT</span>
                  </div>
               </>
            )}
            
            {/* Background decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-colors"></div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/40 overflow-hidden shadow-inner max-h-96 flex flex-col">
               <div className="overflow-y-auto custom-scrollbar flex-1">
                 <table className="w-full text-left relative">
                    <thead className="bg-slate-800/50 sticky top-0 z-10 backdrop-blur-md">
                      <tr>
                        <th className="px-8 py-5 text-[0.65rem] font-black text-slate-500 uppercase tracking-widest">Entry Date</th>
                        <th className="px-8 py-5 text-[0.65rem] font-black text-slate-500 uppercase tracking-widest">Description</th>
                        <th className="px-8 py-5 text-[0.65rem] font-black text-slate-500 uppercase tracking-widest text-right">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {data.map((row, idx) => (
                        <tr key={idx} className="group/row transition-colors hover:bg-slate-800/30">
                          <td className="px-8 py-4 font-mono text-[0.8rem] text-slate-400 group-hover/row:text-slate-200">{row.date || row.Date}</td>
                          <td className="px-8 py-4 text-sm font-bold text-slate-300 group-hover/row:text-white truncate max-w-[200px]">{row.description || row.Description}</td>
                          <td className="px-8 py-4 text-sm font-black text-white text-right">₹{row.amount || row.Amount || '0'}</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>

            <button
              onClick={handleProcessData}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-blue-50 text-slate-950 py-5 px-8 rounded-2xl font-black text-lg transition-all active:scale-[0.98] shadow-2xl shadow-white/5 group overflow-hidden relative"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-4 border-slate-900/20 border-t-slate-900 rounded-full animate-spin" />
                  <span className="relative z-10">Clustering data...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10 transition-transform group-hover:translate-x-[-4px]">Execute AI Analysis</span>
                  <HiOutlineArrowRight className="w-6 h-6 relative z-10 transition-transform group-hover:translate-x-2" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Upload;
