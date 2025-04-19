import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

interface PaymentPropsData {
    //payment: PaymentProps[];
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
    name: string;
    limit: number;
    date: string;
    color: string;
    docId: string;
}

export const PaymentContext = createContext({} as PaymentPropsData)

function PaymentProvider({ children }: PaymentProviderProps) {
    const [cardInfos, setCardInfos] = useState<GetCardProps[]>([])

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
                            name: item.data().name,
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
        <PaymentContext.Provider value={{ cardInfos }}>
            {children}
        </PaymentContext.Provider>
    )

}

export default PaymentProvider;