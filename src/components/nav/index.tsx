import { TbMenu2 } from "react-icons/tb";
import styles from '../../styles/navmenu.module.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiTarget } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { TbChartInfographic } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import { TbLogout2 } from "react-icons/tb";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { useNavigate } from "react-router-dom";

export function NavMenu() {
    const navigate = useNavigate();
    const [statusNav, setStatusNav] = useState(false)

    function alternarMenu() {
        setStatusNav(!statusNav)
    }

    function logOut() {
        signOut(auth)
        navigate('/', { replace: true })
    }

    return (
        <main>
            <header className={styles.header}>
                <button onClick={alternarMenu}>
                    <TbMenu2 size={45} color="#000" className={styles.iconMenu} />
                </button>
            </header>

            <nav className={`${styles.navMenu} ${statusNav ? styles.aberto : ''}`}>
                <div className={styles.navHeader}>
                    <h1 className={styles.titulo}>SyncLife <FiTarget size={30} color="#0B5ED7" /> </h1>
                    <button onClick={alternarMenu} className={styles.fecharBtn}>X</button>
                </div>

                <div className={styles.navLinks}>

                    <div className={styles.buttonNavLink}>
                        <CiCalendar size={30} color="#000" />
                        <Link to='/agenda' className={styles.links} onClick={alternarMenu}>Agenda</Link>
                    </div>

                    <div className={styles.buttonNavLink}>
                        <TbChartInfographic size={30} color="#000" />
                        <Link to='/financas' className={styles.links} onClick={alternarMenu}>Finanças</Link>
                    </div>

                    <div className={styles.buttonNavLink}>
                        <IoPersonOutline size={30} color="#000" />
                        <a href="#" className={styles.links} onClick={alternarMenu}>Conta</a>
                    </div>

                </div>

                <footer className={styles.footer}>
                    <button onClick={logOut}> <TbLogout2 size={30} color="#fff" /> Sair da conta</button>
                </footer>

            </nav>


        </main>
    )
}