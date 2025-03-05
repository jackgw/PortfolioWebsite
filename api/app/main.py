import uvicorn
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(debug=True)
router = APIRouter(prefix="/api/v1")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["Get", "Post", "Put", "Delete"],
    allow_headers=["*"],    
)

# Routes
@router.get("/status")
async def status():
    return {"API Status": "Active"}

# Register router
app.include_router(router)

# Start App
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=80, reload=True)