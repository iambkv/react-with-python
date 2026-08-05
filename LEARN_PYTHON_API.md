# 🐍 Python FastAPI — Complete Learning Guide (From Zero to End)

## What This Document Covers

This document explains everything about how a Python API works — from scratch. If you're learning Python and want to understand how a full-stack application works behind the scenes, this is for you.

**Topics Covered:**
1. What is Python?
2. What is an API?
3. What is FastAPI?
4. Every file in our project — what it does and why
5. Complete request flow — from frontend button click to database and back
6. JWT Authentication — how login/logout works
7. How React consumes the API
8. MVC Pattern explained
9. Important Python concepts used in this project

---

## Part 1: What is Python?

Python is a **programming language** — a set of instructions that a computer can understand and execute. Just like we use English to communicate with people, we use Python to communicate with computers.

### Why Python?

- **Readable syntax** — looks almost like English
- **Versatile** — used in web development, AI, data science, automation
- **Huge ecosystem** — thousands of libraries available for any task
- **Beginner friendly** — minimal boilerplate code to get started

### Basic Python Example:

```python
# This is a comment — computer ignores it, it's for humans

# Variables — storing data in named containers
name = "Bharat"
age = 25
is_developer = True

# Function — a reusable block of code that does one job
def greet(person_name):
    """This function takes a name and returns a greeting message."""
    return f"Hello, {person_name}! Welcome to Python."

# Calling the function
message = greet(name)
print(message)
# Output: Hello, Bharat! Welcome to Python.
```

### Key Python Concepts:

| Concept | What It Is | Example |
|---------|-----------|---------|
| Variable | A named container for data | `x = 10`, `name = "John"` |
| Function | A reusable block of code | `def add(a, b): return a + b` |
| Dictionary | Key-value pairs (like JSON) | `{"name": "John", "age": 25}` |
| List | An ordered collection of items | `[1, 2, 3, "hello"]` |
| Class | A blueprint for creating objects | `class User: ...` |
| Import | Using code from another file | `from app import create_app` |
| Decorator | Adding extra behavior to a function | `@app.get("/hello")` |

### Real-World Analogy:

Think of Python like a recipe book:
- **Variables** = Ingredients (flour = 2 cups)
- **Functions** = Steps (mix_ingredients, bake, serve)
- **Classes** = Categories (Desserts, Main Course)
- **Import** = Referencing another recipe book

---

## Part 2: What is an API?

**API = Application Programming Interface**

An API is a **messenger** that takes a request from one system, delivers it to another system, and brings back the response.

### Real-World Analogy — Restaurant:

```
You (Customer)     →  Waiter (API)      →  Kitchen (Server/Database)
"I want pizza"     →  Takes your order  →  Makes the pizza
                   ←  Brings pizza back ←  Pizza is ready
```

- **You** = Frontend (React app in the browser)
- **Waiter** = API (FastAPI server)
- **Kitchen** = Backend logic + Database (MongoDB)
- **Menu** = API documentation (what you can order)
- **Order slip** = HTTP Request
- **Food on plate** = HTTP Response (JSON data)

### How APIs Communicate — HTTP:

Every API call has these parts:

```
REQUEST (what you send):
├── URL:     http://localhost:5000/api/items/
├── Method:  GET, POST, PUT, DELETE
├── Headers: Authorization: Bearer token123...
└── Body:    {"name": "Learn Python", "description": "Study FastAPI"}

RESPONSE (what you get back):
├── Status Code: 200 OK, 404 Not Found, etc.
├── Headers:     Content-Type: application/json
└── Body:        {"id": "abc123", "name": "Learn Python", ...}
```

### HTTP Methods Explained:

| Method | Purpose | Real-World Example | Our API Example |
|--------|---------|-------------------|-----------------|
| GET | Retrieve data | "Show me the menu" | Get all items |
| POST | Create new data | "I want to order this dish" | Create a new item |
| PUT | Update existing data | "Change my order to something else" | Update an item's name |
| DELETE | Remove data | "Cancel my order" | Delete an item |

### HTTP Status Codes:

| Code | Meaning | When It Happens |
|------|---------|-----------------|
| 200 | OK — Success | GET request worked, data returned |
| 201 | Created — New resource made | POST request created a new item |
| 400 | Bad Request — Your fault | You sent invalid data |
| 401 | Unauthorized — Not logged in | Missing or expired JWT token |
| 404 | Not Found — Doesn't exist | Item ID doesn't exist in database |
| 422 | Validation Error | Request body doesn't match the schema |
| 500 | Server Error — Our fault | Something broke on the server |

### JSON — The Language of APIs:

APIs communicate using **JSON** (JavaScript Object Notation). It looks like this:

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Learn Python",
  "description": "Study FastAPI framework",
  "created_at": "2024-01-15"
}
```

Both frontend (React) and backend (Python) understand JSON. It's the universal language between them.

---

## Part 3: What is FastAPI?

**FastAPI** is a Python web framework for building APIs. Just like React is a framework for building user interfaces, FastAPI is a framework for building backend APIs.

### Why FastAPI Over Others?

| Feature | FastAPI | Flask | Django |
|---------|---------|-------|--------|
| Speed | Very fast (async) | Moderate | Moderate |
| Auto Documentation | Yes (Swagger UI free) | No | No |
| Auto Validation | Yes (Pydantic) | No (manual) | Partial |
| Type Safety | Yes (type hints) | No | Partial |
| Learning Curve | Easy | Easy | Hard |

### Simplest FastAPI Application:

```python
from fastapi import FastAPI

# Create the application
app = FastAPI()

# Define a route — when someone visits /hello, run this function
@app.get("/hello")
def say_hello():
    return {"message": "Hello, World!"}

@app.get("/items/{item_id}")
def get_item(item_id: int):
    return {"item_id": item_id, "name": f"Item number {item_id}"}
```

**What happens when you run this:**
1. Server starts on `http://localhost:8000`
2. Visit `http://localhost:8000/hello` → `{"message": "Hello, World!"}`
3. Visit `http://localhost:8000/items/5` → `{"item_id": 5, "name": "Item number 5"}`
4. Visit `http://localhost:8000/docs` → Interactive Swagger documentation (FREE!)

### Key FastAPI Features We Use:

1. **Decorators** (`@app.get`, `@app.post`) — define URL routes
2. **Pydantic Models** — automatic request validation
3. **Dependency Injection** (`Depends()`) — reusable logic (like auth checks)
4. **APIRouter** — organize routes into separate files
5. **Middleware** — code that runs on every request (like CORS)

---

## Part 4: Our Project Structure Explained

```
server/
├── main.py                    ← ENTRY POINT — starts the server
├── .env                       ← SECRETS — database URL, JWT key
├── requirements.txt           ← DEPENDENCIES — libraries we need
└── app/
    ├── __init__.py            ← APP FACTORY — assembles everything
    ├── config.py              ← CONFIGURATION — loads settings
    ├── database.py            ← DATABASE — MongoDB connection
    ├── auth.py                ← AUTHENTICATION — JWT + password utilities
    ├── schemas/               ← VALIDATION — defines data shapes
    │   ├── item_schema.py         (item request/response shapes)
    │   └── auth_schema.py         (auth request/response shapes)
    ├── routes/                ← ROUTING — URL endpoint definitions
    │   ├── item_routes.py         (GET/POST/PUT/DELETE /api/items/)
    │   └── auth_routes.py         (login, register, me)
    ├── controllers/           ← LOGIC — business rules and decisions
    │   ├── item_controller.py     (item CRUD logic)
    │   └── auth_controller.py     (login/register logic)
    └── models/                ← DATABASE OPS — direct MongoDB queries
        ├── item_model.py          (item collection operations)
        └── user_model.py          (user collection operations)
```

### How They Connect (the chain):

```
Request → Routes → Controller → Model → MongoDB
                                          ↓
Response ← Routes ← Controller ← Model ← Data
```

---

## Part 5: Every File Explained in Detail

---

### 5.1 `main.py` — The Entry Point

This is the first file that runs when you start the server. Everything begins here.

```python
import uvicorn
from app import create_app

# Create the FastAPI application instance
app = create_app()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
```

**Line by line:**

| Line | What It Does |
|------|-------------|
| `import uvicorn` | Import the ASGI server (the engine that runs FastAPI) |
| `from app import create_app` | Import our app factory function from the `app/` folder |
| `app = create_app()` | Call the factory to build the FastAPI application with all settings, routes, and database connection |
| `if __name__ == "__main__":` | This block runs only when you execute `python main.py` directly |
| `uvicorn.run(...)` | Start the web server |
| `host="0.0.0.0"` | Accept connections from any IP (not just localhost) |
| `port=5000` | Listen on port 5000 |
| `reload=True` | Auto-restart server when code changes (development only) |

**Real-World Analogy:** This is like turning the "OPEN" sign on at a restaurant. Once this runs, the server is ready to accept requests.

---

### 5.2 `.env` — Environment Variables

```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=items_db
SECRET_KEY=my-super-secret-key-change-this-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

**What each variable means:**

| Variable | Purpose | Why It's Here |
|----------|---------|---------------|
| `MONGO_URI` | MongoDB connection address | Where is the database? |
| `DB_NAME` | Which database to use | A MongoDB server can have many databases |
| `SECRET_KEY` | Used to sign JWT tokens | Like a stamp that proves the token is real |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token lifespan | After 60 min, user must login again |

**Why use `.env` instead of hardcoding?**
- Security — secrets are not in your code (not pushed to GitHub)
- Flexibility — different values for development vs production
- Easy to change — no code modification needed

---

### 5.3 `app/config.py` — Loading Configuration

```python
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    MONGO_URI: str = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    DB_NAME: str = os.getenv("DB_NAME", "items_db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

settings = Settings()
```

**How it works:**

1. `load_dotenv()` — reads the `.env` file and loads its values into the system environment
2. `os.getenv("MONGO_URI", "default_value")` — gets the value of `MONGO_URI` from environment. If not found, uses the default.
3. `settings = Settings()` — creates one instance that the entire app shares

**Usage in other files:**
```python
from app.config import settings

print(settings.MONGO_URI)  # "mongodb://localhost:27017"
print(settings.SECRET_KEY) # "my-super-secret-key..."
```

---

### 5.4 `app/database.py` — MongoDB Connection

```python
from pymongo import MongoClient
from app.config import settings

client: MongoClient = None
db = None

def connect_db():
    global client, db
    client = MongoClient(settings.MONGO_URI)
    db = client[settings.DB_NAME]
    print(f"✅ Connected to MongoDB: {settings.DB_NAME}")

def close_db():
    global client
    if client:
        client.close()
        print("🔌 MongoDB connection closed")

def get_db():
    return db
```

**How it works:**

| Function | When It's Called | What It Does |
|----------|-----------------|-------------|
| `connect_db()` | Server starts up | Opens a connection to MongoDB |
| `close_db()` | Server shuts down | Cleanly closes the connection |
| `get_db()` | Every database operation | Returns the database instance for queries |

**Understanding `global`:**

```python
client = None  # This is a module-level variable

def connect_db():
    global client  # "I want to modify the module-level variable, not create a local one"
    client = MongoClient(...)  # Now the module-level 'client' is updated
```

Without `global`, Python would create a new local variable inside the function, leaving the module-level one unchanged.

**MongoDB Concepts:**
- **Client** → Connection to the MongoDB server
- **Database** → A named container for collections (like `items_db`)
- **Collection** → A group of documents (like `items`, `users`) — similar to tables in SQL
- **Document** → A single record (like `{name: "Learn Python", description: "..."}`)

---

### 5.5 `app/__init__.py` — The App Factory

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import connect_db, close_db
from app.routes.item_routes import router as item_router
from app.routes.auth_routes import router as auth_router

def create_app() -> FastAPI:
    app = FastAPI(
        title="Items CRUD API",
        description="A CRUD API with JWT authentication",
        version="2.0.0",
    )

    # CORS Middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Lifecycle events
    @app.on_event("startup")
    async def startup():
        connect_db()

    @app.on_event("shutdown")
    async def shutdown():
        close_db()

    # Register routes
    app.include_router(auth_router, prefix="/api")
    app.include_router(item_router, prefix="/api")

    return app
```

**Breaking it down:**

**1. CORS Middleware:**
```python
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], ...)
```
- Browsers have a security rule: a page at `localhost:3000` cannot make API calls to `localhost:5000` by default
- CORS (Cross-Origin Resource Sharing) middleware removes this restriction
- We allow only our React app (`localhost:3000`) to access our API

**2. Lifecycle Events:**
```python
@app.on_event("startup")    # Runs once when server starts
@app.on_event("shutdown")   # Runs once when server stops
```

**3. Route Registration:**
```python
app.include_router(auth_router, prefix="/api")   # All auth routes get /api prefix
app.include_router(item_router, prefix="/api")   # All item routes get /api prefix
```
So `auth_router` with `prefix="/auth"` + app `prefix="/api"` = `/api/auth/...`

---

### 5.6 `app/auth.py` — JWT Authentication Utilities

This is the security layer of the application.

```python
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")
```

#### Password Hashing:

```python
def hash_password(password: str) -> str:
    password_bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed.decode("utf-8")
```

**What happens:**
```
Input:  "secret123"
Output: "$2b$12$LJ3m4ks9fKx8rJ2kP7qVweOdN5x3z8y9abc123..."
```

- The password is **one-way encrypted** — you cannot reverse it
- Even if a hacker steals the database, they cannot see the actual passwords
- `bcrypt.gensalt()` adds random data (salt) so same password produces different hashes

#### Password Verification:

```python
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8"),
    )
```

**How it works:**
```
User types:    "secret123"
Database has:  "$2b$12$LJ3m4ks9fKx8rJ2kP7qVwe..."

bcrypt.checkpw("secret123", "$2b$12$...") → True ✅ (they match)
bcrypt.checkpw("wrong123",  "$2b$12$...") → False ❌ (they don't match)
```

#### JWT Token Creation:

```python
def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt
```

**What happens:**
```
Input:  {"sub": "john@example.com"}
Add:    {"sub": "john@example.com", "exp": 1727200000}  (expiry time added)
Output: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIi..."  (encoded token)
```

**JWT Token Structure:**
```
eyJhbGci...   .   eyJzdWIi...   .   SflKxwRJ...
[Header]          [Payload]          [Signature]
```
- **Header** — algorithm used (HS256)
- **Payload** — your data (email, expiry)
- **Signature** — proof that the token wasn't tampered with (uses SECRET_KEY)

#### Token Verification (Protecting Routes):

```python
def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        return {"email": email}
    except JWTError:
        raise credentials_exception
```

**What this does:**
1. Extracts the token from the `Authorization: Bearer <token>` header
2. Decodes the token using the SECRET_KEY
3. Checks if it's expired
4. Returns the user's email from the token payload
5. If anything fails → 401 Unauthorized error

**Real-World Analogy:** This is a security guard at a building entrance. Every person (request) must show their ID badge (JWT token). If the badge is fake, expired, or missing → "Access Denied."

---

### 5.7 `app/schemas/item_schema.py` — Data Validation with Pydantic

Pydantic schemas define the **shape** of data — what fields are required, what types they must be, and what constraints they have.

```python
from pydantic import BaseModel, Field
from typing import Optional

class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1, example="Learn FastAPI")
    description: Optional[str] = Field(default="", example="Study the docs")

class ItemUpdate(BaseModel):
    name: str = Field(..., min_length=1)
    description: Optional[str] = Field(default="")

class ItemResponse(BaseModel):
    id: str
    name: str
    description: str

class MessageResponse(BaseModel):
    message: str
```

**Understanding each schema:**

| Schema | Used When | Purpose |
|--------|-----------|---------|
| `ItemCreate` | POST /api/items/ | Validates data when creating a new item |
| `ItemUpdate` | PUT /api/items/{id} | Validates data when updating an item |
| `ItemResponse` | All responses | Defines what the API sends back |
| `MessageResponse` | DELETE response | Simple message like "Item deleted" |

**How validation works in practice:**

```
Frontend sends:  {"name": "Learn Python", "description": "Study FastAPI"}
Pydantic checks: name exists? ✅  name is string? ✅  min_length 1? ✅
Result:          Request passes through to the controller

Frontend sends:  {"description": "No name here"}
Pydantic checks: name exists? ❌
Result:          422 Error — {"detail": [{"msg": "field required", "loc": ["body", "name"]}]}
```

**Key Pydantic concepts:**
- `...` (Ellipsis) → Field is REQUIRED (no default value)
- `Optional[str]` → Field can be a string or None
- `Field(default="")` → If not provided, use empty string
- `min_length=1` → Must have at least 1 character

**Why this matters:** You don't need to write manual validation code in your controller. Pydantic handles it automatically before your code even runs.

---

### 5.8 `app/routes/item_routes.py` — URL Endpoint Definitions

Routes define **which URL + method** triggers **which function**.

```python
from fastapi import APIRouter, Depends
from app.schemas.item_schema import ItemCreate, ItemUpdate, ItemResponse, MessageResponse
from app.controllers import item_controller
from app.auth import get_current_user

router = APIRouter(prefix="/items", tags=["Items"], dependencies=[Depends(get_current_user)])

@router.get("/", response_model=list[ItemResponse])
def get_items():
    return item_controller.get_all_items()

@router.get("/{item_id}", response_model=ItemResponse)
def get_item(item_id: str):
    return item_controller.get_single_item(item_id)

@router.post("/", response_model=ItemResponse, status_code=201)
def create_item(item: ItemCreate):
    return item_controller.create_new_item(item.model_dump())

@router.put("/{item_id}", response_model=ItemResponse)
def update_item(item_id: str, item: ItemUpdate):
    return item_controller.update_existing_item(item_id, item.model_dump())

@router.delete("/{item_id}", response_model=MessageResponse)
def delete_item(item_id: str):
    return item_controller.delete_existing_item(item_id)
```

**Understanding each part:**

| Code | Meaning |
|------|---------|
| `APIRouter(prefix="/items")` | All routes start with `/items` |
| `tags=["Items"]` | Groups these routes under "Items" in Swagger docs |
| `dependencies=[Depends(get_current_user)]` | ALL routes require JWT authentication |
| `@router.get("/")` | Handle GET requests to `/api/items/` |
| `@router.post("/", status_code=201)` | Handle POST, return 201 on success |
| `response_model=list[ItemResponse]` | Response will be a list of ItemResponse objects |
| `item: ItemCreate` | Request body will be validated against ItemCreate schema |
| `{item_id}` | Path parameter — extracted from the URL |
| `item.model_dump()` | Convert Pydantic model to a plain dictionary |

**What `Depends(get_current_user)` does:**

Before any route function runs, FastAPI executes `get_current_user()`:
1. Extracts JWT token from the `Authorization` header
2. Verifies the token is valid and not expired
3. If valid → route function runs normally
4. If invalid → 401 error returned immediately (route function never runs)

**Real-World Analogy:** Routes are like a reception desk. They know which department (controller) to send you to, but first they check your visitor badge (JWT token).

---

### 5.9 `app/controllers/item_controller.py` — Business Logic

The controller sits between routes and models. It makes decisions and handles errors.

```python
from fastapi import HTTPException
from app.models import item_model

def get_all_items() -> list[dict]:
    return item_model.get_all()

def get_single_item(item_id: str) -> dict:
    item = item_model.get_by_id(item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found or invalid ID")
    return item

def create_new_item(data: dict) -> dict:
    return item_model.create(data)

def update_existing_item(item_id: str, data: dict) -> dict:
    item = item_model.update(item_id, data)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found or invalid ID")
    return item

def delete_existing_item(item_id: str) -> dict:
    result = item_model.delete(item_id)
    if result is None:
        raise HTTPException(status_code=400, detail="Invalid item ID")
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted successfully"}
```

**What the controller does:**
1. Receives already-validated data from the route
2. Calls the model to perform the database operation
3. Checks the result — was it successful?
4. If something is wrong → raises an appropriate HTTP error
5. If successful → returns the data

**What is `raise HTTPException`?**

```python
raise HTTPException(status_code=404, detail="Item not found")
```

This immediately stops execution and sends an error response:
```json
{
  "detail": "Item not found"
}
```
with HTTP status code 404.

**What the controller does NOT do:**
- Does NOT define URLs (that's the route's job)
- Does NOT write database queries (that's the model's job)
- Does NOT validate request data (that's Pydantic's job)

---

### 5.10 `app/models/item_model.py` — Database Operations

The model is the only layer that talks directly to MongoDB.

```python
from bson import ObjectId
from bson.errors import InvalidId
from app.database import get_db

def _get_collection():
    return get_db()["items"]

def serialize(item: dict) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "description": item.get("description", ""),
    }

def get_all() -> list[dict]:
    items = _get_collection().find()
    return [serialize(item) for item in items]

def get_by_id(item_id: str) -> dict | None:
    try:
        item = _get_collection().find_one({"_id": ObjectId(item_id)})
    except (InvalidId, Exception):
        return None
    return serialize(item) if item else None

def create(data: dict) -> dict:
    new_item = {
        "name": data["name"],
        "description": data.get("description", ""),
    }
    result = _get_collection().insert_one(new_item)
    new_item["_id"] = result.inserted_id
    return serialize(new_item)

def update(item_id: str, data: dict) -> dict | None:
    try:
        result = _get_collection().update_one(
            {"_id": ObjectId(item_id)},
            {"$set": {"name": data["name"], "description": data.get("description", "")}},
        )
    except (InvalidId, Exception):
        return None
    if result.matched_count == 0:
        return None
    updated = _get_collection().find_one({"_id": ObjectId(item_id)})
    return serialize(updated)

def delete(item_id: str) -> bool | None:
    try:
        result = _get_collection().delete_one({"_id": ObjectId(item_id)})
    except (InvalidId, Exception):
        return None
    return result.deleted_count > 0
```

**Understanding each function:**

| Function | MongoDB Operation | Returns |
|----------|------------------|---------|
| `get_all()` | `collection.find()` | List of all items |
| `get_by_id(id)` | `collection.find_one({_id: ...})` | Single item or None |
| `create(data)` | `collection.insert_one(...)` | The newly created item |
| `update(id, data)` | `collection.update_one(...)` | Updated item or None |
| `delete(id)` | `collection.delete_one(...)` | True/False/None |

**What is `serialize()`?**

MongoDB stores documents like this:
```python
{"_id": ObjectId("507f1f77bcf86cd799439011"), "name": "Learn Python", "description": "..."}
```

But JSON cannot handle `ObjectId` objects. So `serialize()` converts it:
```python
{"id": "507f1f77bcf86cd799439011", "name": "Learn Python", "description": "..."}
```

**What is `ObjectId`?**
- MongoDB automatically generates a unique `_id` for every document
- It's a 12-byte identifier that looks like: `507f1f77bcf86cd799439011`
- We convert string IDs back to ObjectId when querying: `ObjectId("507f...")`

**What is `try/except`?**
```python
try:
    item = collection.find_one({"_id": ObjectId(item_id)})
except (InvalidId, Exception):
    return None
```

If `item_id` is not a valid MongoDB ID format (like "abc" instead of a 24-character hex string), `ObjectId()` will throw an error. Instead of crashing the server, we catch the error and return `None`.

---

## Part 6: Complete Request Flow — Real Example

Let's trace exactly what happens when a user clicks "Add Item" in the React app.

### Scenario: User creates a new item called "Learn MongoDB"

---

**STEP 1 — User fills the form in React and clicks "Save Item"**

```jsx
// React component calls this function:
const addItem = async (item) => {
  const response = await itemAPI.create(item);
  setItems([...items, response.data]);
};

// itemAPI.create() from services/api.js:
create: (data) => API.post("/items/", data)
```

---

**STEP 2 — Axios sends an HTTP request**

```
POST http://localhost:5000/api/items/
Headers:
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwiZXhwIjoxNzI3MjAwMDAwfQ.signature
Body:
  {"name": "Learn MongoDB", "description": "Study NoSQL databases"}
```

The Vite dev server proxies `/api/*` requests from port 3000 to port 5000 where FastAPI is running.

---

**STEP 3 — FastAPI receives the request**

FastAPI processes the request in this order:

```
1. CORS Middleware
   → Is localhost:3000 allowed? YES ✅

2. Route Matching
   → POST /api/items/ matches item_routes.py → create_item()

3. Dependency Injection (get_current_user)
   → Extract token from Authorization header
   → Decode: {"sub": "john@example.com", "exp": 1727200000}
   → Token expired? NO ✅
   → User authenticated ✅

4. Request Body Validation (Pydantic - ItemCreate)
   → "name" exists? YES ✅
   → "name" is string? YES ✅
   → "name" min_length 1? YES ("Learn MongoDB" has 13 chars) ✅
   → "description" is optional string? YES ✅
   → Validation PASSED ✅
```

---

**STEP 4 — Route calls Controller**

```python
# item_routes.py
@router.post("/", response_model=ItemResponse, status_code=201)
def create_item(item: ItemCreate):
    return item_controller.create_new_item(item.model_dump())

# item.model_dump() converts Pydantic model to:
# {"name": "Learn MongoDB", "description": "Study NoSQL databases"}
```

---

**STEP 5 — Controller calls Model**

```python
# item_controller.py
def create_new_item(data: dict) -> dict:
    return item_model.create(data)
    # data = {"name": "Learn MongoDB", "description": "Study NoSQL databases"}
```

---

**STEP 6 — Model inserts into MongoDB**

```python
# item_model.py
def create(data: dict) -> dict:
    new_item = {
        "name": "Learn MongoDB",
        "description": "Study NoSQL databases",
    }
    result = _get_collection().insert_one(new_item)
    # MongoDB generates: ObjectId("64a7b3c2f8e9d12345678901")
    new_item["_id"] = result.inserted_id
    return serialize(new_item)

# serialize() returns:
# {"id": "64a7b3c2f8e9d12345678901", "name": "Learn MongoDB", "description": "Study NoSQL databases"}
```

**What MongoDB stores:**
```json
{
  "_id": ObjectId("64a7b3c2f8e9d12345678901"),
  "name": "Learn MongoDB",
  "description": "Study NoSQL databases"
}
```

---

**STEP 7 — Response travels back**

```
Model returns dict → Controller returns dict → Route returns dict → FastAPI converts to JSON

HTTP Response:
  Status: 201 Created
  Body: {"id": "64a7b3c2f8e9d12345678901", "name": "Learn MongoDB", "description": "Study NoSQL databases"}
```

---

**STEP 8 — React receives the response**

```jsx
const response = await itemAPI.create(item);
// response.data = {"id": "64a7b3c2...", "name": "Learn MongoDB", "description": "..."}

setItems([...items, response.data]);
// The new item appears in the UI immediately
```

---

### Visual Flow Diagram:

```
┌──────────────────────────────────────────────────────────────┐
│  REACT (Browser - port 3000)                                 │
│                                                              │
│  User clicks "Save Item"                                     │
│  → axios.post("/api/items/", {name: "Learn MongoDB"})        │
│  → Adds Authorization: Bearer <token> header                 │
└──────────────────────────┬───────────────────────────────────┘
                           │ HTTP POST Request
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  FASTAPI SERVER (port 5000)                                  │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ MIDDLEWARE: CORS check ✅                            │     │
│  └────────────────────────┬────────────────────────────┘     │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ AUTH: JWT token verify ✅                            │     │
│  └────────────────────────┬────────────────────────────┘     │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ SCHEMA: Pydantic validation ✅                       │     │
│  └────────────────────────┬────────────────────────────┘     │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ ROUTE: item_routes.py → create_item()               │     │
│  └────────────────────────┬────────────────────────────┘     │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ CONTROLLER: item_controller.py → create_new_item()  │     │
│  └────────────────────────┬────────────────────────────┘     │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ MODEL: item_model.py → create()                     │     │
│  └────────────────────────┬────────────────────────────┘     │
│                           │                                  │
└───────────────────────────┼──────────────────────────────────┘
                           │ insert_one()
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  MONGODB                                                     │
│                                                              │
│  Database: items_db                                          │
│  Collection: items                                           │
│  New Document: {_id: ObjectId(...), name: "Learn MongoDB"}   │
└──────────────────────────────────────────────────────────────┘
```

---

## Part 7: JWT Authentication Flow — Complete Walkthrough

### 7.1 Registration Flow

**Scenario:** New user registers with name, email, and password.

```
User fills Register form:
  Name: "John Doe"
  Email: "john@example.com"
  Password: "secret123"

→ POST /api/auth/register
  Body: {"name": "John Doe", "email": "john@example.com", "password": "secret123"}

→ auth_routes.py: register()
  → Pydantic validates: name min 2 chars? ✅ email min 5? ✅ password min 6? ✅

→ auth_controller.py: register_user()
  1. Check if email exists in DB → user_model.find_by_email("john@example.com")
     → Not found → OK, continue ✅
     → (If found → 400 "Email already registered" ❌)

  2. Create user → user_model.create(data)
     → hash_password("secret123") → "$2b$12$xKj9..."
     → MongoDB insert: {name: "John Doe", email: "john@example.com", password: "$2b$12$..."}

  3. Create JWT token → create_access_token({"sub": "john@example.com"})
     → Token: "eyJhbGciOi..."

  4. Return response:
     {
       "access_token": "eyJhbGciOi...",
       "token_type": "bearer",
       "user": {"id": "64a...", "name": "John Doe", "email": "john@example.com"}
     }

→ React receives response:
  localStorage.setItem("token", "eyJhbGciOi...")
  localStorage.setItem("user", JSON.stringify({name: "John Doe", ...}))
  → User is now logged in, redirected to Dashboard
```

### 7.2 Login Flow

```
User fills Login form:
  Email: "john@example.com"
  Password: "secret123"

→ POST /api/auth/login

→ auth_controller.py: login_user()
  1. Find user by email → user_model.find_by_email("john@example.com")
     → Found: {_id: ..., name: "John Doe", email: "john@...", password: "$2b$12$..."}

  2. Verify password → verify_password("secret123", "$2b$12$xKj9...")
     → bcrypt.checkpw() → True ✅

  3. Create JWT token → "eyJhbGciOi..."

  4. Return: {"access_token": "...", "user": {...}}

→ React saves token → Redirects to Dashboard
```

### 7.3 Accessing Protected Routes

```
User is on Dashboard, React loads items:

→ GET /api/items/
  Headers: Authorization: Bearer eyJhbGciOi...

→ FastAPI runs get_current_user() (the Depends dependency):
  1. Extract "eyJhbGciOi..." from header
  2. jwt.decode() → payload: {"sub": "john@example.com", "exp": 1727200000}
  3. Check: is current time > exp? NO → token is valid ✅
  4. Return: {"email": "john@example.com"}

→ Route function runs → Controller → Model → MongoDB → Items returned
```

### 7.4 Token Expiration

```
60 minutes later...

→ GET /api/items/
  Headers: Authorization: Bearer eyJhbGciOi... (same old token)

→ get_current_user():
  1. jwt.decode() checks "exp" field
  2. Current time > expiry time → Token EXPIRED ❌
  3. Raises HTTPException(401, "Invalid or expired token")

→ React receives 401 response
→ API interceptor catches it:
     if (error.response.status === 401) {
       localStorage.removeItem("token");
       window.location.href = "/login";
     }
→ User is redirected to login page
```

---

## Part 8: React Frontend — How API Data is Displayed

### 8.1 API Client Setup (`services/api.js`)

```javascript
import axios from "axios";

// Create an axios instance with base URL
const API = axios.create({ baseURL: "/api" });

// INTERCEPTOR: Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// INTERCEPTOR: Handle 401 errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

**What interceptors do:**
- **Request interceptor** — Before EVERY API call, add the JWT token to the headers automatically. You don't need to manually add it each time.
- **Response interceptor** — If ANY API call returns 401 (unauthorized), automatically log out and redirect to login.

### 8.2 Auth Context (`context/AuthContext.jsx`)

```jsx
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await authAPI.login({ email, password });
    const { access_token, user: userData } = response.data;
    localStorage.setItem("token", access_token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

**How it works:**
- `AuthProvider` wraps the entire app
- Any component can call `useAuth()` to get `user`, `login()`, or `logout()`
- Login stores token in localStorage (survives page refresh)
- Logout removes token → user state becomes null → protected routes redirect to login

### 8.3 Protected Routes (`App.jsx`)

```jsx
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
}

// Usage:
<Route path="/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
```

**How it works:** If `user` is null (not logged in), the component redirects to `/login` instead of showing the Dashboard.

### 8.4 Displaying Data (`Dashboard.jsx`)

```jsx
const [items, setItems] = useState([]);

// Load items when component mounts
useEffect(() => {
  const fetchItems = async () => {
    const response = await itemAPI.getAll();  // GET /api/items/
    setItems(response.data);                   // Store in state
  };
  fetchItems();
}, []);

// Add item
const addItem = async (item) => {
  const response = await itemAPI.create(item);       // POST /api/items/
  setItems([...items, response.data]);                // Add to existing list
};

// Delete item
const deleteItem = async (id) => {
  await itemAPI.delete(id);                           // DELETE /api/items/{id}
  setItems(items.filter(item => item.id !== id));     // Remove from list
};
```

**The cycle:**
1. Component loads → `useEffect` runs → API call → data stored in state
2. State changes → React re-renders → UI shows updated data
3. User action (add/edit/delete) → API call → update state → UI updates

---

## Part 9: MVC Pattern — Why We Separate Code

### What is MVC?

**MVC = Model - View - Controller**

It's a way to organize code so that each file has exactly ONE responsibility.

```
┌─────────────────────────────────────────────────────┐
│                    REQUEST                           │
└────────────────────────┬────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│  ROUTES (View Layer)                                │
│                                                     │
│  Responsibility:                                    │
│  • Define URL paths and HTTP methods                │
│  • Validate incoming data (via Pydantic)            │
│  • Call the appropriate controller function         │
│                                                     │
│  Does NOT: write database queries, handle errors    │
└────────────────────────┬────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│  CONTROLLER (Logic Layer)                           │
│                                                     │
│  Responsibility:                                    │
│  • Business logic and decisions                     │
│  • Error handling (what if item not found?)         │
│  • Call the model for database operations           │
│                                                     │
│  Does NOT: define URLs, write database queries      │
└────────────────────────┬────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│  MODEL (Data Layer)                                 │
│                                                     │
│  Responsibility:                                    │
│  • Direct database operations (CRUD)                │
│  • Data serialization (ObjectId → string)           │
│                                                     │
│  Does NOT: know about HTTP, handle errors,          │
│  define URLs                                        │
└─────────────────────────────────────────────────────┘
```

### Why use MVC? Benefits:

| Benefit | Explanation |
|---------|-------------|
| **Easy to find bugs** | Error in database? Look at model. Error in validation? Look at schema. Error in logic? Look at controller. |
| **Easy to add features** | New feature = new route file + controller file + model file. No existing code changes needed. |
| **Easy for teams** | Developer A works on routes, Developer B works on models — no conflicts. |
| **Easy to test** | Test models without HTTP. Test controllers without database. |
| **Easy to maintain** | Each file is small and focused. Reading 50-line files is easier than reading one 500-line file. |

---

## Part 10: Important Python Concepts in This Project

### 10.1 Decorators (`@`)

A decorator is a function that wraps another function to add extra behavior.

```python
@router.get("/")
def get_items():
    return item_controller.get_all_items()
```

The `@router.get("/")` decorator tells FastAPI: "When a GET request comes to `/`, run the function below it."

Without a decorator, you'd have to write:
```python
def get_items():
    return item_controller.get_all_items()

router.add_route("/", get_items, methods=["GET"])  # More verbose
```

### 10.2 Type Hints

```python
def get_by_id(item_id: str) -> dict | None:
```

- `item_id: str` → This parameter should be a string
- `-> dict | None` → This function returns either a dictionary or None
- These are hints for developers and IDEs — Python doesn't enforce them at runtime
- But Pydantic and FastAPI USE them for validation

### 10.3 Dictionaries (Key-Value Data)

```python
new_item = {
    "name": data["name"],           # Access value by key (throws error if missing)
    "description": data.get("description", ""),  # Access with default (no error)
}
```

- `data["name"]` → Get value at key "name". If key doesn't exist → `KeyError`
- `data.get("description", "")` → Get value at key "description". If missing → return `""`

### 10.4 List Comprehension

```python
# Short way:
return [serialize(item) for item in items]

# Long way (same result):
result = []
for item in items:
    result.append(serialize(item))
return result
```

### 10.5 F-strings (Formatted Strings)

```python
name = "MongoDB"
print(f"Connected to {name}")  # Output: "Connected to MongoDB"
```

The `f` before the string allows you to embed variables inside `{}`.

### 10.6 Async/Await (Used in FastAPI Events)

```python
@app.on_event("startup")
async def startup():
    connect_db()
```

- `async` means the function can run without blocking other operations
- FastAPI supports both sync and async functions
- For our project, the route handlers are synchronous (normal functions) — which is fine for MongoDB operations

---

## Part 11: Swagger UI — Free Interactive Documentation

FastAPI automatically generates interactive API documentation.

**Access it at:** `http://localhost:5000/docs`

**What you can do there:**
1. See all available endpoints with their methods, parameters, and schemas
2. Click "Try it out" on any endpoint to test it directly in the browser
3. Add your JWT token via the "Authorize" button (lock icon) to test protected routes
4. See request/response examples and error responses

**This is FREE** — you don't write any extra code. FastAPI generates it from your route decorators, Pydantic schemas, and docstrings.

---

## Part 12: Quick Reference

### Start the Server:
```bash
cd server
venv\Scripts\activate
python main.py
```

### API Endpoints Summary:

| Method | URL | Auth Required | Purpose |
|--------|-----|---------------|---------|
| POST | /api/auth/register | No | Create new account |
| POST | /api/auth/login | No | Get JWT token |
| GET | /api/auth/me | Yes | Get current user info |
| GET | /api/items/ | Yes | Get all items |
| GET | /api/items/{id} | Yes | Get one item |
| POST | /api/items/ | Yes | Create item |
| PUT | /api/items/{id} | Yes | Update item |
| DELETE | /api/items/{id} | Yes | Delete item |

### Test with curl:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@mail.com\",\"password\":\"test123\"}"

# Login (copy the access_token from response)
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@mail.com\",\"password\":\"test123\"}"

# Get all items (replace YOUR_TOKEN with actual token)
curl http://localhost:5000/api/items/ -H "Authorization: Bearer YOUR_TOKEN"

# Create item
curl -X POST http://localhost:5000/api/items/ -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_TOKEN" -d "{\"name\":\"New Item\",\"description\":\"Details here\"}"
```

---

## Summary Table — What Each Layer Does

| Layer | File(s) | Responsibility | Talks To |
|-------|---------|---------------|----------|
| Entry Point | `main.py` | Start the server | App Factory |
| Configuration | `config.py`, `.env` | Load settings | Environment |
| Database | `database.py` | Open/close MongoDB connection | MongoDB |
| Authentication | `auth.py` | Hash passwords, create/verify JWT | Config |
| Schemas | `schemas/*.py` | Validate request/response shapes | Nothing (pure definitions) |
| Routes | `routes/*.py` | Map URLs to controllers | Controllers, Auth |
| Controllers | `controllers/*.py` | Business logic, error handling | Models |
| Models | `models/*.py` | Direct database CRUD operations | Database |

---

## Next Steps for Learning

1. **Run the server** and visit `http://localhost:5000/docs` — try every endpoint interactively
2. **Install MongoDB Compass** — visually see your database, collections, and documents
3. **Use Postman** — test API calls manually with a nice UI
4. **Read the error messages** — FastAPI gives very detailed error responses
5. **Add a new feature** — try adding a "search" endpoint that filters items by name
6. **Add timestamps** — store `created_at` when items are created
7. **Add pagination** — return 10 items per page instead of all at once
