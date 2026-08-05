"""
App Factory — creates and configures the FastAPI application.

Wires together:
  1. CORS middleware
  2. MongoDB connection (startup/shutdown)
  3. Auth routes (login, register)
  4. Item routes (CRUD — protected)
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import connect_db, close_db
from app.routes.item_routes import router as item_router
from app.routes.auth_routes import router as auth_router


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""

    app = FastAPI(
        title="Items CRUD API",
        description="A CRUD API with JWT authentication — FastAPI + MongoDB",
        version="2.0.0",
    )

    # ─── CORS Middleware ─────────────────────────────────────────────────
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ─── Startup & Shutdown Events ──────────────────────────────────────
    @app.on_event("startup")
    async def startup():
        connect_db()

    @app.on_event("shutdown")
    async def shutdown():
        close_db()

    # ─── Register Routes ────────────────────────────────────────────────
    app.include_router(auth_router, prefix="/api")  # /api/auth/*
    app.include_router(item_router, prefix="/api")  # /api/items/*

    return app
