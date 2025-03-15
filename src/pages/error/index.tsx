import { Link } from "react-router-dom";
import styles from '../../styles/error.module.css';

export function Error() {
    return (
        <main className={styles.container}>
            <h1>404</h1>
            <h3>Página não encontrada</h3>
            <div className={styles.links}>
                <Link to='/agenda'>Agenda</Link>
                <Link to='/financas'>Finanças</Link>
            </div>
        </main>
    )
}