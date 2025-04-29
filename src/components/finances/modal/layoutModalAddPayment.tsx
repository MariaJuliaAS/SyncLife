import { Input } from "../../input";
import { PaymentsListProps } from "./modalAddPayment";
import { GetCardInfos } from "../../../hooks/getCardInfos";

interface LayoutModalPaymentProps {
    payments: PaymentsListProps;
    setPayments: React.Dispatch<React.SetStateAction<PaymentsListProps>>;
    disableEditing?: boolean;
}

export function LayoutModalAddPayment({ payments, setPayments, disableEditing }: LayoutModalPaymentProps) {
    const { cardInfos } = GetCardInfos()
    return (
        <>
            <label className="sm:text-base text-sm mb-2 font-medium">Cartão</label>
            <select
                required
                className="border border-gray-200 h-10 rounded-md outline-none px-2 mb-4 bg-white"
                value={payments.card}
                onChange={(e) => setPayments(prev => ({ ...prev, card: e.target.value }))}
                disabled={disableEditing}
            >
                <option value="" disabled>Selecione um cartão</option>
                {cardInfos.map((item) => (
                    <option key={item.docId} value={item.card}>{item.card}</option>
                ))}
            </select>
            <label className="sm:text-base text-sm mb-2 font-medium">Estabelecimento</label>
            <Input
                placeholder="Spotify"
                required
                value={payments.establishment}
                onChange={(e) => setPayments(prev => ({ ...prev, establishment: e.target.value }))}
                disabled={disableEditing}
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Categoria</label>
            <select
                required
                className="border border-gray-200 h-10 rounded-md outline-none px-2 mb-4 bg-white"
                value={payments.category}
                onChange={(e) => setPayments(prev => ({ ...prev, category: e.target.value }))}
                disabled={disableEditing}
            >
                <option value="" disabled>Selecione uma categoria</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Transporte">Transporte</option>
                <option value="Lazer">Lazer</option>
                <option value="Saúde">Saúde</option>
                <option value="Educação">Educação</option>
                <option value="Outros">Outros</option>
            </select>
            <label className="sm:text-base text-sm mb-2 font-medium">Valor</label>
            <Input
                placeholder="R$ 21,90"
                type="number"
                required
                value={payments.value}
                onChange={(e) => setPayments(prev => ({ ...prev, value: Number(e.target.value) }))}
                disabled={disableEditing}
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Data da compra</label>
            <Input
                type="datetime-local"
                value={payments.date}
                onChange={(e) => setPayments(prev => ({ ...prev, date: e.target.value }))}
                disabled={disableEditing}
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Observação (opcional)</label>
            <textarea
                placeholder="Adicione detalhes sobre o pagamento"
                rows={3}
                className="border border-gray-200 rounded-md outline-none px-2 mb-4 bg-white"
                value={payments.observation}
                onChange={(e) => setPayments(prev => ({ ...prev, observation: e.target.value }))}
                disabled={disableEditing}
            />
        </>
    )
}