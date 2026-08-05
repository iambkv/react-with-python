"""
Auth Controller — handles registration and login logic.
"""
from fastapi import HTTPException, status
from app.models import user_model
from app.auth import verify_password, create_access_token


def register_user(data: dict) -> dict:
    """
    Register a new user.
    - Checks if email already exists
    - Hashes password
    - Creates user in DB
    - Returns JWT token
    """
    existing = user_model.find_by_email(data["email"])
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    user = user_model.create(data)

    # Create JWT token for immediate login after registration
    token = create_access_token(data={"sub": user["email"]})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user,
    }


def login_user(data: dict) -> dict:
    """
    Authenticate user with email/password.
    Returns JWT token on success.
    """
    user = user_model.find_by_email(data["email"])

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(data["password"], user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Create JWT token
    token = create_access_token(data={"sub": user["email"]})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
        },
    }
