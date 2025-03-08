import styles from '../../styles/auth.module.css';
import { Button } from '@mui/material';
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { useState } from 'react';
import logoCalendar from '../../assets/undraw_calendar_76t8_2.svg';
import { CustomInput } from '../../components/customInput';
import { LayoutAuth } from '../../components/componentsAuth/layoutAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';
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

    return (
        <LayoutAuth
            title='Login'
            description='Bem-vindo(a) de volta! Faça seu login e aproveite.'
            footerText='Não possui uma conta?'
            footerLink='/cadastro'
            footerLinkText='Crie uma conta!'
            logo={logoCalendar}
        >

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

                <Button variant="contained" color="primary" fullWidth className={styles.btnEntrar} onClick={signAccount}>
                    Entrar
                </Button>

            </form>
        </LayoutAuth>
    )
}