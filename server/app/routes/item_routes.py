"""
Item Routes — CRUD endpoints for items (PROTECTED with JWT).

All routes here require a valid JWT token in the Authorization header.
"""
from fastapi import APIRouter, Depends
from app.schemas.item_schema import ItemCreate, ItemUpdate, ItemResponse, MessageResponse
from app.controllers import item_controller
from app.auth import get_current_user

# All routes in this router require authentication
router = APIRouter(prefix="/items", tags=["Items"], dependencies=[Depends(get_current_user)])


@router.get("/", response_model=list[ItemResponse])
def get_items():
    """Get all items (requires authentication)."""
    return item_controller.get_all_items()


@router.get("/{item_id}", response_model=ItemResponse)
def get_item(item_id: str):
    """Get a single item by ID (requires authentication)."""
    return item_controller.get_single_item(item_id)


@router.post("/", response_model=ItemResponse, status_code=201)
def create_item(item: ItemCreate):
    """Create a new item (requires authentication)."""
    return item_controller.create_new_item(item.model_dump())


@router.put("/{item_id}", response_model=ItemResponse)
def update_item(item_id: str, item: ItemUpdate):
    """Update an existing item (requires authentication)."""
    return item_controller.update_existing_item(item_id, item.model_dump())


@router.delete("/{item_id}", response_model=MessageResponse)
def delete_item(item_id: str):
    """Delete an item (requires authentication)."""
    return item_controller.delete_existing_item(item_id)
