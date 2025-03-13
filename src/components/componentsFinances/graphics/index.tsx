import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../../services/firebaseConnection';
import styles from '../../../styles/graphic.module.css';
import { PieChart } from './PieChart';
import { useEffect, useState } from 'react';

interface PaymentsProps {
    value: number;
    method: string;
};


export function Graphics() {
    const [payments, setPayments] = useState<PaymentsProps[]>([])

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {

                const q = query(
                    collection(db, 'finances-payments'),
                    where('userId', '==', user.uid)
                )

                onSnapshot(q, (snapshot) => {
                    let list: PaymentsProps[] = []

                    snapshot.forEach((doc) => {
                        list.push({
                            value: doc.data().value,
                            method: doc.data().method
                        })
                    })

                    setPayments(list)

                })

            }
        })
        return () => unsubscribe();
    }, [])

    return (
        <div className={styles.graphics}>
            <h1 className={styles.title}>Gráfico de pagamentos</h1>
            <div className={styles.areaGraphic}>
                <PieChart payments={payments} className={styles.pieChart} />
            </div>
        </div>
    )
}