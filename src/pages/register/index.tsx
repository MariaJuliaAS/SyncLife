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
import logoFinance from '../../assets/undraw_savings_uwjn.svg'


export function Register() {

    const [viewPassword, setViewPassword] = useState(false)

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
                />

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
                    Cadastre-se
                </Button>

            </form>
        </LayoutAuth>

    )
}