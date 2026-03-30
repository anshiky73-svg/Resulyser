from pydantic import BaseModel
from datetime import datetime


class ResumeResponse(BaseModel):
    id: int
    file_name: str
    file_path: str
    resume_text: str
    skills: list[str]
    score: int
    uploaded_at: datetime

    class Config:
        from_attributes = True

class JobMatchRequest(BaseModel):
    resume_id: int
    job_description: str        