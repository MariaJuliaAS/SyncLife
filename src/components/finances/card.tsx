import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ModalAddNewCard } from "./modal/modalAddNewCard";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { ModalEditCard } from "./modal/modalEditCard";
import toast from "react-hot-toast";

interface GetCardProps {
    name: string;
    limit: number;
    date: string;
    color: string;
    docId: string;
}

export function Card() {
    const [modalAddNewCard, setModalAddNewCard] = useState(false)
    const [modalEditCard, setModalEditCard] = useState(false)
    const [cardInfos, setCardInfos] = useState<GetCardProps[]>()
    const [docId, setDocId] = useState<string>("")

    useEffect(() => {
        async function getCardsInfos() {
            await getDocs(collection(db, 'cards'))
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

    async function handleDeleteCard(docIdDelete: string) {
        const deleteCardRef = doc(db, "cards", docIdDelete)
        await deleteDoc(deleteCardRef)
            .then(() => {
                toast.success("Cartão excluído com sucesso!")
                window.location.reload()
            })
            .catch((error) => {
                console.log("Erro ao excluir cartão: " + error)
            })
    }

    return (
        <section className="flex-1 bg-white border border-gray-200 rounded-md py-7 shadow-lg">
            <header className=" px-4 flex justify-between">
                <p className="font-bold sm:text-xl text-lg">Fatura</p>
                <button onClick={() => setModalAddNewCard(true)} className="sm:text-base text-sm text-emerald-600 font-medium cursor-pointer transition-all duration-200 hover:scale-105">
                    Novo Cartão
                </button>
            </header>

            <main className="flex flex-col gap-4 mt-4">
                {cardInfos?.length === 0 &&
                    <div className="flex items-center justify-center min-h-40 text-lg">
                        <p>Seus cartões aparecerão aqui!</p>
                    </div>}

                {cardInfos?.slice(0, 3).map((item) => (
                    <article key={item.docId} className="flex items-center justify-between p-2 transition-all duration-200 hover:bg-gray-600/10 px-4">
                        <div className="flex gap-4 items-center">
                            <span className="sm:text-base text-sm rounded-full p-3 text-white" style={{ backgroundColor: item.color }}>{item.name.slice(0, 2).toUpperCase()}</span>
                            <p className="flex flex-col font-bold sm:text-lg text-base">
                                R$ 691,00
                                <span className="sm:text-base text-sm font-normal text-gray-500">Vencimento: {item.date}</span>
                            </p>
                        </div>
                        <div className="flex flex-col items-end justify-center gap-2">
                            <MdKeyboardArrowRight size={20} color="#000" />
                            <div className="flex gap-4 text-sm underline">
                                <button onClick={() => { setModalEditCard(true), setDocId(item.docId) }} className="hover:font-semibold cursor-pointer">Editar</button>
                                <button onClick={() => handleDeleteCard(item.docId)} className="hover:text-red-500 hover:font-semibold cursor-pointer">Excluir</button>
                            </div>
                        </div>
                    </article>
                ))}

                {cardInfos?.length === 0 ? <></> :
                    (
                        <footer className="border-t border-gray-200 mt-4 flex items-center justify-center px-4">
                            <button className="mt-4 border border-gray-200 rounded-lg w-full py-1 cursor-pointer transition-all duration-200 hover:bg-gray-300/30">
                                Novo Pagamento
                            </button>
                        </footer>)
                }

                {modalAddNewCard && <ModalAddNewCard closeModal={() => setModalAddNewCard(false)} />}
                {modalEditCard && <ModalEditCard closeModal={() => setModalEditCard(false)} docId={docId} />}

            </main>
        </section>
    )
}