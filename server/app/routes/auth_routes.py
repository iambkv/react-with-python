"""
Auth Routes — login and registration endpoints.
"""
from fastapi import APIRouter, Depends
from app.schemas.auth_schema import UserRegister, UserLogin, TokenResponse, UserResponse
from app.controllers import auth_controller
from app.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


# ─── POST /api/auth/register ─────────────────────────────────────────────────
@router.post("/register", response_model=TokenResponse, status_code=201)
def register(user: UserRegister):
    """
    Register a new user.
    Returns JWT token on successful registration.
    """
    return auth_controller.register_user(user.model_dump())


# ─── POST /api/auth/login ────────────────────────────────────────────────────
@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin):
    """
    Login with email and password.
    Returns JWT token on success.
    """
    return auth_controller.login_user(user.model_dump())


# ─── GET /api/auth/me ────────────────────────────────────────────────────────
@router.get("/me", response_model=UserResponse)
def get_me(current_user: dict = Depends(get_current_user)):
    """
    Get the current logged-in user's info.
    Requires valid JWT token in Authorization header.
    """
    from app.models import user_model
    user = user_model.find_by_email(current_user["email"])
    if not user:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="User not found")
    return user_model.serialize(user)
