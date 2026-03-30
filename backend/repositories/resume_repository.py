from models.resume import Resume


def create_resume(db, user_id, file_name, file_path, resume_text, skills, score):

    new_resume = Resume(
        user_id=user_id,
        file_name=file_name,
        file_path=file_path,
        resume_text=resume_text,
        skills=skills,
        score=score
    )

    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    return new_resume

def get_user_resume_count(db, user_id):

    return db.query(Resume).filter(
        Resume.user_id == user_id
    ).count()
    
def get_user_resumes(db, user_id):

    return db.query(Resume).filter(
        Resume.user_id == user_id
    ).all()    

def get_user_resume_stats(db, user_id):
    return db.query(Resume).filter(
        Resume.user_id == user_id
    ).all()  

def get_user_resume_progress(db, user_id):
    return (db.query(Resume).filter(
        Resume.user_id == user_id).order_by(Resume.uploaded_at)).all()      

def delete_resume(db, resume_id, user_id):
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == user_id
    ).first()

    if resume:
        db.delete(resume)
        db.commit()
        
    return resume    

def get_resume_by_id(db, resume_id, user_id):
    return db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == user_id
    ).first()
    
def get_resume_for_download(db, resume_id, user_id):
    return (
    db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == user_id
    ).first()
    )    