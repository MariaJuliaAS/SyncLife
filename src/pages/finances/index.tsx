import CheckLogged from "../../utils/checkLogged";
import styles from '../../styles/finances.module.css';
import { Transactions } from "../../components/componentsFinances/transactions";
import { Payments } from "../../components/componentsFinances/payments";
import { TransactionsHistory } from "../../components/componentsFinances/transactionsHistory";
import { Graphics } from "../../components/componentsFinances/graphics";

export function Finances() {
    CheckLogged()
    return (
        <main className={styles.container}>
            <section className={styles.areaLeft}>

                <Transactions />
                <Payments />

            </section>

            <section className={styles.areaRight}>

                <TransactionsHistory />
                <Graphics />

            </section>
        </main>
    )
}