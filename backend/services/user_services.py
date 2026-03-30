from repositories.user_repositories import get_user_by_email, create_user
from passlib.context import CryptContext
from fastapi import HTTPException
from sqlalchemy.orm import Session

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    return pwd_context.hash(password)


def create_user_service(db: Session, email: str, password: str):
    #  Check duplicate email
    existing_user = get_user_by_email(db, email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password
    hashed_password = hash_password(password)

    # Create user via repository
    new_user = create_user(db, email, hashed_password)

    #  Return safe response (no password)
    return {
        "id": new_user.id,
        "email": new_user.email,
        "created_at": new_user.created_at
    }