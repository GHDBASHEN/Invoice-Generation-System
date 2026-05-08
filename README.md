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
```
---

# 💻 Installation & Setup

Follow the steps below to run the project locally.

## 📋 Prerequisites

Make sure the following are installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)  
  or a MongoDB Atlas connection string

---

# 🔽 Clone the Repository

```bash
git clone https://github.com/GHDBASHEN/Invoice-Generation-System.git
cd Invoice-Generation-System
```

---

# ⚙️ Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder and add:

```env
PORT=5000
MONGODB_URI=mongodb+srv://root:ghdb2001@cluster0.b0btev3.mongodb.net/?appName=Cluster0
NODE_ENV=development
```

> Replace the MongoDB URI with your MongoDB Atlas URI if using cloud MongoDB.

Start the backend server:

```bash
npm run dev
```

The backend server should now run on:

```text
http://localhost:5000
```

---

# 🎨 Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The frontend application should open automatically at:

```text
http://localhost:3000
```

---

🚧 Known Limitations
--------------------

*   **Pagination in PDF Export**: Currently, if an invoice has an excessively large number of line items, the PDF export may not automatically split the table cleanly across multiple pages.
    
*   **Authentication**: The system currently operates without user accounts. Anyone with access to the application can view and generate invoices.
    
*   **Currency Formatting**: The application assumes a single default currency and locale formatting for numerical values.
    

💡 Ideas for Future Improvements
--------------------------------

*   **User Authentication & Authorization**: Implement JWT-based authentication so multiple users can have their own isolated dashboards and saved clients.
    
*   **Direct Email Integration**: Add functionality to email the generated PDF invoice directly to the client from within the application using a service like SendGrid or Nodemailer.
    
*   **Customizable Themes**: Allow users to select different color schemes or layout templates for their generated PDFs to match their brand identity.
    
*   **Dashboard Analytics**: Create a graphical dashboard showing total revenue generated, pending invoices, and paid invoices over time.
    
*   **Multi-Currency Support**: Add a dropdown to select different currencies and automatically format the output accordingly.
