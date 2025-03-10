import styles from '../../styles/auth.module.css';
import { Button } from '@mui/material';
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import logoCalendar from '../../assets/undraw_calendar_76t8_2.svg';
import { CustomInput } from '../../components/customInput';
import { LayoutAuth } from '../../components/componentsAuth/layoutAuth';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, provider, db } from '../../services/firebaseConnection';
import { signInWithPopup } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface UserLoginProps {
    email: string;
    password: string;
}

export function Login() {
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState<UserLoginProps>({
        email: '',
        password: ''
    })
    const [viewPassword, setViewPassword] = useState(false)

    async function signAccount() {
        await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)

            .then((infoUser) => {
                const user = infoUser.user

                if (user.emailVerified) {
                    navigate('/agenda', { replace: true })
                } else {
                    toast.warning('Por favor, verifique seu email antes de acessar!')
                }
            })

            .catch((error) => {
                console.log(error.code)
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
                        toast.error('Erro ao fazer login!')
                }
            })
    }

    async function loginWithGoogle() {
        try {

            const result = await signInWithPopup(auth, provider)
            const user = result.user

            if (user) {
                navigate('/agenda', { replace: true })
                toast.success(`Bem-vindo(a), ${user.displayName}!`)

                const q = query(
                    collection(db, 'cadastro-usuarios'),
                    where('userId', '==', user.uid)
                )
                const querySnapshot = await getDocs(q)
                if (querySnapshot.empty) {
                    await addDoc(collection(db, 'cadastro-usuarios'), {
                        userId: user.uid,
                        name: user.displayName,
                        email: user.email,
                        createAccount: new Date(),
                        photoUrl: user.photoURL
                    })
                }

            }
        } catch (error) {
            console.log('Erro ao fazer login com google, ' + error)
            toast.error('Erro ao fazer login com Google!')
        }
    }

    async function forgotPassword() {
        if (userLogin.email === '') {
            toast.warning('Digite seu email para enviarmos o link de redefinição de senha.')
            return
        }

        await sendPasswordResetEmail(auth, userLogin.email)
            .then(() => {
                toast.info('Email de redefinição de senha enviado!')
            })
            .catch((error) => {
                console.log('Erro ao enviar o email de redefinição de senha, ' + error)
                toast.error('Ocorreu um erro ao enviar o email de redefinição de senha.')
            })
    }


    return (
        <LayoutAuth
            title='Login'
            description='Bem-vindo(a) de volta! Escolha seu método de login:'
            footerText='Não possui uma conta?'
            footerLink='/cadastro'
            footerLinkText='Crie uma conta!'
            logo={logoCalendar}
        >
            <div className={styles.signGoogle}>
                <button onClick={loginWithGoogle}> <FcGoogle size={30} /> </button>
            </div>

            <div className={styles.continueWithEmail}>
                <hr />
                <span>ou continue com email</span>
                <hr />
            </div>

            <form className={styles.form}>
                <CustomInput
                    label='Email'
                    icon={<MdOutlineEmail size={35} color='#dcdcdc' />}
                    className={styles.icon}
                    value={userLogin.email}
                    onChange={(e) => setUserLogin(prev => ({ ...prev, email: e.target.value }))}
                />

                <CustomInput
                    label='Senha'
                    type={viewPassword ? 'text' : 'password'}
                    className={styles.input}
                    value={userLogin.password}
                    onChange={(e) => setUserLogin(prev => ({ ...prev, password: e.target.value }))}
                    icon={<TbLockPassword size={35} color='#dcdcdc' />}
                    endIcon={viewPassword ? <LuEye size={30} color='#dcdcdc' /> : <LuEyeOff size={30} color='#dcdcdc' />}
                    onEndIconCliclk={() => setViewPassword(!viewPassword)}
                />

                <div className={styles.forgotPassword}>
                    <button type='button' onClick={forgotPassword}>Esqueceu a senha?</button>
                </div>

                <Button variant="contained" color="primary" fullWidth className={styles.btnEntrar} onClick={signAccount} style={{ backgroundColor: '#0B5ED7' }}>
                    Entrar
                </Button>

            </form>
        </LayoutAuth>
    )
}