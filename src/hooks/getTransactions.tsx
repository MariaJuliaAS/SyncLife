import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConnection";
import { TransactionPros } from "../components/finances/modal/modalAddTransaction";

interface GetTransactionsProps {
    type: string;
    description: string;
    value: number;
    created: string;
    category: string;
    paymentForm: string;
    observation: string;
    docId: string
}

export function GetTransactions() {
    const [getTransactions, setGetTransactions] = useState<GetTransactionsProps[]>([])

    useEffect(() => {
        const q = query(
            collection(db, "transactions"),
            where("userId", "==", auth.currentUser?.uid),
        )

        const unsub = onSnapshot(q, (snapshot) => {
            let list: GetTransactionsProps[] = []

            snapshot.forEach((item) => {
                const doc = item.data()
                list.push({
                    type: doc.type,
                    description: doc.description,
                    value: doc.type === "Receita" ? doc.value : -doc.value,
                    created: doc.created,
                    category: doc.category,
                    paymentForm: doc.paymentForm,
                    observation: doc.observation,
                    docId: item.id
                })
            })
            setGetTransactions(list)
        })

        return () => {
            unsub()
        }

    }, [])

    return { getTransactions }

}