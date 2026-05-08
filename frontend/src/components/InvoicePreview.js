import React from 'react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const InvoicePreview = ({ state }) => {
  const { invoice, calculations } = state;
  const { subtotal, discountAmount, taxAmount, total } = calculations;

  return (
    <div className="bg-white min-h-full page-break p-12 max-w-[800px] mx-auto text-slate-800">
      <div className="w-full">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-12 pb-8 border-b-2 border-slate-200">
          <div>
            <h1 className="text-4xl font-bold tracking-widest text-indigo-600 mb-6">INVOICE</h1>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <span className="font-semibold text-slate-500 w-24">Invoice #</span>
                <span className="font-medium text-slate-900">{invoice.invoiceNumber || '—'}</span>
              </div>
              <div className="flex gap-4">
                <span className="font-semibold text-slate-500 w-24">Issue Date</span>
                <span className="font-medium text-slate-900">{formatDate(invoice.issueDate) || '—'}</span>
              </div>
              <div className="flex gap-4">
                <span className="font-semibold text-slate-500 w-24">Due Date</span>
                <span className="font-medium text-slate-900">{formatDate(invoice.dueDate) || '—'}</span>
              </div>
            </div>
          </div>
          <div className="text-right max-w-[300px]">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{invoice.biller.name || 'Your Company Name'}</h2>
            <div className="text-slate-500 leading-relaxed">
              {invoice.biller.address && <p>{invoice.biller.address}</p>}
              {invoice.biller.email && <p>{invoice.biller.email}</p>}
              {invoice.biller.phone && <p>{invoice.biller.phone}</p>}
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Bill To:</h3>
          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">{invoice.client.name || 'Client Name'}</h4>
            <div className="text-slate-500 leading-relaxed">
              {invoice.client.address && <p>{invoice.client.address}</p>}
              {invoice.client.email && <p>{invoice.client.email}</p>}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white !print-bg-indigo-100 !print-text-slate-900">
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold text-center">Qty</th>
                <th className="p-4 font-semibold text-right">Price</th>
                <th className="p-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id || item._id} className="border-b border-slate-200">
                  <td className="p-4 align-top">{item.description || 'Item description'}</td>
                  <td className="p-4 align-top text-center">{item.quantity}</td>
                  <td className="p-4 align-top text-right">{formatCurrency(item.unitPrice)}</td>
                  <td className="p-4 align-top text-right font-medium text-slate-900">{formatCurrency(item.quantity * item.unitPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex justify-between gap-8">
          <div className="flex-1">
            {invoice.notes && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Notes / Terms</h3>
                <p className="text-slate-500 whitespace-pre-wrap text-sm leading-relaxed">{invoice.notes}</p>
              </div>
            )}
          </div>
          <div className="w-[300px]">
            <div className="flex justify-between py-3 border-b border-slate-200 text-slate-700">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900">{formatCurrency(subtotal)}</span>
            </div>
            {invoice.discountPercentage > 0 && (
              <div className="flex justify-between py-3 border-b border-slate-200 text-red-500">
                <span>Discount ({invoice.discountPercentage}%)</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            {invoice.taxPercentage > 0 && (
              <div className="flex justify-between py-3 border-b border-slate-200 text-slate-700">
                <span>Tax ({invoice.taxPercentage}%)</span>
                <span className="font-medium text-slate-900">{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between py-4 mt-2 border-t-2 border-slate-900 text-xl font-bold">
              <span className="text-slate-900">Total</span>
              <span className="text-indigo-600">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InvoicePreview;
