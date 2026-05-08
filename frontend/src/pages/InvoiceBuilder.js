import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInvoiceState } from '../hooks/useInvoiceState';
import InvoiceForm from '../components/InvoiceForm';
import InvoicePreview from '../components/InvoicePreview';
import { Save, Printer, ArrowLeft, Loader2 } from 'lucide-react';

const InvoiceBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useInvoiceState(id);
  const { invoice, saveInvoice, loading } = state;

  // Auto-save draft every 10 seconds if modified
  useEffect(() => {
    const timer = setInterval(() => {
      saveInvoice();
    }, 10000);
    return () => clearInterval(timer);
  }, [invoice, saveInvoice]);

  const handleSave = async () => {
    await saveInvoice();
    navigate('/');
  };

  const handlePrint = async () => {
    await saveInvoice();
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header toolbar (Hidden when printing) */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm no-print">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <button 
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={18} /> Back to Dashboard
            </button>
            <h1 className="text-xl font-bold text-slate-900 m-0">
              {id ? 'Edit Invoice' : 'Create New Invoice'}
            </h1>
          </div>
          <div className="flex gap-3">
            <button 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm"
              onClick={handleSave}
            >
              <Save size={18} /> Save Draft
            </button>
            <button 
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
              onClick={handlePrint}
            >
              <Printer size={18} /> Print / PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Workspace */}
      <div className="flex flex-col lg:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto w-full flex-1 no-print">
        <div className="flex-1 lg:max-w-[60%] w-full">
          <InvoiceForm state={state} />
        </div>
        <div className="flex-1 lg:max-w-[40%] w-full lg:sticky lg:top-[90px] lg:h-[calc(100vh-120px)] lg:overflow-y-auto rounded-xl shadow-lg border border-slate-200 bg-white custom-scrollbar">
          <InvoicePreview state={state} />
        </div>
      </div>

      {/* Print Only Container */}
      <div className="print-only">
        <InvoicePreview state={state} />
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default InvoiceBuilder;
