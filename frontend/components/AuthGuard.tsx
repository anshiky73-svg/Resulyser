"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AuthGuard({ children }: { children: React.ReactNode }) {

    const router = useRouter()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            router.push("/login")
        } else {
            setIsChecking(false)
        }
    }, [router])

    if (isChecking) return null

    return <>{children}</>
}