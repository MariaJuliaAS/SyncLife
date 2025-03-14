import { TbMenu2 } from "react-icons/tb";
import styles from '../../styles/navmenu.module.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiTarget } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { TbChartInfographic } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { signOut } from "firebase/auth";
import { auth, db } from "../../services/firebaseConnection";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";

export function NavMenu() {
    const navigate = useNavigate();
    const [statusNav, setStatusNav] = useState(false)
    const [name, setName] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {

                setIsLoggedIn(true)

                const q = query(
                    collection(db, 'cadastro-usuarios'),
                    where('userId', '==', auth.currentUser?.uid)
                )

                getDocs(q)
                    .then((snapshot) => {

                        snapshot.forEach((doc) => {
                            setName(doc.data().name)
                        })

                    })
                    .catch((error) => {
                        console.log('Erro ao buscar nome: ' + error)
                    })

            } else {
                setIsLoggedIn(false)
            }
        })
        return () => unsubscribe();
    }, [])


    function logOut() {
        signOut(auth)
            .then(() => {
                setIsLoggedIn(false)
                navigate('/', { replace: true })
            })
            .catch((error) => {
                console.log('Erro ao deslogar: ' + error)
            })
    }

    return (
        <main>
            <header className={styles.header}>
                <button onClick={() => setStatusNav(true)}>
                    <TbMenu2 size={45} color="#000" className={styles.iconMenu} />
                </button>

                <div className={styles.userArea}>
                    <Link to='/conta'>
                        {isLoggedIn ? `Olá, ${name} 👋` : ''}
                    </Link>
                </div>
            </header>

            <nav className={`${styles.navMenu} ${statusNav ? styles.aberto : ''}`}>
                <div className={styles.navHeader}>
                    <Link to='/agenda' className={styles.titulo} onClick={() => setStatusNav(false)}>SyncLife <FiTarget size={30} color="#0B5ED7" /> </Link>
                    <button onClick={() => setStatusNav(false)} className={styles.fecharBtn}>X</button>
                </div>

                <div className={styles.navLinks}>

                    <div className={styles.buttonNavLink}>
                        <CiCalendar size={30} color="#000" />
                        <Link to='/agenda' className={styles.links} onClick={() => setStatusNav(false)}>Agenda</Link>
                    </div>

                    <div className={styles.buttonNavLink}>
                        <TbChartInfographic size={30} color="#000" />
                        <Link to='/financas' className={styles.links} onClick={() => setStatusNav(false)}>Finanças</Link>
                    </div>

                </div>

                <footer className={styles.footer}>
                    <button onClick={logOut}> <TbLogout2 size={30} color="#fff" /> Sair da conta</button>
                </footer>

            </nav>


        </main>
    )
}