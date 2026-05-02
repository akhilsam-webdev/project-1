# 🚀 project-1 – Full-Stack Development with Node.js & Express.js

This project is part of my full-stack development journey, where I practiced building structured applications using Node.js and Express.js for the backend, integrated with a frontend to improve code organization and handle real-world development concepts.

## ⚙️ Tech Stack
*   **Frontend**: React.js / HTML & CSS.
*   **Backend**: Node.js and Express.js.
*   **JavaScript (ES6)**: The primary programming language for application logic.
*   **MongoDB**: Integrated for database storage, managed via environment variables.

## 📦 Packages Used
### Backend Dependencies
*   **express**: Fast, unopinionated, minimalist web framework for Node.js.
*   **mongoose**: Elegant MongoDB object modeling for Node.js to manage database schemas.
*   **dotenv**: Zero-dependency module that loads environment variables from a `.env` file.
*   **cors**: Middleware to enable Cross-Origin Resource Sharing for frontend-backend communication.
*   **nodemon**: Utility that automatically restarts the server when code changes are detected.

### Frontend Dependencies
*   **react**: A JavaScript library for building user interfaces.
*   **react-dom**: Entry point to the DOM for React.
*   **axios**: Promise-based HTTP client used to call backend APIs.

## 📚 What I Learned
*   **Structuring Full-Stack applications properly**: Learned to organize the project into dedicated `frontend` and `backend` folders for a clean separation of concerns.
*   **Creating multiple API routes**: Gained experience defining endpoints to handle specific client requests from the frontend.
*   **Handling HTTP methods**: Practiced processing GET, POST, and other standard HTTP methods to interact with data.
*   **Working with middleware in Express**: Implemented middleware functions to process data during the request-response cycle.
*   **Understanding request-response lifecycle deeply**: Improved my grasp of how the server receives, processes, and responds to client data.
*   **Basics of database integration**: Successfully connected the application to MongoDB Atlas using connection strings.

## ✨ Features
*   **Full-Stack Folder Structure**: Organized project into separate `frontend` and `backend` directories.
*   **Express server setup**: Clean and modular server initialization within the backend.
*   **Multiple API endpoints**: Organized route handling within the `backend/src/` directory.
*   **Middleware usage**: Efficient processing of incoming requests.
*   **JSON request handling**: Capability to parse and respond with structured JSON data.

## 📂 Project Structure
Referencing the **akhilsam-webdev/project-1** file structure:

```text
project-1/
├── backend/
│   ├── src/
│   │   └── app.js       # Express application logic, routes, and middleware
│   ├── .env             # Environment variables (DB URLs, Port)
│   ├── .gitignore       # Prevents tracking of node_modules and .env
│   ├── package.json     # Backend metadata and dependencies
│   └── server.js        # Entry point to start the HTTP server
├── frontend/
│   ├── src/             # Frontend source code
│   ├── public/          # Public assets
│   ├── package.json     # Frontend metadata and dependencies
│   └── .gitignore       # Prevents tracking of node_modules
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/akhilsam-webdev/project-1
cd project-1
```

### 2️⃣ Install Dependencies
**For Backend:**
```bash
cd backend
npm install
```

**For Frontend:**
```bash
cd ../frontend
npm install
```

### 3️⃣ Run the Project
**Start Backend:**
```bash
cd backend
npm start
```

**Start Frontend:**
```bash
cd frontend
npm start
```

---

## 👨‍💻 Author
**Akhil Sambasivan**
*   **GitHub**: [https://github.com/akhilsam-webdev](https://github.com/akhilsam-webdev)

## 🔗 Repository
👉 [https://github.com/akhilsam-webdev/project-1](https://github.com/akhilsam-webdev/project-1)

## ⭐ Support
If you found this helpful, consider giving a ⭐ to the repo!
