import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CardProps, ModalAddNewCard } from "./modal/modalAddNewCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

export function Card() {
    const [modalAddNewCard, setModalAddNewCard] = useState(false)
    const [cardInfos, setCardInfos] = useState<CardProps[]>()

    useEffect(() => {
        async function getCardsInfos() {
            await getDocs(collection(db, 'cards'))
                .then((snapshot) => {
                    let list: CardProps[] = []

                    snapshot.forEach((item) => {
                        list.push({
                            name: item.data().name,
                            limit: item.data().limit,
                            date: item.data().date,
                            color: item.data().color
                        })
                    })
                    setCardInfos(list)
                })
        }
        getCardsInfos()
    }, [])

    return (
        <section className="flex-1 bg-white border border-gray-200 rounded-md py-7 shadow-lg">
            <header className=" px-4 flex justify-between">
                <p className="font-bold sm:text-xl text-lg">Fatura</p>
                <button onClick={() => setModalAddNewCard(true)} className="sm:text-base text-sm text-emerald-600 font-medium cursor-pointer transition-all duration-200 hover:scale-105">
                    Novo Cartão
                </button>
            </header>

            <main className="flex flex-col gap-4 mt-4">
                {cardInfos?.map((item) => (
                    <article key={item.name} className="flex items-center justify-between p-2 transition-all duration-200 hover:bg-gray-600/10 px-4">
                        <div className="flex gap-4 items-center">
                            <span className="sm:text-base text-sm rounded-full p-3 text-white" style={{ backgroundColor: item.color }}>{item.name.slice(0, 2).toUpperCase()}</span>
                            <p className="flex flex-col font-bold sm:text-lg text-base">
                                R$ 691,00
                                <span className="sm:text-base text-sm font-normal text-gray-500">Vencimento: {item.date}</span>
                            </p>
                        </div>
                        <MdKeyboardArrowRight size={20} color="#000" />
                    </article>
                ))}

                <footer className="border-t border-gray-200 mt-4 flex items-center justify-center px-4">
                    <button className="mt-4 border border-gray-200 rounded-lg w-full py-1 cursor-pointer transition-all duration-200 hover:bg-gray-300/30">
                        Novo Pagamento
                    </button>
                </footer>

                {modalAddNewCard && <ModalAddNewCard closeModal={() => setModalAddNewCard(false)} />}
            </main>
        </section>
    )
}