import uvicorn
import os
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from config import API_VERSION, API_PREFIX

# Sub-Routers
from routers.email import router as EmailRouter

db_url = os.environ.get("DATABASE_URL")

app = FastAPI(
    debug=True,
    docs_url=f"{API_PREFIX}/docs",    # Swagger UI
    redoc_url=f"{API_PREFIX}/redoc",   # Redoc UI
    openapi_url=f"{API_PREFIX}/openapi.json"  # OpenAPI schema
)
router = APIRouter(prefix=API_PREFIX)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],    
)

# Status
@app.get("/")
async def status():
    return {"API Status": "Active"}

# Version
@router.get("/version")
async def version():
    return {"API Version": API_VERSION}

# Register router(s)
app.include_router(router, tags=["utility"])
app.include_router(EmailRouter, prefix=f"{API_PREFIX}/email", tags=["email"])

# Start App
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=80, reload=True)