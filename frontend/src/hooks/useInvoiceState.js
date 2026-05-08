import { useState, useEffect } from 'react';
import * as api from '../services/api';

const generateId = () => crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();

const emptyInvoice = {
  invoiceNumber: '',
  issueDate: new Date().toISOString().split('T')[0],
  dueDate: '',
  biller: {
    name: '',
    address: '',
    email: '',
    phone: '',
  },
  client: {
    name: '',
    address: '',
    email: '',
  },
  items: [
    { id: generateId(), description: '', quantity: 1, unitPrice: 0 }
  ],
  taxPercentage: 0,
  discountPercentage: 0,
  notes: '',
};

export const useInvoiceState = (initialId = null) => {
  const [invoice, setInvoice] = useState(emptyInvoice);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setupInvoice = async () => {
      setLoading(true);
      try {
        if (initialId) {
          const data = await api.getInvoiceById(initialId);
          setInvoice(data);
        } else {
          // Auto-generate incrementing invoice number
          const allInvoices = await api.getInvoices();
          let nextNumber = 1;
          
          if (allInvoices && allInvoices.length > 0) {
            const numbers = allInvoices
              .map(inv => inv.invoiceNumber)
              .filter(num => num && num.startsWith('INV-'))
              .map(num => parseInt(num.replace('INV-', ''), 10))
              .filter(num => !isNaN(num));
              
            if (numbers.length > 0) {
              nextNumber = Math.max(...numbers) + 1;
            }
          }
          
          const formattedNumber = `INV-${String(nextNumber).padStart(5, '0')}`;
          setInvoice({ ...emptyInvoice, invoiceNumber: formattedNumber });
        }
      } catch (error) {
        console.error("Failed to setup invoice", error);
      } finally {
        setLoading(false);
      }
    };
    setupInvoice();
  }, [initialId]);

  // Derived state (calculations)
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const discountAmount = subtotal * (invoice.discountPercentage / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * (invoice.taxPercentage / 100);
  const total = taxableAmount + taxAmount;

  // Handlers for Biller
  const updateBiller = (field, value) => {
    setInvoice(prev => ({ ...prev, biller: { ...prev.biller, [field]: value } }));
  };

  // Handlers for Client
  const updateClient = (field, value) => {
    setInvoice(prev => ({ ...prev, client: { ...prev.client, [field]: value } }));
  };

  // Handlers for Metadata
  const updateMetadata = (field, value) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  // Handlers for Items
  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { id: generateId(), description: '', quantity: 1, unitPrice: 0 }]
    }));
  };

  const removeItem = (id) => {
    // We check both _id (MongoDB) and id (local)
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id && item._id !== id)
    }));
  };

  const updateItem = (id, field, value) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => 
        (item.id === id || item._id === id) ? { ...item, [field]: field === 'description' ? value : Number(value) } : item
      )
    }));
  };

  // Save to DB
  const saveInvoice = async () => {
    try {
      if (invoice._id) {
        await api.updateInvoice(invoice._id, invoice);
        return invoice._id;
      } else {
        const created = await api.createInvoice(invoice);
        // Only update the _id so we don't overwrite user's typing that happened during the request
        setInvoice(prev => ({ ...prev, _id: created._id }));
        return created._id;
      }
    } catch (error) {
      console.error("Failed to save invoice", error);
      return null;
    }
  };

  return {
    invoice,
    loading,
    calculations: { subtotal, discountAmount, taxAmount, total },
    updateBiller,
    updateClient,
    updateMetadata,
    addItem,
    removeItem,
    updateItem,
    saveInvoice,
    setInvoice
  };
};
