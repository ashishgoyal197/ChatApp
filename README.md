# ChatApp - Real-Time Chat Application

A full-stack real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io for instant messaging.

🔗 **Live Demo**: [https://chatapp-t2xt.onrender.com](https://chatapp-t2xt.onrender.com)

## 📋 Features

- 🔐 **User Authentication**: Secure signup and login with JWT tokens
- 💬 **Real-Time Messaging**: Instant messaging powered by Socket.io
- 👥 **User Sidebar**: View all registered users
- 🎨 **Modern UI**: Beautiful interface built with React, Tailwind CSS, and DaisyUI
- 🔒 **Protected Routes**: Secure routes with authentication middleware
- 👤 **User Profiles**: Auto-generated profile pictures based on gender
- 🍪 **Cookie-based Auth**: Secure session management with HTTP-only cookies
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **Zustand** - State management
- **Socket.io Client** - Real-time communication
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **cookie-parser** - Cookie parsing middleware
- **dotenv** - Environment variable management

## 📦 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** database (local or MongoDB Atlas)

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/ashishgoyal197/ChatApp.git
cd ChatApp
```

### 2. Install dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend/ChatApp
npm install
cd ../..
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# MongoDB Connection String
mongo_db_uri=your_mongodb_connection_string

# JWT Secret Key (use a strong random string)
jwt_secret=your_jwt_secret_key

# Server Port (optional, defaults to 5000)
PORT=5000

# Node Environment
NODE_ENV=development
```

**Example:**
```env
mongo_db_uri=mongodb+srv://username:password@cluster.mongodb.net/chatapp?retryWrites=true&w=majority
jwt_secret=mysecretkey123456789
PORT=5000
NODE_ENV=development
```

## 🏃‍♂️ Running the Application

### Development Mode

**Run backend server with nodemon:**
```bash
npm run server
```

**Run frontend development server:**
```bash
cd frontend/ChatApp
npm run dev
```

The backend will run on `http://localhost:5000` and the frontend on `http://localhost:5173` (default Vite port).

### Production Mode

**Build the application:**
```bash
npm run build
```

**Start the production server:**
```bash
npm start
```

This will serve both the backend API and the built frontend from `http://localhost:5000`.

## 📁 Project Structure

```
ChatApp/
├── backend/
│   ├── controller/         # Route controllers
│   │   ├── auth.controller.js
│   │   ├── message.controller.js
│   │   └── user.controller.js
│   ├── db/                # Database configuration
│   │   └── connectToMongoDB.js
│   ├── middleware/        # Custom middleware
│   │   └── protectRoute.js
│   ├── model/             # Mongoose models
│   │   ├── conversation.model.js
│   │   ├── message.model.js
│   │   └── user.model.js
│   ├── route/             # API routes
│   │   ├── auth.route.js
│   │   ├── message.route.js
│   │   └── user.route.js
│   ├── socket/            # Socket.io configuration
│   │   └── socket.js
│   ├── utils/             # Utility functions
│   │   └── generateToken.js
│   └── index.js           # Entry point
├── frontend/
│   └── ChatApp/
│       ├── public/        # Static assets
│       ├── src/
│       │   ├── assets/    # Images and assets
│       │   ├── component/ # React components
│       │   ├── context/   # React context
│       │   ├── hooks/     # Custom hooks
│       │   ├── pages/     # Page components
│       │   │   ├── home/
│       │   │   ├── login/
│       │   │   └── signUp/
│       │   ├── utils/     # Utility functions
│       │   ├── zustand/   # State management
│       │   ├── App.jsx    # Main App component
│       │   └── main.jsx   # Entry point
│       ├── index.html
│       ├── package.json
│       └── vite.config.js
├── .env                   # Environment variables (not in repo)
├── .gitignore
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- **POST** `/api/auth/signup` - Register a new user
- **POST** `/api/auth/login` - Login user
- **POST** `/api/auth/logout` - Logout user

### Message Routes (`/api/message`)
- **GET** `/api/message/:id` - Get messages with a specific user (protected)
- **POST** `/api/message/send/:id` - Send a message to a specific user (protected)

### User Routes (`/api/users`)
- **GET** `/api/users` - Get all users for sidebar (protected)

*Note: Protected routes require authentication token in cookies.*

## 🎯 Features in Detail

### Authentication System
- User registration with username, full name, password, and gender
- Password hashing using bcryptjs
- JWT token generation and validation
- Secure HTTP-only cookies for session management
- Protected routes with middleware

### Real-Time Messaging
- Instant message delivery using Socket.io
- Online/offline user status
- Message persistence in MongoDB
- Conversation management

### User Interface
- Clean and modern design
- Responsive layout
- Toast notifications for user feedback
- Loading states and error handling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Ashish Goyal**
- GitHub: [@ashishgoyal197](https://github.com/ashishgoyal197)

## 🙏 Acknowledgments

- Avatar images provided by [avatar.iran.liara.run](https://avatar.iran.liara.run)
- UI components from DaisyUI
- Icons from React Icons

---

⭐ If you found this project helpful, please give it a star!
