import styles from '../../../styles/payment.module.css';
import { useState, useEffect } from 'react';
import { ModalPaymnentAdd } from '../modalPaymentAdd';
import { AnimatePresence } from 'framer-motion';
import { auth, db } from '../../../services/firebaseConnection';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { formatarData } from '../../../utils/dataFormatada';

interface PaymentsProps {
    description: string;
    value: number | null;
    method: string;
    status: string;
    installments: string;
    payday: string;
    responsible: string;
    id: string;
}

export function Payments() {
    const [statusModal, setStatusModal] = useState(false)
    const [listPayments, setListPayments] = useState<PaymentsProps[]>()

    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            if (user) {

                const q = query(
                    collection(db, 'finances-payments'),
                    where('userId', '==', auth.currentUser?.uid)
                )

                onSnapshot(q, (snapshot) => {
                    let list: PaymentsProps[] = []

                    snapshot.forEach((doc) => {
                        list.push({
                            description: doc.data().description,
                            value: doc.data().value,
                            method: doc.data().method,
                            status: doc.data().status,
                            installments: doc.data().installments,
                            payday: doc.data().payday,
                            responsible: doc.data().responsible,
                            id: doc.id
                        })
                    })

                    setListPayments(list)

                })

            }
        })
    }, [])

    function openModal() {
        setStatusModal(true)
        console.log(listPayments)
    }

    return (
        <div className={styles.payments}>

            <div className={styles.headerPayments}>
                <h1 className={styles.title}>Pagamentos</h1>
                <button onClick={openModal}>
                    +
                </button>
            </div>

            <div className={styles.tableAreaPayments}>

                {listPayments?.length === 0 ? (
                    <div className={styles.noPayments}>
                        <h1>Novos pagamentos aparecerão aqui!</h1>
                    </div>
                ) :
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
                            {listPayments?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.description}</td>
                                    <td>
                                        {(item.value)?.toLocaleString('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        })}
                                    </td>
                                    <td>{item.method}</td>
                                    <td>{item.installments}</td>
                                    <td>
                                        {formatarData(item.payday).dataFormatada}
                                    </td>
                                    <td>
                                        <span className={item.status === 'Pago' ? `${styles.paidStatus}` : `${styles.pendingStatus}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td>{item.responsible}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                }

            </div>

            <AnimatePresence>
                {statusModal && <ModalPaymnentAdd closeModal={() => setStatusModal(false)} />}
            </AnimatePresence>

        </div>
    )
}