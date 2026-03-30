from fastapi import APIRouter, Depends
from models.user import User
from dependencies.auth_dependencies import get_current_user

router = APIRouter()

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email
    }