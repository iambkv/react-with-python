"""
Entry Point — starts the FastAPI server.

Run this file:
    python main.py

Or use uvicorn directly:
    uvicorn main:app --reload --port 5000
"""
import uvicorn
from app import create_app

# Create the FastAPI application
app = create_app()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
