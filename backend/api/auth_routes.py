from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from services.auth_service import login_user_service
from dependencies.db_dependencies import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
def login(form_data:OAuth2PasswordRequestForm = Depends(),db: Session = Depends(get_db)):
    return login_user_service(db, form_data.username, form_data.password)