from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

from database import Base

from sqlalchemy.sql import func
from sqlalchemy import Text
from sqlalchemy import JSON

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    file_name = Column(String)
    file_path = Column(String)
    
    resume_text = Column(Text)
    
    skills = Column(JSON)
    score = Column(Integer)

    uploaded_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="resumes")