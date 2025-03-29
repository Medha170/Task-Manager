# Task Manager (MERN Stack)  

## 📝 Overview  
Task Manager is a full-stack web application built using the **MERN (MongoDB, Express.js, React, Node.js) stack**. It allows users to **create, update, delete, and manage tasks** efficiently. Authentication is handled using **cookies** to maintain user sessions securely.  

## 🚀 Features  
- **User Authentication**: Sign up, log in, and log out functionality using cookies for session management.  
- **Task Management**: Add, edit, delete, and mark tasks as completed.  
- **Secure API**: Protected routes using authentication middleware.  
- **Responsive UI**: User-friendly design built with React.  
- **RESTful API**: Well-structured API endpoints for seamless interaction.  

## 🏗️ Tech Stack  
- **Frontend**: React.js, React Router, Axios  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB, Mongoose  
- **Authentication**: JSON Web Tokens (JWT) stored in HTTP-only cookies  
- **State Management**: React Context API / Redux (if used)  

## 🔧 Installation & Setup  
### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/task-manager.git  
cd task-manager  
```

### 2️⃣ Install Dependencies  
#### Backend  
```bash
cd server  
npm install  
```

#### Frontend  
```bash
cd client  
npm install  
```

### 3️⃣ Environment Variables  
Create a `.env` file in the **server** directory and add the following:  
```
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
COOKIE_SECRET=your_cookie_secret  
PORT=5000  
```

### 4️⃣ Run the Application  
#### Start the Backend  
```bash
cd server  
npm start  
```
#### Start the Frontend  
```bash
cd client  
npm start  
```

## 🔐 Authentication Flow  
1. Users register or log in.  
2. On successful login, a **JWT token is stored in HTTP-only cookies**.  
3. Protected routes verify the user's session using the token.  
4. Users can log out, which clears the session cookie.  

## 📌 API Endpoints  
| Method | Endpoint         | Description                     | Auth Required |
|--------|----------------|---------------------------------|--------------|
| POST   | `/api/auth/register` | Register a new user | ❌ |
| POST   | `/api/auth/login` | Authenticate user and set cookie | ❌ |
| GET    | `/api/auth/logout` | Logout user and clear cookie | ✅ |
| GET    | `/api/tasks` | Get all tasks | ✅ |
| POST   | `/api/tasks` | Create a new task | ✅ |
| PUT    | `/api/tasks/:id` | Update a task | ✅ |
| DELETE | `/api/tasks/:id` | Delete a task | ✅ |
