# Ticket Seat Booking System

A premium, interactive seat booking application built with **React**, **TypeScript**, and **Express**. This project features a dynamic seat map, real-time price calculation, and a smooth booking flow designed for an optimal user experience.

---

## Features

- **Interactive Seat Map**: A visual 2D grid representing the venue layout.
- **Dynamic Pricing**: Support for various seat tiers (VIP vs General) with clear pricing indicators.
- **Real-time Selection**: Toggle seat selections with immediate total price updates.
- **Smart Booking Flow**: Validated booking process requiring name and email details.
- **Robust Persistence**: Backend synchronization to prevent double-booking and maintain seat status.
- **Premium UI/UX**: Clean design with responsive layouts and interactive hover effects.

---

## Tech Stack

### Frontend
- **React 18**: Component-based UI library.
- **TypeScript**: For type-safe development.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first styling for a modern aesthetic.

### Backend
- **Node.js & Express**: Lightweight and fast server framework.
- **ts-node-dev**: Seamless TypeScript execution with auto-reload.
- **CORS**: Configured for secure frontend-backend communication.

---

## Getting Started

To get the application up and running locally, follow these steps.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0 or higher recommended)
- npm, pnpm, or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ticket-seat-booking
```

### 2. Run Both Frontend & Backend (Recommended)
You can start both services with a single command from the root directory:
```bash
npm run dev
```
*Wait for both the magenta (Backend) and cyan (Frontend) logs to appear.*

### 3. Setup Individually (Alternative)
If you prefer running them in separate terminals:

**Backend**:
```bash
cd backend
npm install
npm run dev
```

**Frontend**:
```bash
cd frontend
npm install
npm run dev
```

---

## Project Structure

```text
├── backend
│   ├── src
│   │   ├── index.ts      # Server entry point & API routes
│   │   ├── data.ts       # Mock seat data
│   │   └── types.ts      # Shared TypeScript interfaces
│   └── package.json
└── frontend
    ├── src
    │   ├── components    # SeatMap, BookingSummary, etc.
    │   ├── api.ts        # Service layer for API calls
    │   ├── App.tsx       # Main application logic
    │   └── main.tsx      # React entry point
    └── package.json
```

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Health check for the API |
| `GET` | `/api/seats` | Fetch the latest status of all seats |
| `POST` | `/api/book` | Submit a booking request (requires `seatIds`, `name`, `email`) |

---

## License

This project is open-source and available under the MIT License.
