import CheckLogged from "../../utils/checkLogged";
import styles from '../../styles/finances.module.css';
import { DebitMoviment } from "../../components/componentsFinances/debitMoviment";
import { Payments } from "../../components/componentsFinances/payments";
import { AccountBalance } from "../../components/componentsFinances/accountBalance";
import { Graphics } from "../../components/componentsFinances/graphics";

export function Finances() {
    CheckLogged()
    return (
        <main className={styles.container}>
            <section className={styles.areaLeft}>

                <DebitMoviment />

                <Payments />

            </section>

            <section className={styles.areaRight}>

                <AccountBalance />

                <Graphics />

            </section>
        </main>
    )
}