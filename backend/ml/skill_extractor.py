import re

# Basic skill database (can expand later)
SKILLS_DB = [
    "python",
    "fastapi",
    "django",
    "flask",
    "sql",
    "postgresql",
    "mysql",
    "docker",
    "kubernetes",
    "aws",
    "git",
    "javascript",
    "react",
    "html",
    "css",
    "machine learning",
    "scikit-learn",
    "pandas",
    "numpy"
]

def extract_skills(text: str):
    text = text.lower()
    found_skills = []
    
    for skill in SKILLS_DB:
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text):
            found_skills.append(skill)
            
    return list(set(found_skills))  # Remove duplicates if any  
    