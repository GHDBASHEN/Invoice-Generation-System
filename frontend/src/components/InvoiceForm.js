import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const InputLabel = ({ children }) => (
  <label className="block text-sm font-medium text-slate-700 mb-1">{children}</label>
);

const InputField = ({ ...props }) => (
  <input 
    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-colors disabled:opacity-75 disabled:bg-slate-200 disabled:cursor-not-allowed"
    {...props} 
  />
);

const TextArea = ({ ...props }) => (
  <textarea 
    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-colors resize-y disabled:opacity-75 disabled:bg-slate-200 disabled:cursor-not-allowed"
    {...props} 
  />
);

const SelectField = ({ children, ...props }) => (
  <select 
    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-colors disabled:opacity-75 disabled:bg-slate-200 disabled:cursor-not-allowed"
    {...props}
  >
    {children}
  </select>
);

const InvoiceForm = ({ state }) => {
  const {
    invoice,
    updateBiller,
    updateClient,
    updateMetadata,
    addItem,
    removeItem,
    updateItem
  } = state;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 m-0">Invoice Details</h2>
      </div>
      <div className="p-6">
        
        {/* Metadata Section */}
        <div className="pb-8 mb-8 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <InputLabel>Invoice Number</InputLabel>
              <InputField
                type="text"
                value={invoice.invoiceNumber}
                readOnly
                disabled
                placeholder="Auto-generated"
              />
            </div>
            <div>
              <InputLabel>Currency</InputLabel>
              <SelectField
                value={invoice.currency || 'USD'}
                onChange={(e) => updateMetadata('currency', e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="CAD">CAD ($)</option>
                <option value="AUD">AUD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="CNY">CNY (¥)</option>
                <option value="LKR">LKR (Rs)</option>
              </SelectField>
            </div>
            <div>
              <InputLabel>Issue Date</InputLabel>
              <InputField
                type="date"
                value={invoice.issueDate}
                onChange={(e) => updateMetadata('issueDate', e.target.value)}
              />
            </div>
            <div>
              <InputLabel>Due Date</InputLabel>
              <InputField
                type="date"
                value={invoice.dueDate}
                onChange={(e) => updateMetadata('dueDate', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Parties Section */}
        <div className="pb-8 mb-8 border-b border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Biller */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-lg font-semibold text-indigo-600 mb-4">Biller Details</h3>
            <div className="space-y-4">
              <div>
                <InputLabel>Name / Company</InputLabel>
                <InputField
                  type="text"
                  value={invoice.biller.name}
                  onChange={(e) => updateBiller('name', e.target.value)}
                  placeholder="Your company name"
                />
              </div>
              <div>
                <InputLabel>Address</InputLabel>
                <TextArea
                  rows="2"
                  value={invoice.biller.address}
                  onChange={(e) => updateBiller('address', e.target.value)}
                  placeholder="Your address"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <InputLabel>Email</InputLabel>
                  <InputField
                    type="email"
                    value={invoice.biller.email}
                    onChange={(e) => updateBiller('email', e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <InputLabel>Phone</InputLabel>
                  <InputField
                    type="text"
                    value={invoice.biller.phone}
                    onChange={(e) => updateBiller('phone', e.target.value)}
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Client */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-lg font-semibold text-indigo-600 mb-4">Client Details</h3>
            <div className="space-y-4">
              <div>
                <InputLabel>Name / Company</InputLabel>
                <InputField
                  type="text"
                  value={invoice.client.name}
                  onChange={(e) => updateClient('name', e.target.value)}
                  placeholder="Client's name"
                />
              </div>
              <div>
                <InputLabel>Address</InputLabel>
                <TextArea
                  rows="2"
                  value={invoice.client.address}
                  onChange={(e) => updateClient('address', e.target.value)}
                  placeholder="Client's address"
                />
              </div>
              <div>
                <InputLabel>Email</InputLabel>
                <InputField
                  type="email"
                  value={invoice.client.email}
                  onChange={(e) => updateClient('email', e.target.value)}
                  placeholder="client@example.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="pb-8 mb-8 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Line Items</h3>
          <div className="space-y-3 mb-4">
            {invoice.items.map((item, index) => (
              <div key={item.id} className="flex flex-wrap sm:flex-nowrap items-end gap-4">
                <div className="w-full sm:flex-[3]">
                  {index === 0 && <InputLabel>Description</InputLabel>}
                  <InputField
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id || item._id, 'description', e.target.value)}
                    placeholder="Item description"
                  />
                </div>
                <div className="w-full sm:flex-[1]">
                  {index === 0 && <InputLabel>Qty</InputLabel>}
                  <InputField
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id || item._id, 'quantity', e.target.value)}
                  />
                </div>
                <div className="w-full sm:flex-[1]">
                  {index === 0 && <InputLabel>Price</InputLabel>}
                  <InputField
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id || item._id, 'unitPrice', e.target.value)}
                  />
                </div>
                <div className="shrink-0">
                  {index === 0 && <label className="block text-sm mb-1">&nbsp;</label>}
                  <button 
                    className="p-2 bg-red-50 text-red-600 rounded-lg border border-red-200 hover:bg-red-100 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                    onClick={() => removeItem(item.id || item._id)}
                    disabled={invoice.items.length === 1}
                    title="Remove Item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            onClick={addItem}
          >
            <Plus size={18} /> Add Item
          </button>
        </div>

        {/* Tax, Discount, Notes */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-[2]">
            <InputLabel>Notes / Payment Terms</InputLabel>
            <TextArea
              rows="4"
              value={invoice.notes}
              onChange={(e) => updateMetadata('notes', e.target.value)}
              placeholder="Thanks for your business! Please pay within 30 days."
            />
          </div>
          <div className="flex-[1] bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-4">
            <div>
              <InputLabel>Tax (%)</InputLabel>
              <InputField
                type="number"
                min="0"
                max="100"
                value={invoice.taxPercentage}
                onChange={(e) => updateMetadata('taxPercentage', Number(e.target.value))}
              />
            </div>
            <div>
              <InputLabel>Discount (%)</InputLabel>
              <InputField
                type="number"
                min="0"
                max="100"
                value={invoice.discountPercentage}
                onChange={(e) => updateMetadata('discountPercentage', Number(e.target.value))}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InvoiceForm;
