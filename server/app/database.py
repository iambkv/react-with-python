"""
Database — handles MongoDB connection.

Provides:
  - connect_db()  → opens connection (called on server startup)
  - close_db()    → closes connection (called on server shutdown)
  - get_db()      → returns database instance (used in models)
"""
from pymongo import MongoClient
from app.config import settings

# Module-level variables for the connection
client: MongoClient = None
db = None


def connect_db():
    """Open MongoDB connection using settings from .env file."""
    global client, db
    client = MongoClient(settings.MONGO_URI)
    db = client[settings.DB_NAME]
    print(f"✅ Connected to MongoDB: {settings.DB_NAME}")


def close_db():
    """Close the MongoDB connection."""
    global client
    if client:
        client.close()
        print("🔌 MongoDB connection closed")


def get_db():
    """Return the database instance. Used by models to access collections."""
    return db
