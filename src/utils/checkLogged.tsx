import { useEffect } from "react";
import { auth } from "../services/firebaseConnection";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const CheckLogged = ({ children }: any) => {
    const navigate = useNavigate();

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user || !user.emailVerified) {
                navigate('/', { replace: true })
            }

        })

    }, [])

    return <>{children}</>

}

export default CheckLogged;