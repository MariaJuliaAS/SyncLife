import { auth } from "../services/firebaseConnection";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const CheckLogged = () => {
    const navigate = useNavigate();



    onAuthStateChanged(auth, (user) => {
        if (!user || !user.emailVerified) {
            navigate('/', { replace: true })
        }

    })


}

export default CheckLogged;