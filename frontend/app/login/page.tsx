"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { API_URL } from "@/lib/api"

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleLogin = async () => {

        if (!email || !password) {
            setMessage("❌ All fields are required")
            return
        }

        setLoading(true)
        setMessage("Logging in...")

        try {
            // ✅ FIX: use form data (FastAPI OAuth2 expects this)
            const formData = new URLSearchParams()
            formData.append("username", email) // ⚠️ important
            formData.append("password", password)

            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData,
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.detail || "Login failed")
            }

            // ✅ STORE TOKEN
            localStorage.setItem("token", data.access_token)

            setMessage("✅ Login successful")

            // ✅ Redirect
            setTimeout(() => {
                window.location.href = "/"
            }, 500)

        } catch (err: any) {
            setMessage(`❌ ${err?.message || "Login failed"}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="max-w-md mx-auto px-6 py-16">

            <h1 className="text-3xl font-semibold mb-6">
                Login
            </h1>

            <div className="space-y-4">

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-lg"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {message && (
                    <p className="text-sm text-gray-600">{message}</p>
                )}

            </div>

        </main>
    )
}