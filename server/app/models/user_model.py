"""
User Model — database operations for the 'users' collection.

Handles user registration and lookup for authentication.
"""
from bson import ObjectId
from app.database import get_db
from app.auth import hash_password


def _get_collection():
    """Get the 'users' collection from MongoDB."""
    return get_db()["users"]


def serialize(user: dict) -> dict:
    """Convert MongoDB user document to JSON-friendly dict."""
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
    }


def find_by_email(email: str) -> dict | None:
    """Find a user by email. Returns full document (including password hash)."""
    return _get_collection().find_one({"email": email})


def create(data: dict) -> dict:
    """
    Create a new user with hashed password.
    Returns the user (without password).
    """
    new_user = {
        "name": data["name"],
        "email": data["email"],
        "password": hash_password(data["password"]),
    }
    result = _get_collection().insert_one(new_user)
    new_user["_id"] = result.inserted_id
    return serialize(new_user)
