# Real-Time Stock Broker Client Dashboard

A full-stack MERN application that provides a real-time stock price dashboard with user authentication and personalized stock subscriptions. Users can subscribe to stocks and receive live price updates without refreshing the page.

## 🚀 Live Demo

- [https://real-time-stock-dashboard2.vercel.app](https://real-time-stock-dashboard2.vercel.app)


## ✨ Features

- 🔐 **JWT Authentication** - Secure user signup and login
- 📊 **Stock Subscriptions** - Subscribe/unsubscribe to supported stocks
- ⚡ **Real-Time Updates** - Live stock price updates using WebSockets (Socket.io)
- 🔄 **Asynchronous Updates** - Multiple users can have different subscriptions with independent updates

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Socket.io Client** - Real-time WebSocket communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose)
- **Socket.io** - WebSocket server for real-time communication
- **JWT (jsonwebtoken)** - Authentication tokens
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
ESCROW/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── api/           # API helper functions
│   │   │   ├── auth.js    # Authentication API calls
│   │   │   └── stocks.js  # Stock-related API calls
│   │   ├── components/    # Reusable React components
│   │   │   └── AuthForm.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── DashboardPage.jsx
│   │   ├── App.jsx         # Main app component with routing
│   │   └── main.jsx        # Entry point
│   ├── vercel.json         # Vercel deployment config
│   └── package.json
│
├── server/                 # Express backend
│   ├── controllers/       # Request handlers
│   │   ├── authController.js
│   │   └── stockController.js
│   ├── middleware/        # Custom middleware
│   │   └── auth.js         # JWT verification middleware
│   ├── models/            # Mongoose schemas
│   │   ├── User.js
│   │   └── Stock.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   └── stocks.js
│   ├── app.js             # Express app configuration
│   ├── server.js          # Server entry point with Socket.io
│   └── package.json
│
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shrishailg11/Real-Time-Stock-Dashboard.git
   cd Real-Time-Stock-Dashboard
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Variables

#### Backend (`server/.env`)

Create a `.env` file in the `server` directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/escrow_dashboard?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-string
CLIENT_ORIGIN=http://localhost:5173
PORT=5000
```

#### Frontend (`client/.env.development`)

Create a `.env.development` file in the `client` directory:

```env
VITE_API_BASE=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### Running Locally

1. **Start the backend server**
   ```bash
   cd server
   node server.js
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 📡 API Endpoints

### Authentication

- `POST /api/auth/signup` - Create a new user account

- `POST /api/auth/login` - Login and get JWT token


### Stocks (Protected - Requires JWT)

- `GET /api/stocks/list` - Get list of supported stocks
- `GET /api/stocks/subscriptions` - Get user's subscribed stocks
- `POST /api/stocks/subscribe` - Subscribe/unsubscribe to a stock
 
> **Note**: Stock prices are generated randomly for demonstration purposes and update every second.

## 🔒 Security Features

- **Password Hashing**: User passwords are hashed using bcrypt before storage
- **JWT Authentication**: Stateless authentication for API routes and WebSocket connections
- **CORS Protection**: Configured to allow requests only from authorized origins

## 🙏 Acknowledgments

- Built with the MERN stack
- Real-time updates powered by Socket.io
- Deployed on Vercel (frontend) and Render (backend)
- Database hosted on MongoDB Atlas

---

**Note**: This is a demonstration project. Stock prices are randomly generated and do not reflect real market data.
