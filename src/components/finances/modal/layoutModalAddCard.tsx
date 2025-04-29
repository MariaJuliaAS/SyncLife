import { Input } from "../../input";
import { CardProps } from "./modalAddNewCard";

interface LayoutModalAddCardProps {
    cardInfos: CardProps;
    setCardInfos: React.Dispatch<React.SetStateAction<CardProps>>;
}

export function LayoutModalAddCard({ cardInfos, setCardInfos }: LayoutModalAddCardProps) {
    return (
        <>
            <label className="sm:text-base text-sm mb-2 font-medium">Nome</label>
            <Input
                placeholder="Ex.: Nubank"
                value={cardInfos.card}
                onChange={(e) => setCardInfos(prev => ({ ...prev, card: e.target.value }))}
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Limite</label>
            <Input
                placeholder="R$ 1250"
                type="number"
                value={cardInfos.limit}
                onChange={(e) => setCardInfos(prev => ({ ...prev, limit: Number(e.target.value) }))}
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Vencimento</label>
            <Input
                placeholder="11/04"
                value={cardInfos.date}
                onChange={(e) => setCardInfos(prev => ({ ...prev, date: e.target.value }))}
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Cor do ícone</label>
            <Input
                type="color"
                value={cardInfos.color}
                onChange={(e) => setCardInfos(prev => ({ ...prev, color: e.target.value }))}
            />
        </>
    )
}