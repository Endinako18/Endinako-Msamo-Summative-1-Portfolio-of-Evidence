# ErrandEase 🏃‍♂️💨

ErrandEase is a hyper-local, on-demand task-matching platform that seamlessly connects busy individuals with verified local runners to handle everyday chores, deliveries, and odd jobs safely and efficiently.

---

## 🎯 Target Audience

ErrandEase is engineered to solve everyday scheduling friction for two distinct user bases:

*   **Clients (The Task Posters):** Busy professionals, elderly or mobility-impaired individuals, and parents needing to outsource local chores.
*   **Runners (The Task Doers):** Gig workers and students seeking flexible, local income streams on their own schedules.

---

## 🖥️ Website Page Architecture

The web application is split into 5 core user-facing pages, designed for maximum conversion and seamless navigation:

### 1. Home Page (`/`)
The primary landing page designed to instantly pitch the value proposition to both target audiences.
*   **Hero Section:** High-converting call-to-action (CTA) buttons: "Post an Errand" and "Become a Runner".
*   **How It Works:** A 3-step visual guide (Post, Match, Relax).
*   **Dynamic Testimonials:** A responsive carousel showing glowing social proof from verified Clients and Runners (e.g., *Sarah M. from Chicago, David K. from Austin*).

### 2. Services Page (`/services`)
A deep-dive grid outlining the exact task categories supported by ErrandEase:
*   📦 **Custom Deliveries & Groceries:** Smart item checklists with store-matching logic.
*   🧹 **Home Improvement & Maintenance:** Furniture assembly, quick chores, and minor yard work.
*   🐾 **Pet Care Services:** On-demand dog walking and vet trip coordination.
*   💻 **Tech Support & Admin Chores:** Document dropping and basic device setups.

### 3. About Page (`/about`)
Builds trust and states the company's core mission.
*   **Our Mission:** Bridging the gap in local communities by turning neighbors into helping hands.
*   **The Problem/Solution:** Why existing gig apps fail on trust, and how our strict verification loop solves it.
*   **Core Values:** Community impact, safety first, and transparent pricing.

### 4. Contact Page (`/contact`)
For general queries, business partnerships, or customer support issues.
*   Interactive contact form connected to our email routing backend.
*   Help Desk knowledge base links for immediate troubleshooting.
*   Direct support email, phone lines, and operating hours.

### 5. Enquiry / Booking Page (`/enquiry` or `/book`)
The functional hub where clients post their tasks.
*   **Dynamic Form Wizard:** Step-by-step form capturing Task Type, Location, Budget, and Urgency.
*   **Live Marketplace Feed:** Instantly pushes the approved enquiry to the Runner marketplace database.

---

## 📂 Project Structure

This project follows a standard MERN-stack architecture, decoupling the frontend client logic from the backend server logic:

```text
errandease/
│   ├── authController.js
│   ├── errandController.js
│   └── enquiryController.js
├── models/     
│   ├── User.js             # Separates Client & Runner profiles
│   ├── Errand.js           # Holds service details, budget, & status
│   └── Enquiry.js          # Captures contact/booking form queries
├── routes/                 # API Endpoint Definitions
│   ├── authRoutes.js
│   └── apiRoutes.js
├── middleware/             # Route protection and auth guards
│   └── authMiddleware.js
├── client/                 # Frontend (React Framework)
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI elements (Navbar, Cards, Testimonials)
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   └── TestimonialCarousel.jsx
│       ├── pages/          # The 5 primary page views
│       │   ├── Home.jsx
│       │   ├── Services.jsx
│       │   ├── About.jsx
│       │   ├── Contact.jsx
│       │   └── Enquiry.jsx
│       ├── App.jsx         # React router routing setup
│       └── index.js
├── .env.example            # Sample template for environment variables
├── package.json            # Scripts & global dependencies
└── README.md               # You are here!
