import { Input } from "../../components/input";
import { GrTarget } from "react-icons/gr";
import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../../services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

interface UserProps {
    name: string;
    email: string;
    password: string;
}

export function Register() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userRegister, setUserRegister] = useState<UserProps>({
        name: '',
        email: '',
        password: '',
    })

    async function handlerRegisterUser(e: FormEvent) {
        e.preventDefault()
        setLoading(true)

        await createUserWithEmailAndPassword(auth, userRegister.email, userRegister.password)
            .then((infoUser) => {
                const user = infoUser.user
                sendEmailVerification(user)

                    .then(() => {
                        setUserRegister({
                            name: '',
                            email: '',
                            password: ''
                        })

                        addDoc(collection(db, 'userRegister'), {
                            name: userRegister.name,
                            email: user.email,
                            userId: user.uid
                        })
                        console.log('Usuário adicionado')
                    })
                navigate('/login')
                setLoading(false)
            })
            .catch((error) => {
                console.log('Erro ao cadastrar usuário: ' + error)

                if (error.code === 'auth/email-already-in-use') {
                    alert('Email já cadastrado')
                } else if (error.code === 'auth/weak-password') {
                    alert('Senha muito fraca')
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
                        <h3 className="sm:text-2xl font-bold text-xl">Crie sua conta</h3>
                        <span className="sm:text-base text-sm mt-2 text-gray-500">Preencha os campos abaixo para começar a usar o SyncLife</span>
                    </div>

                    <form className="flex flex-col" onSubmit={handlerRegisterUser}>
                        <label className="sm:text-base text-sm mb-2 font-medium">Nome</label>
                        <Input
                            placeholder='João Silva'
                            type="text"
                            value={userRegister?.name}
                            onChange={(e) => setUserRegister(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <label className="sm:text-base text-sm mb-2 font-medium">Email</label>
                        <Input
                            placeholder="nome@exemplo.com"
                            type="email"
                            value={userRegister.email}
                            onChange={(e) => setUserRegister(prev => ({ ...prev, email: e.target.value }))}
                        />
                        <label className="sm:text-base text-sm font-medium mb-2">Senha</label>
                        <Input
                            placeholder="••••••••"
                            type={showPassword ? 'text' : 'password'}
                            value={userRegister.password}
                            onChange={(e) => setUserRegister(prev => ({ ...prev, password: e.target.value }))}
                        />
                        <div className="flex items-center">
                            <input
                                type='checkbox'
                                className="accent-emerald-600"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                            <label className="sm:text-base text-sm ml-3">{showPassword ? 'Ocultar senha' : 'Mostrar Senha'}</label>
                        </div>

                        <button type="submit" className="sm:text-lg text-base my-5 bg-emerald-600 rounded-md py-1 text-white font-medium cursor-pointer transition-all duration-200 hover:scale-105">
                            Criar Conta
                        </button>
                    </form>

                    <p className="sm:text-base text-sm mt-2 text-gray-500 text-center">
                        Já possui uma conta?
                        <Link to='/login' className="select-none cursor-pointer text-emerald-600 font-medium"> Entrar</Link>
                    </p>
                </article>
            </section>
        </main>
    )
}