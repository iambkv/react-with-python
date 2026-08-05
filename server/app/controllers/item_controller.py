"""
Item Controller — handles the business logic for item operations.

This is the "C" in MVC. The controller:
  1. Receives validated data from the route (FastAPI + Pydantic handle validation)
  2. Calls the Model to perform the database operation
  3. Returns the result (the route will convert it to HTTP response)

The controller does NOT:
  - Talk to the database directly (that's the Model's job)
  - Define URL paths (that's the Route's job)
  - Validate request data (Pydantic schemas handle that)
"""
from fastapi import HTTPException
from app.models import item_model


def get_all_items() -> list[dict]:
    """Get all items from the database."""
    return item_model.get_all()


def get_single_item(item_id: str) -> dict:
    """
    Get a single item by ID.
    Raises 404 if not found.
    """
    item = item_model.get_by_id(item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found or invalid ID")
    return item


def create_new_item(data: dict) -> dict:
    """Create a new item and return it."""
    return item_model.create(data)


def update_existing_item(item_id: str, data: dict) -> dict:
    """
    Update an existing item.
    Raises 404 if not found.
    """
    item = item_model.update(item_id, data)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found or invalid ID")
    return item


def delete_existing_item(item_id: str) -> dict:
    """
    Delete an item.
    Raises 404 if not found, 400 if invalid ID.
    """
    result = item_model.delete(item_id)

    if result is None:
        raise HTTPException(status_code=400, detail="Invalid item ID")
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")

    return {"message": "Item deleted successfully"}
