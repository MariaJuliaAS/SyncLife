import { collection, onSnapshot, query, where } from 'firebase/firestore';
import styles from '../../../styles/transactionsHistory.module.css';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../services/firebaseConnection';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { ModalAccountBalance } from '../modalAccountBalance';
import { CircularProgress } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { FaRegTrashAlt, FaPen } from 'react-icons/fa';

interface TransactionsProps {
    value: number;
    type?: 'exit' | 'entry';
    date: string;
    description: string;
    id: string
}


export function TransactionsHistory() {
    const [transactions, setTransactions] = useState<TransactionsProps[]>()
    const [statusModal, setStatusModal] = useState(false)
    const [modalInfos, setModalInfos] = useState<TransactionsProps>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            if (user) {

                const q = query(
                    collection(db, 'finances-transactions'),
                    where('userId', '==', auth.currentUser?.uid)
                )

                onSnapshot(q, (snapshot) => {
                    let list: TransactionsProps[] = [];

                    snapshot.forEach((doc) => {
                        list.push({
                            value: doc.data().value,
                            type: doc.data().type,
                            date: doc.data().date,
                            description: doc.data().description,
                            id: doc.id
                        })
                    })

                    setTransactions(list);
                    setLoading(false)

                })

            }
        })

    }, [])

    function openModal(id: string, description: string, date: string, value: number) {
        setModalInfos({
            id,
            description,
            date,
            value
        })
        setStatusModal(true)
    }

    async function deletTransaction(id: string) {
        try {
            await deleteDoc(doc(db, 'finances-transactions', id))
            toast.success('Transação deletada com sucesso!')
        } catch (error) {
            console.log('Erro ao deletar transação: ' + error)
        }
    }

    const total = transactions?.reduce((acc, item) => acc + item.value, 0)

    if (loading) {
        return (
            <div className={styles.accountBalanceLoading}>
                <CircularProgress size={50} color='primary' thickness={5} style={{ color: '#0B5ED7' }} />
            </div>
        )
    }

    return (
        <div className={styles.accountBalance}>

            <div className={styles.headerPayment}>
                <h1 className={styles.title}>Histórico de transações</h1>
                <span>Total: {total?.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })}</span>
            </div>

            <div className={styles.tableAreaAccountBalance}>


                {transactions?.length === 0 ? (
                    <div className={styles.noTransactions}>
                        <h1>Novas transações aparecerão aqui!</h1>
                    </div>
                ) :
                    <table className={styles.tableAccountBalance}>
                        <thead>
                            <tr>
                                <th>Valor</th>
                                <th>Descrição</th>
                                <th>Data</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions?.map((item, index) => (
                                <tr key={index}>
                                    <td data-label='Valor'>
                                        <span className={item.type === 'entry' ? `${styles.valueEntry}` : `${styles.valueExit}`}>
                                            {(item.value).toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            })}
                                        </span>
                                    </td>
                                    <td data-label='Descrição'>{item.description}</td>
                                    <td data-label='Data'>{item.date}</td>
                                    <td>
                                        <button className={styles.btnFunctions} onClick={() => deletTransaction(item.id)}>
                                            <FaRegTrashAlt size={22} color='#fff' />
                                        </button>
                                        <button className={styles.btnFunctions} onClick={() => openModal(item.id, item.description, item.date, item.value)}>
                                            <FaPen size={22} color='#fff' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }

                <AnimatePresence>
                    {statusModal && modalInfos && <ModalAccountBalance infos={modalInfos} closeModal={() => setStatusModal(false)} />}
                </AnimatePresence>

            </div>
        </div >
    )
}