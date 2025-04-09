import { onAuthStateChanged } from "firebase/auth"
import { ReactNode, useEffect, useState } from "react"
import { auth } from "../services/firebaseConnection"
import { useNavigate } from "react-router-dom"
import { ImSpinner2 } from "react-icons/im"


interface PrivateProps {
    children: ReactNode
}

export function Private({ children }: PrivateProps) {
    const navigate = useNavigate()
    const [signed, setSigned] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, (user) => {
            if (user && user.emailVerified) {
                const userData = {
                    email: user.email,
                    userId: user.uid
                }
                localStorage.setItem('@userInfosSyncLife', JSON.stringify(userData))

                setSigned(true)
                setLoading(false)
            } else {
                setSigned(false)
                setLoading(false)
            }
        })

        return () => {
            unsub()
        }

    }, [])

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <ImSpinner2 size={50} className="text-emerald-600 animate-spin" />
            </div>
        )
    }

    if (!signed) {
        navigate('/login', { replace: true })
    }

    return children
}