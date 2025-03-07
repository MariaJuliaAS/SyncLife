import { TbMenu2 } from "react-icons/tb";
import styles from '../../styles/navmenu.module.css';
import { useState } from "react";
import { Link } from "react-router-dom";

export function NavMenu() {
    const [statusNav, setStatusNav] = useState(false)

    function alternarMenu() {
        setStatusNav(!statusNav)
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
                    <Link to='/' className={styles.titulo}>SyncLife</Link>
                    <button onClick={alternarMenu} className={styles.fecharBtn}>X</button>
                </div>

                <div className={styles.navLinks}>
                    <Link to='/agenda' className={styles.links} onClick={alternarMenu}>Agenda</Link>
                    <Link to='/financas' className={styles.links} onClick={alternarMenu}>Finanças</Link>
                    <a href="#" className={styles.links} onClick={alternarMenu}>Conta</a>
                    <a href="#" className={styles.links} onClick={alternarMenu}>Configurações</a>
                </div>
            </nav>

        </main>
    )
}