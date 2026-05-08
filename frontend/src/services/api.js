import axios from 'axios';

const LOCAL_API_URL = 'http://localhost:5000/api/invoices';
const REMOTE_API_URL = 'https://invoice-generation-system-9dj0.onrender.com/api/invoices';

// Automatically use local API when running on localhost, otherwise use remote
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? LOCAL_API_URL 
  : REMOTE_API_URL;

export const getInvoices = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getInvoiceById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createInvoice = async (invoiceData) => {
  const response = await axios.post(API_URL, invoiceData);
  return response.data;
};

export const updateInvoice = async (id, invoiceData) => {
  const response = await axios.put(`${API_URL}/${id}`, invoiceData);
  return response.data;
};

export const deleteInvoice = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
