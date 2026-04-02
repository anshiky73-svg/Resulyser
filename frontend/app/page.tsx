"use client"
export const dynamic = "force-dynamic";
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { API_URL } from "@/lib/api"
import AuthGuard from "@/components/AuthGuard"

export default function Home() {

  const [file, setFile] = useState<File | null>(null)
  const [jobDesc, setJobDesc] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [result, setResult] = useState<any>(null)

  // ✅ NEW STATES
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [missingSkills, setMissingSkills] = useState<string[]>([])

  const handleUploadAndAnalyze = async () => {

    if (!file) {
      setMessage("❌ Please select a file")
      return
    }

    const token = localStorage.getItem("token")

    if (!token) {
      setMessage("❌ Please login first")
      return
    }

    setLoading(true)
    setMessage("Processing...")

    try {
      // STEP 1: Upload
      const formData = new FormData()
      formData.append("file", file)

      const uploadRes = await fetch(`${API_URL}/resume/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const uploadData = await uploadRes.json()

      if (!uploadRes.ok) throw new Error(uploadData.detail)

      const resumeId = uploadData.id

      // STEP 2: Match (if JD exists)
      if (jobDesc.trim() !== "") {

        const matchRes = await fetch(`${API_URL}/resume/match`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            resume_id: resumeId,
            job_description: jobDesc,
          }),
        })

        const matchData = await matchRes.json()

        if (!matchRes.ok) throw new Error(matchData.detail)

        // ✅ FIXED RESULT + EXTRA DATA
        setResult({
          ats_score: matchData.resume_score,
          match_score: matchData.job_match,
          final_score: matchData.final_score,
        })

        // ✅ STORE EXTRA DATA
        setSuggestions(matchData.recommendations || [])
        setSkills(matchData.skills_found || [])
        setMissingSkills(matchData.missing_skills || [])

        setMessage("✅ Resume analyzed with Job Description")

      } else {

        setResult({
          ats_score: uploadData.score,
        })

        // reset extras
        setSuggestions([])
        setSkills([])
        setMissingSkills([])

        setMessage("✅ Resume analyzed (ATS only)")
      }

    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    
      <main className="max-w-3xl mx-auto px-6 py-16">

        <h1 className="text-3xl font-semibold mb-8">
          Resume Analyzer
        </h1>

        <Card className="p-8 space-y-6">

          {/* Upload */}
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0])
              }
            }}
          />

          {/* Job Description */}
          <textarea
            placeholder="(Optional) Paste job description here..."
            className="w-full p-3 border rounded-lg"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

          {/* Button */}
          <Button onClick={handleUploadAndAnalyze} disabled={loading}>
            {loading ? "Processing..." : "Analyze Resume"}
          </Button>

          {/* Message */}
          {message && <p className="text-sm">{message}</p>}

        </Card>

        {/* RESULT */}
        {result && (
          <div className="mt-10 space-y-4">

            <Card className="p-6">
              <p className="text-sm text-gray-500">ATS Score</p>
              <p className="text-3xl font-semibold">
                {result.ats_score}
              </p>
            </Card>

            {result.match_score !== undefined && (
              <Card className="p-6">
                <p className="text-sm text-gray-500">Match Score</p>
                <p className="text-3xl font-semibold">
                  {result.match_score}
                </p>
              </Card>
            )}

            {result.final_score !== undefined && (
              <Card className="p-6">
                <p className="text-sm text-gray-500">Final Score</p>
                <p className="text-3xl font-semibold">
                  {result.final_score}
                </p>
              </Card>
            )}

            {/* ✅ SKILLS */}
            {skills.length > 0 && (
              <Card className="p-6">
                <p className="font-semibold mb-2">Skills Found</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span key={i} className="bg-gray-200 px-2 py-1 rounded text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {/* ❌ MISSING SKILLS */}
            {missingSkills.length > 0 && (
              <Card className="p-6">
                <p className="font-semibold mb-2">Missing Skills</p>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((s, i) => (
                    <span key={i} className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {/* 💡 SUGGESTIONS */}
            {suggestions.length > 0 && (
              <Card className="p-6">
                <p className="font-semibold mb-2">Suggestions</p>
                <ul className="list-disc ml-5 text-sm text-gray-600">
                  {suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </Card>
            )}

          </div>
        )}

      </main>
    
  )
}