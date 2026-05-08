import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InvoiceBuilder from './pages/InvoiceBuilder';
import ViewInvoice from './pages/ViewInvoice';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<InvoiceBuilder />} />
        <Route path="/edit/:id" element={<InvoiceBuilder />} />
        <Route path="/view/:id" element={<ViewInvoice />} />
      </Routes>
    </Router>
  );
}

export default App;