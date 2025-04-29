import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConnection";

interface GetCardProps {
    card: string;
    limit: number;
    date: string;
    color: string;
    docId: string;
}

export function GetCardInfos() {
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

    return { cardInfos }

}