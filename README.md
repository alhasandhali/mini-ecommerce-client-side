# Next.js App — Product Management

A sleek, responsive product-management application built with **Next.js (App Router)**, **NextAuth.js**, and a simple **Express.js backend**.  
The project includes **public pages**, **protected routes**, **Google + Credentials login**, and a polished UI built for clarity and smooth interaction.

---

## 🚀 Features

### ✅ Public Pages

- Landing Page with 7 structured sections
- Item List Page
- Item Details Page
- Login/Register Page (Google + Credentials)

### 🔐 Protected Pages

- **Add Product** – secure product creation form
- **Manage Products** – list, view, delete, update products

### ✨ UI Highlights

- Fully responsive (mobile → tablet → desktop)
- Uniform cards & grids
- Clean forms with inline validation
- Hover & focus states across UI
- Sticky navbar + user dropdown after login
- Optional micro-animations

---

## 🏗️ Tech Stack

### Frontend

- Next.js (App Router)
- NextAuth.js
- React
- Tailwind CSS
- React Hot Toast (optional)

### Backend

- Express.js server
- Minimal REST product API

---

## 🖥️ Live Demo

Add your live link here:  
**https://techtrove-ahd.vercel.app/**

---

## 📘 Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/alhasandhali/mini-ecommerce-client-side.git
git clone https://github.com/alhasandhali/mini-ecommerce-server-side.git
```

## 📘 Setup & Installation

### 2. Install dependencies

```bash
npm install
```

```bash
Copy code
{
  "name": "e-commerce",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@emailjs/browser": "^4.4.1",
    "@tanstack/react-query": "^5.90.11",
    "axios": "^1.13.2",
    "bcryptjs": "^3.0.3",
    "next": "16.0.3",
    "next-auth": "^4.24.13",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "react-hook-form": "^7.66.1",
    "react-icons": "^5.5.0",
    "react-responsive-carousel": "^3.2.23",
    "react-spinners": "^0.17.0",
    "react-toastify": "^11.0.5",
    "swiper": "^9.4.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "babel-plugin-react-compiler": "1.0.0",
    "daisyui": "^5.5.5",
    "eslint": "^9",
    "eslint-config-next": "16.0.3",
    "tailwindcss": "^4"
  }
}
```

### 3. Create environment variables

Create a .env.local file:

```bash
Copy code
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
BACKEND_URL=http://localhost:5000
```

### 4. Run the Express backend

```bash
Copy code
cd express-server
npm install
npm run dev
```

### 5. Start the Next.js frontend

```bash
Copy code
npm run dev
```

### 6. Start the Next.js backend

```bash
Copy code
nodemon index.js
```

Your app will be live at:

```bash
Copy code
http://localhost:3000
```

## 🛠️ API Endpoints (Express)

### Method Endpoint Purpose

- GET /products Fetch all products
- POST /products Add new product
- GET /products/:id Product details
- DELETE /products/:id Delete product
- PUT /products/:id Update product (optional)
