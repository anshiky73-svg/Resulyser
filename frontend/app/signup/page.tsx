"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { API_URL } from "@/lib/api"

export default function SignupPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSignup = async () => {

        if (!email || !password) {
            setMessage("❌ All fields are required")
            return
        }

        setLoading(true)
        setMessage("Creating account...")

        try {
            const res = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.detail || "Signup failed")
            }

            setMessage("✅ Account created successfully")

            // Redirect to login
            setTimeout(() => {
                router.push("/login")
            }, 1000)

        } catch (err: any) {
            setMessage(`❌ ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="max-w-md mx-auto px-6 py-16">

            <h1 className="text-3xl font-semibold mb-6">
                Create an account
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
                    onClick={handleSignup}
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-lg"
                >
                    {loading ? "Creating..." : "Sign Up"}
                </button>

                {message && (
                    <p className="text-sm text-gray-600">{message}</p>
                )}

            </div>

        </main>
    )
}