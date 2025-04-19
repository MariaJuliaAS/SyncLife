import { Input } from "../../input";


export function LayoutModalAddPayment() {
    return (
        <>
            <label className="sm:text-base text-sm mb-2 font-medium">Cartão</label>
            <select required className="border border-gray-200 h-10 rounded-md outline-none px-2 mb-4 bg-white">
                <option value="" disabled>Selecione um cartão</option>
                <option value="Nubank">Nubank</option>
                <option value="Will">Will</option>
            </select>
            <label className="sm:text-base text-sm mb-2 font-medium">Estabelecimento</label>
            <Input
                placeholder="Spotify"
                required
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Categoria</label>
            <select required className="border border-gray-200 h-10 rounded-md outline-none px-2 mb-4 bg-white">
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
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Data</label>
            <Input
                type="datetime-local"
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Observação (opcional)</label>
            <textarea
                placeholder="Adicione detalhes sobre o pagamento"
                rows={3}
                className="border border-gray-200 rounded-md outline-none px-2 mb-4 bg-white"
            />
        </>
    )
}