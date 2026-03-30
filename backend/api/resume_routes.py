from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from dependencies.db_dependencies import get_db
from dependencies.auth_dependencies import get_current_user

from services.resume_service import upload_resume_service
from schemas.resume_schema import ResumeResponse

from schemas.resume_schema import JobMatchRequest
from services.resume_service import match_resume_with_job

from services.resume_service import get_resume_history_service

from services.resume_service import get_resume_dashboard_service

from services.resume_service import get_resume_progress_service

from services.resume_service import delete_resume_service

from services.resume_service import update_resume_service

from services.resume_service import download_resume_service

router = APIRouter(prefix="/resume", tags=["resume"])


@router.post("/upload", response_model=ResumeResponse)
def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return upload_resume_service(db, current_user, file)
@router.post("/match")
def match_resume(
    request: JobMatchRequest,
    db: Session = Depends(get_db)
    ):
    return match_resume_with_job(
    db,
    request.resume_id,
    request.job_description
    )

@router.get("/history")    
def get_resume_history(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_resume_history_service(db, current_user)

@router.get("/dashboard")
def get_resume_dashboard(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_resume_dashboard_service(db, current_user)

@router.get("/progress")
def get_resume_progress(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_resume_progress_service(db, current_user)

@router.delete("/{resume_id}")
def delete_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return delete_resume_service(db, current_user, resume_id)

@router.put("/{resume_id}")
def update_resume(
    resume_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return update_resume_service(db, current_user, resume_id, file)

@router.get("/{resume_id}/download")
def download_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return download_resume_service(db, current_user, resume_id)