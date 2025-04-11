import { Input } from "../input";


export function LayoutModalAddTransaction() {
    return (
        <>
            <label className="sm:text-base text-sm mb-2 font-medium">Tipo</label>
            <div className="flex items-center mb-4">
                <input className="accent-emerald-600 mr-3" type="radio" name="type" />
                <label className="mr-3">Receita</label>
                <input className="accent-emerald-600 mr-3" type="radio" name="type" />
                <label>Despesa</label>
            </div>
            <label className="sm:text-base text-sm mb-2 font-medium">Descrição</label>
            <Input placeholder="Ex: Salário, Supermercado, ect." />
            <label className="sm:text-base text-sm mb-2 font-medium">Valor (R$)</label>
            <Input placeholder="R$ 0,00" type="number" />
            <label className="sm:text-base text-sm mb-2 font-medium">Data</label>
            <Input type="date" />
            <label className="sm:text-base text-sm mb-2 font-medium">Categoria</label>
            <select className="border border-gray-200 h-10 rounded-md outline-none px-2 mb-4 bg-white">
                <option value="" selected disabled>Selecione uma categoria</option>
                <option value="Salário">Salário</option>
                <option value="Investimentos">Investimentos</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Transporte">Transporte</option>
                <option value="Lazer">Lazer</option>
                <option value="Saúde">Saúde</option>
                <option value="Educação">Educação</option>
                <option value="Outros">Outros</option>
            </select>
            <label className="sm:text-base text-sm mb-2 font-medium">Forma de Pagamento</label>
            <select className="border border-gray-200 h-10 rounded-md outline-none px-2 mb-4 bg-white">
                <option value="" selected disabled>Selecione uma forma de pagamento</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Pix">Pix</option>
            </select>
            <label className="sm:text-base text-sm mb-2 font-medium">Observações (opcional)</label>
            <textarea placeholder="Adicione detalhes sobre a transação" rows={3} className="border border-gray-200 rounded-md outline-none px-2 mb-4 bg-white" />

        </>
    )
}