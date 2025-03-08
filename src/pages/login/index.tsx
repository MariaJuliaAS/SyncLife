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


export function Login() {

    const [viewPassword, setViewPassword] = useState(false)

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
                />

                <CustomInput
                    label='Senha'
                    type={viewPassword ? 'text' : 'password'}
                    className={styles.input}
                    icon={<TbLockPassword size={35} color='#dcdcdc' />}
                    endIcon={viewPassword ? <LuEye size={30} color='#dcdcdc' /> : <LuEyeOff size={30} color='#dcdcdc' />}
                    onEndIconCliclk={() => setViewPassword(!viewPassword)}
                />

                <Button variant="contained" color="primary" fullWidth className={styles.btnEntrar}>
                    Entrar
                </Button>

            </form>
        </LayoutAuth>
    )
}