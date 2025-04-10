import { GrTarget } from "react-icons/gr";
import { Input } from "../../components/input";
import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

interface UserProps {
    email: string,
    password: string
}

export function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [userLogin, setUserLogin] = useState<UserProps>({
        email: '',
        password: ''
    })

    async function handleLoginUser(e: FormEvent) {
        e.preventDefault()
        setLoading(true)

        await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
            .then((infoUser) => {
                const user = infoUser.user

                if (user.emailVerified) {
                    navigate('/', { replace: true })
                } else {
                    toast('Verfique seu email para acessar!', {
                        icon: 'ℹ️'
                    })
                }
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                switch (error.code) {
                    case 'auth/invalid-credential':
                    case 'auth/wrong-password':
                        toast.error('Email ou senha inválidos!');
                        break;
                    case 'auth/user-not-found':
                        toast.error('Usuário não encontrado!');
                        break;
                    case 'auth/too-many-requests':
                        toast.error('Muitas tentativas, tente mais tarde!');
                        break;
                    default:
                        console.log('Erro ao faze login: ' + error)
                }
            })
    }

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <ImSpinner2 size={50} className="text-emerald-600 animate-spin" />
            </div>
        )
    }

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
                        <h3 className="sm:text-2xl font-bold text-xl">Bem-vindo de volta</h3>
                        <span className="sm:text-base text-sm mt-2 text-gray-500">Entre com suas credenciais para acessar sua conta</span>
                    </div>

                    <form className="flex flex-col" onSubmit={handleLoginUser}>
                        <label className="sm:text-base text-sm mb-2 font-medium">Email</label>
                        <Input
                            placeholder="nome@exemplo.com"
                            type="email"
                            value={userLogin.email}
                            onChange={(e) => setUserLogin(prev => ({ ...prev, email: e.target.value }))}
                            required
                        />
                        <div className="flex justify-between mb-2">
                            <label className="sm:text-base text-sm font-medium">Senha</label>
                            <a className="sm:text-base text-sm text-emerald-600 font-medium select-none cursor-pointer">Esqueceu a senha?</a>
                        </div>
                        <Input
                            placeholder="••••••••"
                            type={showPassword ? 'text' : 'password'}
                            value={userLogin.password}
                            onChange={(e) => setUserLogin(prev => ({ ...prev, password: e.target.value }))}
                            required
                        />
                        <div className="flex items-center">
                            <input
                                type='checkbox'
                                className="accent-emerald-600"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                            <label className="sm:text-base text-sm ml-3">{showPassword ? 'Ocultar senha' : 'Mostrar Senha'}</label>
                        </div>

                        <button className="sm:text-lg text-base my-5 bg-emerald-600 rounded-md py-1 text-white font-medium cursor-pointer transition-all duration-200 hover:scale-105" type="submit">
                            Entrar
                        </button>
                    </form>

                    <p className="sm:text-base text-sm mt-2 text-gray-500 text-center">
                        Não tem uma conta?
                        <Link to='/register' className="select-none cursor-pointer text-emerald-600 font-medium"> Crie sua conta</Link>
                    </p>
                </article>
            </section>
        </main>
    )
}