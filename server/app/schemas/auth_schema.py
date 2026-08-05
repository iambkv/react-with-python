"""
Auth Schemas — request/response validation for authentication endpoints.
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserRegister(BaseModel):
    """Schema for user registration."""
    name: str = Field(..., min_length=2, example="John Doe")
    email: str = Field(..., min_length=5, example="john@example.com")
    password: str = Field(..., min_length=6, example="secret123")


class UserLogin(BaseModel):
    """Schema for user login."""
    email: str = Field(..., example="john@example.com")
    password: str = Field(..., example="secret123")


class TokenResponse(BaseModel):
    """Schema for login response with JWT token."""
    access_token: str
    token_type: str = "bearer"
    user: dict


class UserResponse(BaseModel):
    """Schema for user info response."""
    id: str
    name: str
    email: str
