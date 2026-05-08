import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInvoiceState } from '../hooks/useInvoiceState';
import InvoicePreview from '../components/InvoicePreview';
import { ArrowLeft, Printer } from 'lucide-react';

const ViewInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useInvoiceState(id);
  const { loading } = state;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading document...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Action Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm no-print mb-8">
        <div className="max-w-[800px] mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
          >
            <ArrowLeft size={20} /> Back to Dashboard
          </button>
          
          <button 
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Printer size={18} /> Print PDF
          </button>
        </div>
      </div>

      {/* Invoice Document */}
      <InvoicePreview state={state} />
    </div>
  );
};

export default ViewInvoice;
