# Full-Stack Admin Panel — FastAPI + React + MongoDB + JWT Auth

A modern full-stack admin panel with **JWT authentication**, **CRUD operations**, and a **responsive admin dashboard UI**.

---

## 📁 Project Structure

```
python-react-crud/
├── client/                              # React Frontend (Admin Panel)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx / .css           # Admin sidebar navigation
│   │   │   ├── StatsCards.jsx / .css        # Dashboard stats cards
│   │   │   ├── ItemForm.jsx / .css          # Add item form
│   │   │   └── ItemList.jsx / .css          # Items table with delete
│   │   ├── pages/
│   │   │   ├── Login.jsx                    # Login page
│   │   │   ├── Register.jsx                # Registration page
│   │   │   ├── Dashboard.jsx / .css         # Main admin dashboard
│   │   │   └── Auth.css                     # Shared auth page styles
│   │   ├── context/
│   │   │   └── AuthContext.jsx              # Auth state management
│   │   ├── services/
│   │   │   └── api.js                       # Axios API client with JWT
│   │   ├── App.jsx / .css                   # Routes & protected routes
│   │   ├── main.jsx                         # Entry point with Router
│   │   └── index.css                        # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                              # FastAPI Backend (MVC + JWT)
│   ├── main.py                              # Entry point (python main.py)
│   ├── app/
│   │   ├── __init__.py                      # App factory
│   │   ├── config.py                        # Configuration (.env loading)
│   │   ├── database.py                      # MongoDB connection
│   │   ├── auth.py                          # JWT utilities (hash, verify, token)
│   │   ├── schemas/
│   │   │   ├── item_schema.py               # Item request/response schemas
│   │   │   └── auth_schema.py               # Auth request/response schemas
│   │   ├── routes/
│   │   │   ├── item_routes.py               # Item CRUD routes (protected)
│   │   │   └── auth_routes.py               # Auth routes (login/register)
│   │   ├── controllers/
│   │   │   ├── item_controller.py           # Item business logic
│   │   │   └── auth_controller.py           # Auth business logic
│   │   └── models/
│   │       ├── item_model.py                # Item DB operations
│   │       └── user_model.py                # User DB operations
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

---

## 🛠 Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **MongoDB** (local or Atlas)

---

## 🗄 Database Configuration

### Option A: Local MongoDB

1. Install MongoDB Community Server
2. Start the service (runs on `localhost:27017`)

### Option B: MongoDB Atlas (Free)

1. Create a cluster at https://www.mongodb.com/cloud/atlas
2. Update `server/.env`:

```env
MONGO_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/
DB_NAME=items_db
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## 🚀 How to Run

### 1. Backend (FastAPI)

```bash
cd server

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python main.py
```

→ API: **http://localhost:5000**
→ Swagger Docs: **http://localhost:5000/docs**

### 2. Frontend (React)

```bash
cd client

# Install dependencies
npm install

# Start dev server
npm run dev
```

→ Admin Panel: **http://localhost:3000**

---

## 🔐 Authentication Flow

1. User visits `/login` or `/register`
2. On successful login/register, backend returns a **JWT token**
3. Token is stored in `localStorage`
4. All subsequent API requests include the token in `Authorization: Bearer <token>` header
5. If token expires, user is automatically redirected to login
6. Clicking "Sign Out" removes the token and redirects to login

---

## 🔌 API Endpoints

### Auth (Public)

| Method | Endpoint              | Description              | Body                                      |
|--------|-----------------------|--------------------------|-------------------------------------------|
| POST   | `/api/auth/register`  | Register new user        | `{ "name", "email", "password" }`         |
| POST   | `/api/auth/login`     | Login & get token        | `{ "email", "password" }`                 |
| GET    | `/api/auth/me`        | Get current user info    | — (requires JWT)                          |

### Items (Protected — requires JWT)

| Method | Endpoint              | Description          | Body                                |
|--------|-----------------------|----------------------|-------------------------------------|
| GET    | `/api/items/`         | Get all items        | —                                   |
| GET    | `/api/items/{id}`     | Get single item      | —                                   |
| POST   | `/api/items/`         | Create item          | `{ "name", "description" }`         |
| PUT    | `/api/items/{id}`     | Update item          | `{ "name", "description" }`         |
| DELETE | `/api/items/{id}`     | Delete item          | —                                   |

---

## ⚙️ How the Backend Works

### MVC Architecture + JWT

```
Client Request
     │
     ▼
┌──────────────────────────────────┐
│  AUTH MIDDLEWARE (auth.py)        │
│  Verifies JWT token              │
│  Rejects if invalid/expired      │
└────────────────┬─────────────────┘
                 │ (token valid)
                 ▼
┌──────────────────────────────────┐
│  ROUTES (routes/)                │
│  Maps URL → controller function  │
└────────────────┬─────────────────┘
                 │
                 ▼
┌──────────────────────────────────┐
│  CONTROLLER (controllers/)       │
│  Validates data, calls model     │
│  Returns response or error       │
└────────────────┬─────────────────┘
                 │
                 ▼
┌──────────────────────────────────┐
│  MODEL (models/)                 │
│  MongoDB CRUD operations         │
└────────────────┬─────────────────┘
                 │
                 ▼
            ┌─────────┐
            │ MongoDB │
            └─────────┘
```

### Key Files Explained

| File | What It Does |
|------|-------------|
| `app/auth.py` | Password hashing (bcrypt), JWT creation/verification |
| `app/config.py` | Loads SECRET_KEY, DB settings from `.env` |
| `models/user_model.py` | Create user, find by email (MongoDB) |
| `controllers/auth_controller.py` | Login logic, registration logic |
| `routes/auth_routes.py` | `/register`, `/login`, `/me` endpoints |
| `routes/item_routes.py` | All CRUD routes — protected via `Depends(get_current_user)` |

---

## 🔧 Environment Variables

File: `server/.env`

| Variable                     | Default                     | Description                |
|------------------------------|-----------------------------|----------------------------|
| MONGO_URI                    | `mongodb://localhost:27017` | MongoDB connection URI     |
| DB_NAME                      | `items_db`                  | Database name              |
| SECRET_KEY                   | (set one!)                  | JWT signing secret         |
| ACCESS_TOKEN_EXPIRE_MINUTES  | `60`                        | Token expiry in minutes    |

---

## 📦 Tech Stack

| Layer          | Technology         | Purpose                     |
|----------------|--------------------|-----------------------------|
| Frontend       | React + Vite       | Admin panel UI              |
| Routing        | React Router       | Page navigation             |
| HTTP Client    | Axios              | API calls with JWT headers  |
| Backend        | FastAPI            | REST API framework          |
| Auth           | python-jose + passlib | JWT tokens + bcrypt hashing |
| Validation     | Pydantic           | Request/response schemas    |
| Server         | Uvicorn            | ASGI server                 |
| Database       | MongoDB + PyMongo  | Document storage            |

---

## 🐛 Troubleshooting

| Problem                         | Solution                                                    |
|---------------------------------|-------------------------------------------------------------|
| `401 Unauthorized`              | Token expired — re-login                                    |
| `422 Unprocessable Entity`      | Request body doesn't match schema                           |
| Registration says "email exists"| User already registered — try login                         |
| CORS errors                     | Ensure frontend runs on port 3000                           |
| `ModuleNotFoundError`           | Activate virtual environment before running                 |
| MongoDB connection refused      | Make sure MongoDB is running locally                        |
