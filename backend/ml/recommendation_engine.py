def generate_recommendations(missing_skills, resume_score, job_match):

    recommendations = []

    # Skill-based recommendations
    for skill in missing_skills:
        recommendations.append(
            f"Consider learning {skill} to improve your compatibility with this job."
        )

    # Resume quality recommendations
    if resume_score < 50:
        recommendations.append(
            "Your resume score is low. Consider adding more technical projects or achievements."
        )

    if resume_score < 70:
        recommendations.append(
            "Improve your resume by highlighting measurable achievements in your experience."
        )

    # Job match feedback
    if job_match < 40:
        recommendations.append(
            "Your resume has low similarity with this job description. Try aligning your skills with the job requirements."
        )

    return recommendations