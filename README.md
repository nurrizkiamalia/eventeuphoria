# Event Management Platform Frontend

This repository contains the frontend implementation of the Event Management Platform, developed using **Next.js**, **TailwindCSS**, and **TypeScript**.

## 🚀 Core Features

### 1. Event Discovery and Details
- **Landing Page**: Displays a list of events with responsive design.
- **Search with Debounce**: Enables users to search for events efficiently.
- **Filters and Pagination**: Allows filtering events by categories or locations and supports pagination for better navigation.
- **Event Details**: Detailed page for each event, including the option to purchase tickets.

### 2. Event Transactions and Promotions
- **Event Creation**: Organizers can create events by specifying:
  - Name, price, date, time, location, description, available seats, and ticket types.
- **Free and Paid Events**: Handles ticket sales with IDR as the only currency.
- **Promotions**:
  - Discount vouchers for limited users who use referral codes.
  - Date-based discounts.

### 3. Event Reviews and Ratings
- Allows attendees to leave feedback and ratings after attending events.

### 4. User Authentication and Authorization
- **User Roles**:
  - **Customers/Participants**: Can view events and purchase tickets.
  - **Event Organizers**: Can manage events and view statistics.
- **Referral System**:
  - Users registering with a referral number get a 10% discount.
  - Referrers earn 10,000 points for each referral, expiring after three months.
  - Points can be redeemed for ticket discounts.

### 5. Event Management Dashboard
- **Features for Organizers**:
  - View events, registrations, and transactions.
  - Visualize data through graphs and reports (yearly, monthly, daily).

## 💻 Technology Stack
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Language**: TypeScript
- **State Management**: Context API
- **API Integration**: Axios or Fetch for backend communication

## 📑 Folder Structure

```
├── app/              # Next.js app directory for routing and layout components
│   ├── (auth)/       # Authentication-related pages
│   ├── (event)/      # Event-related pages
│   ├── (root)/       # Root-level pages and layouts
│   ├── dashboard/    # Organizer dashboard components
│   ├── favicon.ico   # Favicon for the application
│   ├── globals.css   # Global CSS styles
│   ├── layout.tsx    # Default layout for the application
├── components/       # Reusable components (Button, Modal, etc.)
├── context/          # Context API setup
├── data/             # Static data or configuration files
├── hooks/            # Custom hooks
├── lib/              # Utility libraries or helper functions
├── public/           # Static assets (images, icons, etc.)
├── services/         # API services for backend requests
├── types/            # TypeScript type definitions
└── utils/            # Utility functions (debounce, etc.)
```

## 🧪 Features in Detail

### Event Search and Filter
- **Search with Debounce**: Prevents excessive API calls by delaying the request while the user types.
- **Pagination**: Supports large datasets with seamless navigation.
- **Filters**: Refine results based on categories or location.

### Event Reviews
- **Post-event Feedback**: Users can leave feedback and ratings for attended events.

### Dashboard Visualizations
- **Graphs**: Interactive visualizations for event statistics using Chart.js or another library.

## 🛡️ Security
- **Role-based Access Control**: Protects routes for different user roles.
- **Secure Token Storage**: Ensures safe handling of authentication tokens.

