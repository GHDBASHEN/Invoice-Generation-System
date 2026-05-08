# Invoice Generation System

A full-stack web application built with the MERN stack that allows users to create, preview, and download professional invoices through a clean and intuitive interface. 

<img width="1910" height="724" alt="image" src="https://github.com/user-attachments/assets/bca6adfe-f761-4624-adba-f1832688aa90" />

<img width="1901" height="983" alt="image" src="https://github.com/user-attachments/assets/e874f321-fc34-44e9-aeae-1d277e07688a" />

<img width="660" height="857" alt="image" src="https://github.com/user-attachments/assets/7bc526ae-ee21-4ea8-8c9b-c54f86b28b60" />

## 🚀 Features

* **Interactive Invoice Builder**: Easily capture Biller details, Client details, and Invoice metadata (issue date, due date, invoice number).
* **Dynamic Line Items**: Add, edit, and remove invoice line items (description, quantity, unit price) dynamically.
* **Calculations**: Automatic calculation of subtotal, configurable tax rates, discounts, and total amounts.
* **Real-time Preview**: See a live representation of the final invoice as you type.
* **PDF Export**: Export the generated invoice to a clean, professional PDF format.
* **REST API**: Backend system to securely store and retrieve invoice data.

## 🛠️ Tech Stack

**Frontend**
* React.js (Functional components & hooks)
* Tailwind CSS (for styling)
* Axios (for API requests)
* React Router DOM
* Lucide React (for icons)

**Backend**
* Node.js & Express.js
* MongoDB & Mongoose (Schema modeling)
* CORS & Dotenv

## 📂 Project Structure

The project is structured as a monorepo containing both the frontend and backend applications:

```text
├── backend/                # Node.js / Express backend
│   ├── controllers/        # Route handlers logic
│   ├── models/             # Mongoose database schemas
│   ├── routes/             # API route definitions
│   ├── server.js           # Express app entry point
│   └── package.json        # Backend dependencies
│
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable React components (InvoiceForm, InvoicePreview)
│   │   ├── hooks/          # Custom React hooks (useInvoiceState)
│   │   ├── pages/          # Application pages (Dashboard, InvoiceBuilder)
│   │   ├── services/       # API integration functions
│   │   ├── App.js          # Main React component
│   │   └── index.js        # React app entry point
│   └── package.json        # Frontend dependencies
│
└── README.md               # Project documentation
