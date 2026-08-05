"""
Item Model — all database operations for the 'items' collection.

This is the "M" in MVC.
The model ONLY talks to MongoDB. It does NOT know about HTTP or requests.

Functions:
    get_all()        → returns all items
    get_by_id(id)    → returns one item by ID
    create(data)     → inserts a new item
    update(id, data) → updates an existing item
    delete(id)       → removes an item
"""
from bson import ObjectId
from bson.errors import InvalidId
from app.database import get_db


def _get_collection():
    """Get the 'items' collection from MongoDB."""
    return get_db()["items"]


def serialize(item: dict) -> dict:
    """
    Convert MongoDB document → Python dict for API response.

    MongoDB stores _id as ObjectId (not JSON-serializable),
    so we convert it to a regular string.
    """
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "description": item.get("description", ""),
    }


def get_all() -> list[dict]:
    """Fetch all items from the database."""
    items = _get_collection().find()
    return [serialize(item) for item in items]


def get_by_id(item_id: str) -> dict | None:
    """
    Fetch a single item by its ID.
    Returns None if ID is invalid or item not found.
    """
    try:
        item = _get_collection().find_one({"_id": ObjectId(item_id)})
    except (InvalidId, Exception):
        return None
    return serialize(item) if item else None


def create(data: dict) -> dict:
    """
    Insert a new item into the database.
    Returns the created item with its generated ID.
    """
    new_item = {
        "name": data["name"],
        "description": data.get("description", ""),
    }
    result = _get_collection().insert_one(new_item)
    new_item["_id"] = result.inserted_id
    return serialize(new_item)


def update(item_id: str, data: dict) -> dict | None:
    """
    Update an existing item.
    Returns the updated item, or None if not found/invalid ID.
    """
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
    """
    Delete an item by ID.
    Returns:
      True  → item was deleted
      False → item not found
      None  → invalid ID
    """
    try:
        result = _get_collection().delete_one({"_id": ObjectId(item_id)})
    except (InvalidId, Exception):
        return None

    return result.deleted_count > 0
