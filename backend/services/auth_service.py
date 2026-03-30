from sqlalchemy.orm import Session
from repositories.user_repositories import get_user_by_email
from security.auth import verify_password, create_access_token
from fastapi import HTTPException

def login_user_service(db: Session, email: str, password: str):

    user = get_user_by_email(db, email)

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token_data = {"sub": str(user.id)}

    access_token = create_access_token(token_data)

    return {"access_token": access_token, "token_type": "bearer"}