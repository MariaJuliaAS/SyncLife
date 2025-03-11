import styles from '../../../styles/payment.module.css';

export function Payments() {
    return (
        <div className={styles.payments}>

            <div className={styles.headerPayments}>
                <h1 className={styles.title}>Pagamentos</h1>
                <button>+</button>
            </div>

            <div className={styles.tableAreaPayments}>
                <table className={styles.tablePayments}>

                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Método</th>
                            <th>Parcelas</th>
                            <th>Vencimento</th>
                            <th>Status</th>
                            <th>Responsável</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Conta de luz</td>
                            <td>RS 300</td>
                            <td>Cartão (Will)</td>
                            <td>2/3</td>
                            <td>01/02/2025</td>
                            <td> <span className={styles.statusPayment}>Pendente</span> </td>
                            <td>José</td>
                        </tr>
                        <tr>
                            <td>Conta de luz</td>
                            <td>RS 300</td>
                            <td>Cartão (Will)</td>
                            <td>2/3</td>
                            <td>01/02/2025</td>
                            <td>Pago</td>
                            <td>José</td>
                        </tr>
                        <tr>
                            <td>Conta de luz</td>
                            <td>RS 300</td>
                            <td>Cartão (Will)</td>
                            <td>2/3</td>
                            <td>01/02/2025</td>
                            <td>Pago</td>
                            <td>José</td>
                        </tr>
                        <tr>
                            <td>Conta de luz</td>
                            <td>RS 300</td>
                            <td>Cartão (Will)</td>
                            <td>2/3</td>
                            <td>01/02/2025</td>
                            <td>Pago</td>
                            <td>José</td>
                        </tr>
                        <tr>
                            <td>Conta de luz</td>
                            <td>RS 300</td>
                            <td>Cartão (Will)</td>
                            <td>2/3</td>
                            <td>01/02/2025</td>
                            <td>Pago</td>
                            <td>José</td>
                        </tr>
                        <tr>
                            <td>Conta de luz</td>
                            <td>RS 300</td>
                            <td>Cartão (Will)</td>
                            <td>2/3</td>
                            <td>01/02/2025</td>
                            <td>Pago</td>
                            <td>José</td>
                        </tr>
                        <tr>
                            <td>Conta de luz</td>
                            <td>RS 300</td>
                            <td>Cartão (Will)</td>
                            <td>2/3</td>
                            <td>01/02/2025</td>
                            <td>Pago</td>
                            <td>José</td>
                        </tr>
                        <tr>
                            <td>Conta de luz</td>
                            <td>RS 300</td>
                            <td>Cartão (Will)</td>
                            <td>2/3</td>
                            <td>01/02/2025</td>
                            <td>Pago</td>
                            <td>José</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    )
}