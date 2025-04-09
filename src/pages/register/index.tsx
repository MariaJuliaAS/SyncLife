import { Input } from "../../components/input";
import { GrTarget } from "react-icons/gr";

export function Register() {
    return (
        <main className="h-screen w-full flex items-center justify-center bg-gray-50">
            <section className="w-full max-w-lg px-6">
                <div className="flex flex-col items-center mb-10">
                    <GrTarget color="#fff" className="sm:text-5xl text-4xl mb-5 bg-emerald-600 rounded-xl p-2" />
                    <p className="sm:text-4xl font-bold text-3xl">SyncLife</p>
                    <span className="sm:text-base text-sm mt-2 text-gray-500">Gerencie suas finanças e agenda em um só lugar</span>
                </div>

                <article className="sm:px-6 shadow-2xl bg-white border border-gray-200 px-4 py-8 w-full rounded" >
                    <div className="flex flex-col items-center text-center mb-6">
                        <h3 className="sm:text-2xl font-bold text-xl">Crie sua conta</h3>
                        <span className="sm:text-base text-sm mt-2 text-gray-500">Preencha os campos abaixo para começar a usar o SyncLife</span>
                    </div>

                    <form className="flex flex-col">
                        <label className="sm:text-base text-sm mb-2 font-medium">Nome</label>
                        <Input
                            placeholder='João Silva'
                            type="text"
                        />
                        <label className="sm:text-base text-sm mb-2 font-medium">Email</label>
                        <Input
                            placeholder="nome@exemplo.com"
                            type="email"
                        />
                        <label className="sm:text-base text-sm font-medium mb-2">Senha</label>
                        <Input
                            placeholder="••••••••"
                            type="password"
                        />
                        <button className="sm:text-lg text-base my-5 bg-emerald-600 rounded-md py-1 text-white font-medium">
                            Criar Conta
                        </button>
                    </form>

                    <p className="sm:text-base text-sm mt-2 text-gray-500 text-center">
                        Não tem uma conta?
                        <a className="select-none cursor-pointer text-emerald-600 font-medium"> Crie sua conta</a>
                    </p>
                </article>
            </section>
        </main>
    )
}