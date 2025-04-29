import { MdOutlineClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../services/firebaseConnection";
import { FormatDate } from "../../../utils/formatDate";

interface GetPaymentProps {
    card: string;
    establishment: string;
    category: string;
    value: number;
    date: string;
    observation?: string;
    docId: string;
}

interface ModalAllPaymentsProps {
    closeModal: () => void;
    selectedCard: string;
}

export function ModalAllPayments({ closeModal, selectedCard }: ModalAllPaymentsProps) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const [getPayment, setGetPayment] = useState<GetPaymentProps[]>([])

    useEffect(() => {
        async function getPayments() {
            const q = query(
                collection(db, "payments"),
                where("userId", "==", auth.currentUser?.uid),
            )

            await getDocs(q)
                .then((snapshot) => {
                    let list: GetPaymentProps[] = []

                    snapshot.forEach((item) => {
                        const data = item.data()
                        list.push({
                            card: data.card,
                            category: data.category,
                            date: data.date,
                            establishment: data.establishment,
                            observation: data.observation,
                            value: data.value,
                            docId: item.id
                        })
                    })
                    setGetPayment(list)

                })
                .catch((error) => {
                    console.log('Erro ao puxar pagamentos no modal: ' + error)
                })
        }

        getPayments()
    }, [])

    const filterCard = getPayment.filter(item => selectedCard === item.card)

    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="max-h-11/12 overflow-y-auto bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="border-b border-gray-200">
                    <div className="flex  justify-between mb-2">
                        <p className="font-bold sm:text-lg text-base">Todas as Transações</p>
                        <MdOutlineClose onClick={closeModal} size={25} className="cursor-pointer mb-4 text-black transition-all duration-200 hover:text-red-500" />
                    </div>
                </header>

                {filterCard.length === 0 &&
                    <div>
                        <p className="w-full flex justify-center pt-8 text-lg">Nenhum pagamento registrado!</p>
                    </div>
                }

                {filterCard.map((item) => (
                    <article key={item.docId} className="cursor-pointer flex items-center justify-between my-3 p-2 transition-all duration-200 hover:bg-gray-600/10 px-4">
                        <p className="flex flex-col font-bold sm:text-lg text-base">
                            {item.establishment}
                            <span className="sm:text-base text-sm font-normal text-gray-500">
                                {item.date.slice(0, 10) === currentDate
                                    ? `Hoje, ${FormatDate(item.date).hourFormatted}` :
                                    FormatDate(item.date).dateHourFormatted}</span>
                        </p>
                        <span className="bg-red-500/40 px-2 py-1 rounded-lg">
                            {item.value.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })}
                        </span>
                    </article>
                ))}
            </main>
        </div>
    )
}