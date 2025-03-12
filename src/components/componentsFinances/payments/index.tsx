import styles from '../../../styles/payment.module.css';
import { useState, useEffect } from 'react';
import { ModalPaymnentAdd } from '../modalPaymentAdd';
import { ModalPaymentEdit } from '../modalPaymentEdit';
import { AnimatePresence } from 'framer-motion';
import { auth, db } from '../../../services/firebaseConnection';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { formatarData } from '../../../utils/dataFormatada';
import { CircularProgress } from '@mui/material';
import { FaRegTrashAlt, FaPen } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { toast } from 'react-toastify';

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
    const [statusModalAdd, setStatusModalAdd] = useState(false)
    const [statusModalEdit, setStatusModalEdit] = useState(false)
    const [listPayments, setListPayments] = useState<PaymentsProps[]>()
    const [loading, setLoading] = useState(true)
    const [editInfos, setEditInfos] = useState<PaymentsProps>()

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
                    setLoading(false)

                })

            }
        })
    }, [])


    async function deletPayment(id: string) {
        try {
            await deleteDoc(doc(db, 'finances-payments', id))
            toast.success('Pagamento deletado com sucesso!')
        } catch (error) {
            console.log('Erro ao deletar pagamento: ' + error)
        }
    }

    function openModalEdit(id: string, description: string, value: number | null, method: string, installments: string, payday: string, status: string, responsible: string) {
        setStatusModalEdit(true)
        setEditInfos({
            id,
            description,
            value,
            method,
            installments,
            payday,
            status,
            responsible,
        })
    }

    if (loading) {
        return (
            <div className={styles.paymentsLoading}>
                <CircularProgress size={50} color='primary' thickness={5} style={{ color: '#0B5ED7' }} />
            </div>
        )
    }

    return (
        <div className={styles.payments}>

            <div className={styles.headerPayments}>
                <h1 className={styles.title}>Pagamentos</h1>
                <button onClick={() => setStatusModalAdd(true)}>
                    <FaPlus size={25} color='#fff' />
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
                                <>

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
                                        <td>
                                            <button className={styles.btnFunctions} onClick={() => deletPayment(item.id)}>
                                                <FaRegTrashAlt size={22} color='#fff' />
                                            </button>
                                            <button className={styles.btnFunctions} onClick={() => openModalEdit(item.id, item.description, item.value, item.method, item.installments, item.payday, item.status, item.responsible)}>
                                                <FaPen size={22} color='#fff' />
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>

                    </table>
                }

            </div>

            <AnimatePresence>
                {statusModalAdd && <ModalPaymnentAdd closeModal={() => setStatusModalAdd(false)} />}
                {editInfos && statusModalEdit && <ModalPaymentEdit infos={editInfos} closeModal={() => setStatusModalEdit(false)} />}
            </AnimatePresence>

        </div>
    )
}