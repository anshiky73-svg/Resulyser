SKILL_WEIGHTS = {
    "python": 10,
    "fastapi": 9,
    "django": 8,
    "flask": 7,
    "sql": 8,
    "postgresql": 8,
    "mysql": 7,
    "docker": 9,
    "kubernetes": 9,
    "aws": 10,
    "git": 6,
    "javascript": 7,
    "react": 7,
    "html": 5,
    "css": 5,
    "machine learning": 10,
    "scikit-learn": 9,
    "pandas": 8,
    "numpy": 8
}


def score_resume(skills, resume_text):

    score = 0

    # Skill weighted score
    for skill in skills:
        score += SKILL_WEIGHTS.get(skill, 5)

    # Resume length score
    word_count = len(resume_text.split())

    if 200 <= word_count <= 600:
        score += 20
    elif word_count > 600:
        score += 10
    else:
        score += 5

    # Skill diversity bonus
    if len(skills) >= 8:
        score += 15
    elif len(skills) >= 5:
        score += 10
    elif len(skills) >= 3:
        score += 5

    return min(score, 100)