"""
Schemas — defines the shape of request and response data using Pydantic.

Pydantic automatically validates incoming data:
  - If 'name' is missing in a POST request → FastAPI returns a clear error
  - No manual validation needed in controllers

These schemas are like a "contract" between frontend and backend.
"""
from pydantic import BaseModel, Field
from typing import Optional


class ItemCreate(BaseModel):
    """
    Schema for creating a new item.
    Used in: POST /api/items

    Fields:
      - name (required): The item's name
      - description (optional): A short description
    """
    name: str = Field(..., min_length=1, example="Learn FastAPI")
    description: Optional[str] = Field(default="", example="Study the documentation")


class ItemUpdate(BaseModel):
    """
    Schema for updating an existing item.
    Used in: PUT /api/items/{id}

    Fields:
      - name (required): Updated name
      - description (optional): Updated description
    """
    name: str = Field(..., min_length=1, example="Learn FastAPI")
    description: Optional[str] = Field(default="", example="Build a CRUD app")


class ItemResponse(BaseModel):
    """
    Schema for item responses.
    This is what the API sends back to the frontend.

    Fields:
      - id: MongoDB ObjectId as a string
      - name: The item's name
      - description: The item's description
    """
    id: str
    name: str
    description: str


class MessageResponse(BaseModel):
    """Generic message response (e.g., for delete confirmation)."""
    message: str
