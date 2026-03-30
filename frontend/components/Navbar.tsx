"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        setIsLoggedIn(!!token)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        router.push("/login")
    }

    return (
        <nav className="flex justify-between items-center px-6 py-4 border-b">

            {/* Logo */}
            <h1 className="text-xl font-semibold">
                Resulyser
            </h1>

            {/* Right Side */}
            <div className="space-x-4">

                {isLoggedIn ? (
                    <>
                        <Link href="/">Home</Link>
                        <Link href="/dashboard">Dashboard</Link>

                        <button
                            onClick={handleLogout}
                            className="bg-black text-white px-4 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login">Login</Link>
                        <Link
                            href="/signup"
                            className="bg-black text-white px-4 py-2 rounded-lg"
                        >
                            Sign Up
                        </Link>
                    </>
                )}

            </div>

        </nav>
    )
}