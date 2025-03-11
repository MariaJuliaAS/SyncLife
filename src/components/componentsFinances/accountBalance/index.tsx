import styles from '../../../styles/accountBalance.module.css';

export function AccountBalance() {
    return (
        <div className={styles.accountBalance}>

            <div className={styles.headerPayment}>
                <h1 className={styles.title}>Saldo da conta</h1>
                <span>Total: R$ 450</span>
            </div>

            <div className={styles.tableAreaAccountBalance}>
                <table className={styles.tableAccountBalance}>

                    <thead>
                        <tr>
                            <th>Valor</th>
                            <th>Descrição</th>
                            <th>Data</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>R$ 450</td>
                            <td>Mamãe sonia me deu</td>
                            <td>12/03/2025</td>
                        </tr>
                        <tr>
                            <td>R$ - 450</td>
                            <td>Mamãe sonia me deu </td>
                            <td>12/03/2025</td>
                        </tr>
                        <tr>
                            <td>R$ 450</td>
                            <td>Mamãe sonia me deu</td>
                            <td>12/03/2025</td>
                        </tr>
                        <tr>
                            <td>R$ 450</td>
                            <td>Mamãe sonia me deu</td>
                            <td>12/03/2025</td>
                        </tr>
                        <tr>
                            <td>R$ 450</td>
                            <td>Mamãe sonia me deu</td>
                            <td>12/03/2025</td>
                        </tr>
                        <tr>
                            <td>R$ 450</td>
                            <td>Mamãe sonia me deu</td>
                            <td>12/03/2025</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div >
    )
}