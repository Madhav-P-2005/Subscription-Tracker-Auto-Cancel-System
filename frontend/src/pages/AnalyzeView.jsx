import React from 'react';
import Upload from '../components/Upload';

const AnalyzeView = ({ onUpload }) => {
  return (
    <div className="space-y-8 fade-in">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-white tracking-tight">AI Analyze Center</h1>
        <p className="text-slate-400 mt-2 text-lg">
          Upload your bank statements anonymously. Our Scikit-Learn ML engine will cluster merchants 
          and identify recurring billing patterns automatically.
        </p>
      </div>

      <div className="bg-slate-800/30 border border-slate-700 p-8 rounded-3xl backdrop-blur-sm max-w-4xl">
        <Upload onDataUpload={onUpload} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
         <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-2xl">
            <h3 className="text-white font-semibold mb-2 italic text-sm">Pro Tip: AI Vectorization</h3>
            <p className="text-slate-400 text-sm">
                Our AI uses TF-IDF normalizations, so slightly different merchant names (e.g. "Netflx" vs "Netflix INC") 
                are automatically grouped based on semantic similarity.
            </p>
         </div>
         <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-2xl">
            <h3 className="text-white font-semibold mb-2 italic text-sm">Privacy Guaranteed</h3>
            <p className="text-slate-400 text-sm">
                Your data is parsed locally in the browser before being pushed to your private Firebase cloud.
            </p>
         </div>
      </div>
    </div>
  );
};

export default AnalyzeView;
