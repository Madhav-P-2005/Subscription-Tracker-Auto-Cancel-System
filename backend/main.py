from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.api import router

app = FastAPI(title="Smart Subscription Tracker API")

# Add CORS middleware to allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development, allow all. In production limit to React URL.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Smart Subscription Tracker API"}
