import styles from '../../styles/auth.module.css';
import { FiTarget } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { motion } from 'framer-motion'

interface AuthLayoutProps {
    title: string;
    description: string;
    children: ReactNode;
    footerText: string;
    footerLink: string;
    footerLinkText: string;
    logo: string;
}

export function LayoutAuth({ title, description, children, footerText, footerLink, footerLinkText, logo }: AuthLayoutProps) {
    return (
        <motion.main className={styles.container}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <div className={styles.areaLogin}>

                <section className={styles.areaLeft}>

                    <div className={styles.logo}>
                        <h1 className={styles.title}>SyncLife</h1>
                        <FiTarget size={26} color='#0B5ED7' className={styles.logoIcon} />
                    </div>

                    <h2 className={styles.titleAuth}>{title}</h2>
                    <p className={styles.descriptionAuth}>{description}</p>

                    {children}

                    <p className={styles.textAccount}>{footerText} <Link to={footerLink} className={styles.registerLogin}>{footerLinkText}</Link></p>

                </section>

                <section className={styles.areaRight}>
                    <img src={logo} alt="calendário" />

                    <div className={styles.motivational}>
                        <h3>Organize-se, o resto vem.</h3>
                        <p>Quando você se organiza financeiramente e na rotina, a vida se torna mais leve e o sucesso mais possível.</p>
                    </div>
                </section>

            </div>
        </motion.main>
    )
}