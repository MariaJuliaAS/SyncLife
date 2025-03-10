import styles from '../../styles/auth.module.css';
import { Button } from '@mui/material';
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from 'react';
import { CustomInput } from '../../components/customInput';
import { LayoutAuth } from '../../components/componentsAuth/layoutAuth';
import logoFinance from '../../assets/undraw_savings_uwjn.svg';
import { auth, db } from '../../services/firebaseConnection';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface UserCreateProps {
    name: string;
    email: string;
    password: string;
}

export function Register() {
    const navigate = useNavigate();
    const [viewPassword, setViewPassword] = useState(false);
    const [userRegister, setUserRegister] = useState<UserCreateProps>({
        name: '',
        email: '',
        password: ''
    })

    async function createAccount() {
        await createUserWithEmailAndPassword(auth, userRegister.email, userRegister.password)
            .then((infoUser) => {
                const user = infoUser.user
                sendEmailVerification(user)

                    .then(() => {
                        toast.success('Email de verificação enviado!')
                        setUserRegister({
                            name: '',
                            email: '',
                            password: ''
                        })

                        addDoc(collection(db, 'cadastro-usuarios'), {
                            name: userRegister.name,
                            email: userRegister.email,
                            password: userRegister.password,
                            userId: auth.currentUser?.uid,
                            createAccount: new Date()
                        })
                    })

                    .catch((error) => {
                        console.log('Erro ao enviar email de verificação, ' + error)
                    })

                navigate('/')

            })
            .catch((error) => {
                if (error.code === 'auth/weak-password') {
                    toast.error('Senha muito fraca!', {
                        closeOnClick: true
                    })
                } else if (error.code === 'auth/email-already-in-use') {
                    toast.error('Esse email já existe!', {
                        closeOnClick: true
                    })
                }
            })
    }


    return (
        <LayoutAuth
            title='Crie uma conta'
            description='Quase lá! Complete seu cadastro e aproveite.'
            footerText='Já possui uma conta?'
            footerLink='/'
            footerLinkText='Entre aqui!'
            logo={logoFinance}
        >
            <form className={styles.form}>
                <CustomInput
                    label='Nome'
                    icon={<IoPersonOutline size={35} color='#dcdcdc' />}
                    className={styles.icon}
                    value={userRegister?.name}
                    onChange={(e) => setUserRegister(prev => ({ ...prev, name: e.target.value }))}
                />

                <CustomInput
                    label='Email'
                    icon={<MdOutlineEmail size={35} color='#dcdcdc' />}
                    className={styles.icon}
                    value={userRegister?.email}
                    onChange={(e) => setUserRegister(prev => ({ ...prev, email: e.target.value }))}
                />

                <CustomInput
                    label='Senha'
                    type={viewPassword ? 'text' : 'password'}
                    className={styles.input}
                    icon={<TbLockPassword size={35} color='#dcdcdc' />}
                    endIcon={viewPassword ? <LuEye size={30} color='#dcdcdc' /> : <LuEyeOff size={30} color='#dcdcdc' />}
                    onEndIconCliclk={() => setViewPassword(!viewPassword)}
                    value={userRegister?.password}
                    onChange={(e) => setUserRegister(prev => ({ ...prev, password: e.target.value }))}
                />

                <Button variant="contained" color="primary" fullWidth className={styles.btnEntrar} onClick={createAccount}>
                    Cadastre-se
                </Button>

            </form>
        </LayoutAuth>

    )
}