import styles from '../../../styles/finances.module.css';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

export function DebitMoviment() {
    return (
        <div className={styles.debitMoviment}>

            <h1 className={styles.title}>Movimentação no débito</h1>

            <div className={styles.areaMoviment}>
                <div className={styles.exits}>

                    <div className={styles.inputsAreaDebitMoviment}>
                        <span>Adicionar saídas</span>
                        <input
                            type='number'
                            placeholder='R$ 450'
                            className={styles.inputDebitMoviment}
                        />
                        <input
                            type='text'
                            placeholder='Descrição'
                            className={styles.inputDebitMoviment}
                        />
                    </div>

                    <button className={styles.btnDebitMoviment}>
                        <FaArrowAltCircleDown size={40} color='#fff' />
                    </button>
                </div>

                <div className={styles.entries}>

                    <div className={styles.inputsAreaDebitMoviment}>
                        <span>Adicionar saídas</span>
                        <input
                            type='number'
                            placeholder='R$ 450'
                            className={styles.inputDebitMoviment}
                        />
                        <input
                            type='text'
                            placeholder='Descrição'
                            className={styles.inputDebitMoviment}
                        />
                    </div>

                    <button className={styles.btnDebitMoviment}>
                        <FaArrowAltCircleUp size={40} color='#fff' />
                    </button>

                </div>

            </div>

        </div>
    )
}