import { Input } from "../../input";
import { TransactionPros } from "./modalAddTransaction";

interface LayoutTransactionProps {
    transaction: TransactionPros;
    setTransaction: React.Dispatch<React.SetStateAction<TransactionPros>>;
}

export function LayoutModalAddTransaction({ transaction, setTransaction }: LayoutTransactionProps) {
    console.log(transaction)
    return (
        <>
            <label className="sm:text-base text-sm mb-2 font-medium">Tipo</label>
            <div className="flex items-center mb-4">
                <input className="accent-emerald-600 mr-3"
                    type="radio"
                    name="type"
                    value='Receita'
                    checked={transaction.type === 'Receita'}
                    onChange={(e) => setTransaction(prev => ({ ...prev, type: e.target.value }))} />
                <label className="mr-3">Receita</label>
                <input className="accent-emerald-600 mr-3"
                    type="radio"
                    name="type"
                    value='Despesa'
                    checked={transaction.type === 'Despesa'}
                    onChange={(e) => setTransaction(prev => ({ ...prev, type: e.target.value }))} />
                <label>Despesa</label>
            </div>
            <label className="sm:text-base text-sm mb-2 font-medium">Descrição</label>
            <Input
                placeholder="Ex: Salário, Supermercado, ect."
                value={transaction.description}
                onChange={(e) => setTransaction(prev => ({ ...prev, description: e.target.value }))} />
            <label className="sm:text-base text-sm mb-2 font-medium">Valor (R$)</label>
            <Input
                placeholder="R$ 0,00"
                type="number"
                value={transaction.value}
                onChange={(e) => setTransaction(prev => ({ ...prev, value: Number(e.target.value) }))} />
            <label className="sm:text-base text-sm mb-2 font-medium">Data</label>
            <Input
                type="datetime-local"
                value={transaction.created}
                onChange={(e) => setTransaction(prev => ({ ...prev, created: e.target.value }))} />
            <label className="sm:text-base text-sm mb-2 font-medium">Categoria</label>
            <select
                className="border border-gray-200 h-10 rounded-md outline-none px-2 mb-4 bg-white"
                value={transaction.category}
                onChange={(e) => setTransaction(prev => ({ ...prev, category: e.target.value }))}>
                <option value="" disabled>Selecione uma categoria</option>
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
            <select
                className="border border-gray-200 h-10 rounded-md outline-none px-2 mb-4 bg-white"
                value={transaction.paymentForm}
                onChange={(e) => setTransaction(prev => ({ ...prev, paymentForm: e.target.value }))}>
                <option value="" disabled>Selecione uma forma de pagamento</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Pix">Pix</option>
            </select>
            <label className="sm:text-base text-sm mb-2 font-medium">Observações (opcional)</label>
            <textarea
                placeholder="Adicione detalhes sobre a transação"
                rows={3} className="border border-gray-200 rounded-md outline-none px-2 mb-4 bg-white"
                value={transaction.observation}
                onChange={(e) => setTransaction(prev => ({ ...prev, observation: e.target.value }))} />

        </>
    )
}