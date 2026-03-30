COMMON_SKILLS = [
    "python",
    "fastapi",
    "django",
    "docker",
    "kubernetes",
    "aws",
    "sql",
    "mongodb",
    "git",
    "html",
    "css",
    "javascript"
]


def extract_job_skills(job_description):

    job_description = job_description.lower()

    found_skills = []

    for skill in COMMON_SKILLS:
        if skill in job_description:
            found_skills.append(skill)

    return found_skills