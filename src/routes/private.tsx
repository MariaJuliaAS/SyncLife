import { onAuthStateChanged } from "firebase/auth"
import { ReactNode, useEffect, useState } from "react"
import { auth } from "../services/firebaseConnection"
import { Navigate } from "react-router-dom"
import { Loading } from "../components/loading"

interface PrivateProps {
    children: ReactNode
}

export function Private({ children }: PrivateProps) {
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
        return <Loading />
    }

    if (!signed) {
        return <Navigate to='/login' />
    }

    return children
}