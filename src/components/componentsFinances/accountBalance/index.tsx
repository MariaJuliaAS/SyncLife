import { collection, onSnapshot } from 'firebase/firestore';
import styles from '../../../styles/accountBalance.module.css';
import { useState, useEffect } from 'react';
import { db } from '../../../services/firebaseConnection';

interface TransactionsProps {
    value: number;
    type: 'exit' | 'entry';
    date: string;
    description: string;
}

export function AccountBalance() {
    const [transactions, setTransactions] = useState<TransactionsProps[]>()

    useEffect(() => {

        async function getTransactions() {

            onSnapshot(collection(db, 'finances-transactions'), (snapshot) => {
                let list: TransactionsProps[] = [];

                snapshot.forEach((doc) => {
                    list.push({
                        value: doc.data().value,
                        type: doc.data().type,
                        date: doc.data().date,
                        description: doc.data().description
                    });
                });

                setTransactions(list);
            })

        }
        getTransactions()

    }, [])

    const total = transactions?.reduce((acc, item) => acc + item.value, 0)

    return (
        <div className={styles.accountBalance}>

            <div className={styles.headerPayment}>
                <h1 className={styles.title}>Saldo da conta</h1>
                <span>Total: {total?.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })}</span>
            </div>

            <div className={styles.tableAreaAccountBalance}>


                {transactions?.length === 0 ? (
                    <div>
                        <h1>teste</h1>
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
                                    <td>
                                        <span className={item.type === 'entry' ? `${styles.valueEntry}` : `${styles.valueExit}`}>
                                            {(item.value).toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            })}
                                        </span>
                                    </td>
                                    <td>{item.description}</td>
                                    <td>{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }


            </div>
        </div >
    )
}