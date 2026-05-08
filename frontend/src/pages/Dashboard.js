import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, FileText } from 'lucide-react';
import * as api from '../services/api';

const formatDate = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatCurrency = (amount, currencyCode = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      const data = await api.getInvoices();
      setInvoices(data);
    } catch (error) {
      console.error("Failed to load invoices", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteInvoice = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await api.deleteInvoice(id);
        setInvoices(invoices.filter(inv => inv._id !== id));
      } catch (error) {
        console.error("Failed to delete invoice", error);
      }
    }
  };

  const calculateTotal = (invoice) => {
    const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const discountAmount = subtotal * (invoice.discountPercentage / 100);
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * (invoice.taxPercentage / 100);
    return taxableAmount + taxAmount;
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:align-items-center mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Invoices</h1>
          <p className="text-slate-500 m-0">Manage and track your generated invoices.</p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          onClick={() => navigate('/create')}
        >
          <Plus size={20} /> Create New Invoice
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <p className="text-slate-500">Loading invoices...</p>
          </div>
        ) : invoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center h-full">
            <FileText size={48} className="text-slate-300 mb-6" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Invoices Yet</h3>
            <p className="text-slate-500 mb-8 max-w-md">Create your first invoice to see it listed here.</p>
            <button
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              onClick={() => navigate('/create')}
            >
              Create Invoice
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-semibold text-slate-500 text-sm">Invoice</th>
                  <th className="p-4 font-semibold text-slate-500 text-sm">Client</th>
                  <th className="p-4 font-semibold text-slate-500 text-sm">Issue Date</th>
                  <th className="p-4 font-semibold text-slate-500 text-sm">Amount</th>
                  <th className="p-4 font-semibold text-slate-500 text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice._id} className="border-b border-slate-200 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{invoice.invoiceNumber || 'Draft'}</td>
                    <td className="p-4 text-slate-600">{invoice.client.name || 'Unknown Client'}</td>
                    <td className="p-4 text-slate-600">{formatDate(invoice.issueDate)}</td>
                    <td className="p-4 font-semibold text-indigo-600">{formatCurrency(calculateTotal(invoice), invoice.currency)}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                          title="Edit Invoice"
                          onClick={() => navigate(`/edit/${invoice._id}`)}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete Invoice"
                          onClick={() => deleteInvoice(invoice._id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
