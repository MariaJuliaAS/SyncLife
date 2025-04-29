import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConnection";

interface PaymentPropsData {
    payments: PaymentProps[];
    //cardName: string[];
    cardInfos: GetCardProps[];
}

interface PaymentProps {
    card: string;
    establishment: string;
    category: string;
    value: number;
    date: string;
    observation?: string;
}

interface PaymentProviderProps {
    children: ReactNode
}

interface GetCardProps {
    card: string;
    limit: number;
    date: string;
    color: string;
    docId: string;
}

export const PaymentContext = createContext({} as PaymentPropsData)

function PaymentProvider({ children }: PaymentProviderProps) {
    const [cardInfos, setCardInfos] = useState<GetCardProps[]>([])
    const [payments, setPayments] = useState<PaymentProps[]>([])

    useEffect(() => {
        async function getCardsInfos() {
            const q = query(
                collection(db, "cards"),
                where("userId", "==", auth.currentUser?.uid)
            )

            await getDocs(q)
                .then((snapshot) => {
                    let list: GetCardProps[] = []

                    snapshot.forEach((item) => {
                        list.push({
                            card: item.data().card,
                            limit: item.data().limit,
                            date: item.data().date,
                            color: item.data().color,
                            docId: item.id
                        })
                    })
                    setCardInfos(list)
                })
        }

        getCardsInfos()
    }, [])

    return (
        <PaymentContext.Provider value={{ cardInfos, payments }}>
            {children}
        </PaymentContext.Provider>
    )

}

export default PaymentProvider;