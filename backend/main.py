from fastapi import FastAPI, Depends

from database import engine, Base
from models.user import User
from models.resume import Resume

from dependencies.db_dependencies import get_db

from services.user_services import create_user_service

from sqlalchemy.orm import Session

from schemas.user_schema import UserCreate, UserResponse

from api.resume_routes import router as resume_router

from api.auth_routes import router as auth_router
from api.user_routes import router as user_router

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)

app.include_router(user_router, prefix="/users", tags=["users"])
app.include_router(resume_router)

Base.metadata.create_all(bind=engine)

@app.post(
    "/users",
    response_model=UserResponse,
    status_code=201,
    responses={400: {"description": "Email already registered"}}
)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user_service(db, user.email, user.password)
