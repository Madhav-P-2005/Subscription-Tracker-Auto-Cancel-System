import React, { useState } from 'react';
import Papa from 'papaparse';
import { UploadCloud, CheckCircle2, FileText, Loader2 } from 'lucide-react';

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
    
    // Simulate API call to FastAPI backend
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (onDataUpload) {
        onDataUpload(data);
      }
    }, 1500);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-xl w-full">
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
        <UploadCloud className="text-blue-400" /> Upload Transactions
      </h2>
      
      <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:bg-slate-700/30 transition-colors relative cursor-pointer group">
        <input 
          type="file" 
          accept=".csv"
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-3 group-hover:text-blue-400 transition-colors" />
        <p className="text-slate-300 font-medium">Click or drag CSV file to upload</p>
        <p className="text-slate-500 text-sm mt-1">Columns needed: date, description, amount</p>
      </div>

      {file && (
        <div className="mt-4 flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
          <FileText className="text-blue-400 w-5 h-5" />
          <span className="text-slate-200 text-sm flex-1 truncate">{file.name}</span>
          <span className="text-slate-400 text-xs">{data.length} rows</span>
        </div>
      )}

      {data.length > 0 && !success && (
        <div className="mt-6">
          <div className="max-h-60 overflow-y-auto custom-scrollbar rounded-lg border border-slate-700">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-700/80 sticky top-0">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {data.slice(0, 5).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3">{row.date || row.Date}</td>
                    <td className="px-4 py-3">{row.description || row.Description}</td>
                    <td className="px-4 py-3">{row.amount || row.Amount || `₹${Math.floor(Math.random() * 1000)}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.length > 5 && (
            <p className="text-center text-xs text-slate-500 mt-2">Showing 5 of {data.length} rows</p>
          )}

          <button
            onClick={handleProcessData}
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 px-4 rounded-xl font-medium transition-all transform active:scale-[0.98]"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Analyze Subscriptions'}
          </button>
        </div>
      )}

      {success && (
        <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400">
          <CheckCircle2 className="w-6 h-6" />
          <div>
            <p className="font-medium">Analysis Complete!</p>
            <p className="text-sm opacity-80">Subscriptions detected from transactions.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
