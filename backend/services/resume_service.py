import shutil
import uuid
from fastapi import HTTPException
from repositories.resume_repository import get_user_resume_count
from repositories.resume_repository import create_resume

from utils.file_storage import save_uploaded_file
from utils.pdf_parser import extract_text_from_pdf

from ml.skill_extractor import extract_skills
from ml.resume_scorer import score_resume

from ml.job_matcher import calculate_job_match
from models.resume import Resume

from ml.job_skill_extractor import extract_job_skills
from ml.skill_gap_analyzer import find_missing_skills

from ml.recommendation_engine import generate_recommendations

from repositories.resume_repository import get_user_resumes

from repositories.resume_repository import get_user_resume_stats

from repositories.resume_repository import get_user_resume_progress

from repositories.resume_repository import delete_resume

from repositories.resume_repository import get_resume_by_id

from fastapi.responses import FileResponse

from repositories.resume_repository import get_resume_for_download

def upload_resume_service(db, user, file):
    
    resume_count = get_user_resume_count(db, user.id)
    if resume_count >= 5:
        raise HTTPException(status_code=403, detail="Free users can only upload up to 5 resumes. Please upgrade to premium for more uploads.")
    
    
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
    )
        
    contents = file.file.read()
    
    if len(contents) > 2 * 1024 * 1024:  # 2MB limit
        raise HTTPException(
            status_code=400,
            detail="File size exceeds the 2MB limit"
        )
    
    file.file.seek(0)          

    unique_name = f"{uuid.uuid4()}_{file.filename}"

    file_path = save_uploaded_file(file)

    resume_text = extract_text_from_pdf(file_path)
    
    skills = extract_skills(resume_text)
    
    score = score_resume(skills, resume_text)

    file_path = f"uploads/resumes/{unique_name}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume = create_resume(
        db,
        user.id,
        file.filename,
        file_path,
        resume_text,
        skills,
        score
    )



    return resume


def match_resume_with_job(db, resume_id, job_description):

    # Fetch resume from database
    resume = db.query(Resume).filter(Resume.id == resume_id).first()

    # If resume not found
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    # Calculate similarity between resume and job description
    match_score = calculate_job_match(resume.resume_text, job_description)
    
    # calculating final score by combining resume score and job match score
    
    final_score = round((resume.score * 0.4) + (match_score * 0.6), 2)
    # Extract skills from job description
    job_skills = extract_job_skills(job_description)

    # Find missing skills
    missing_skills = find_missing_skills(resume.skills, job_skills)
    
    # Generate recommendations based on missing skills, resume score, and job match score
    recommendations = generate_recommendations(missing_skills, resume.score, match_score)

    return {
        "resume_id": resume_id,
        "job_match": round(match_score, 2),
        "resume_score": round(resume.score, 2),
        "final_score": final_score,
        "skills_found": resume.skills,
        "missing_skills": missing_skills,
        "recommendations": recommendations
    }

def get_resume_history_service(db, user):

    resumes = get_user_resumes(db, user.id)

    history = []
    for resume in resumes:
        history.append({
            "id": resume.id,
            "file_name": resume.file_name,
            "uploaded_at": resume.uploaded_at,
            "score": resume.score
        })

    return history    

    
def get_resume_dashboard_service(db, user):

    resumes = get_user_resume_stats(db, user.id)

    total_resumes = len(resumes)

    scores = [resume.score for resume in resumes if resume.score is not None]

    if scores:
        average_score = sum(scores) / len(scores)
        best_score = max(scores)
    else:
        average_score = 0
        best_score = 0

    return {
        "total_resumes": total_resumes,
        "average_score": round(average_score, 2),
        "best_resume_score": best_score
    }  

def get_resume_progress_service(db, user):

    resumes = get_user_resume_progress(db, user.id)

    progress = []
    for resume in resumes:
        
        if resume.score is not None:
            progress.append({
            "id": resume.id,
            "file_name": resume.file_name,
            "uploaded_at": resume.uploaded_at,
            "score": resume.score
        })

    return progress  

def delete_resume_service(db, user, resume_id):
    resume = delete_resume(db, resume_id, user.id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found ") 
    
    return {"message": "Resume deleted successfully"}   

def update_resume_service(db, user, resume_id, file):

    resume = get_resume_by_id(db, resume_id, user.id)

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    # validate file
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    # save new file
    file_path = save_uploaded_file(file)

    # extract text
    resume_text = extract_text_from_pdf(file_path)

    # extract skills
    skills = extract_skills(resume_text)

    # score resume
    score = score_resume(skills, resume_text)

    # update database
    resume.file_name = file.filename
    resume.file_path = file_path
    resume.resume_text = resume_text
    resume.skills = skills
    resume.score = score

    db.commit()
    db.refresh(resume)

    return resume

def download_resume_service(db, user, resume_id):

    resume = get_resume_for_download(db, resume_id, user.id)

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return FileResponse(
        path=resume.file_path,
        filename=resume.file_name,
        media_type="application/pdf"
    )