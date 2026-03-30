"use client"

import { useEffect, useState } from "react"
import { API_URL } from "@/lib/api"
import AuthGuard from "@/components/AuthGuard"

export default function DashboardPage() {

    const [resumes, setResumes] = useState<any[]>([])
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [updateId, setUpdateId] = useState<number | null>(null)

    const getToken = () => localStorage.getItem("token")

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)

            const [dashboardRes, historyRes] = await Promise.all([
                fetch(`${API_URL}/resume/dashboard`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                }),
                fetch(`${API_URL}/resume/history`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                }),
            ])

            const dashboardData = await dashboardRes.json()
            const historyData = await historyRes.json()

            const safeHistory = Array.isArray(historyData) ? historyData : []

            // ✅ FIX: map backend "score" → frontend "resume_score"
            const cleaned = safeHistory.map((item) => ({
                ...item,
                resume_score: item.score ?? null,   // 🔥 FIX HERE
                job_match: item.job_match ?? null,  // keep if exists
            }))

            setData(dashboardData)
            setResumes(cleaned)

        } catch (err) {
            console.log("Error loading dashboard")
            setResumes([])
        } finally {
            setLoading(false)
        }
    }

    const safeResumes = Array.isArray(resumes) ? resumes : []

    const latestResume =
        safeResumes.length > 0
            ? [...safeResumes]
                .filter(r => r.uploaded_at)
                .sort(
                    (a, b) =>
                        new Date(b.uploaded_at).getTime() -
                        new Date(a.uploaded_at).getTime()
                )[0]
            : null

    const handleDelete = async (id: number) => {
        await fetch(`${API_URL}/resume/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        fetchData()
    }

    const handleDownload = async (id: number) => {
        const res = await fetch(`${API_URL}/resume/${id}/download`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })

        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = "resume.pdf"
        a.click()
    }

    const handleUpdateClick = (id: number) => {
        setUpdateId(id)
        document.getElementById("update-input")?.click()
    }

    const handleUpdateFile = async (file: File) => {
        if (!updateId) return

        const formData = new FormData()
        formData.append("file", file)

        await fetch(`${API_URL}/resume/${updateId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            body: formData,
        })

        setUpdateId(null)
        fetchData()
    }

    if (loading) {
        return (
            <AuthGuard>
                <main className="p-10">Loading...</main>
            </AuthGuard>
        )
    }

    return (
        <AuthGuard>
            <main className="max-w-6xl mx-auto px-6 py-12">

                <h1 className="text-3xl font-semibold mb-10">
                    Dashboard
                </h1>

                {/* STATS */}
                <div className="grid grid-cols-2 gap-6 mb-10">

                    <div className="p-6 border rounded-xl">
                        <p className="text-sm text-gray-500">Latest ATS Score</p>
                        <p className="text-3xl font-semibold">
                            {latestResume && latestResume.resume_score !== null
                                ? latestResume.resume_score
                                : "Not analyzed"}
                        </p>
                    </div>

                    <div className="p-6 border rounded-xl">
                        <p className="text-sm text-gray-500">Total Resumes</p>
                        <p className="text-3xl font-semibold">
                            {data?.total_resumes ?? 0}
                        </p>
                    </div>

                </div>

                {/* RECENT ACTIVITY */}
                <div className="mb-10">
                    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

                    <div className="space-y-3">
                        {safeResumes.slice(0, 3).map((item, index) => (
                            <div key={index} className="p-4 border rounded-lg flex justify-between">

                                <div>
                                    <p className="font-medium">Resume {index + 1}</p>

                                    <p className="text-sm text-gray-500">
                                        ATS: {item.resume_score !== null ? item.resume_score : "Not analyzed"}
                                    </p>

                                    {item.job_match !== null && (
                                        <p className="text-sm text-blue-500">
                                            Match: {item.job_match}
                                        </p>
                                    )}
                                </div>

                                <p className="text-sm text-gray-400">
                                    {item.uploaded_at
                                        ? new Date(item.uploaded_at).toLocaleDateString()
                                        : "No date"}
                                </p>

                            </div>
                        ))}
                    </div>
                </div>

                {/* HISTORY */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Resume History</h2>

                    <table className="w-full text-sm border rounded-lg overflow-hidden">

                        <thead className="text-left border-b bg-gray-50">
                            <tr>
                                <th className="py-3 px-2">Resume</th>
                                <th className="py-3 px-2">ATS</th>

                                <th className="py-3 px-2">Date</th>
                                <th className="py-3 px-2 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {safeResumes.map((resume, index) => (
                                <tr key={resume.id} className="border-b">

                                    <td className="py-3 px-2">
                                        Resume {index + 1}
                                        <div className="text-xs text-gray-400">
                                            {resume.file_name}
                                        </div>
                                    </td>

                                    <td className="py-3 px-2">
                                        {resume.resume_score !== null ? resume.resume_score : "—"}
                                    </td>



                                    <td className="py-3 px-2">
                                        {resume.uploaded_at
                                            ? new Date(resume.uploaded_at).toLocaleDateString()
                                            : "—"}
                                    </td>

                                    <td className="py-3 px-2 text-right space-x-2">

                                        <button
                                            onClick={() => handleDownload(resume.id)}
                                            className="px-3 py-1 border rounded"
                                        >
                                            Download
                                        </button>

                                        <button
                                            onClick={() => handleUpdateClick(resume.id)}
                                            className="px-3 py-1 border rounded"
                                        >
                                            Update
                                        </button>

                                        <button
                                            onClick={() => handleDelete(resume.id)}
                                            className="px-3 py-1 border rounded text-red-500"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

                <input
                    id="update-input"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files) {
                            handleUpdateFile(e.target.files[0])
                        }
                    }}
                />

            </main>
        </AuthGuard>
    )
}