import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from config import POSTGRES_URL, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB, NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD
# from app.routers import login.py, register.py

app = FastAPI(debug=True)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["Get", "Post", "Put", "Delete"],
    allow_headers=["*"],    
)

# register routers
# app.include_router(auth.router, prefix="/auth")

@app.get("/")
async def hello():
    return {"message": "Hello World!"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=80, reload=True)