import styles from '../../styles/account.module.css';
import { FaCircleUser } from 'react-icons/fa6';
import { CustomInput } from '../../components/customInput';
import { IoPersonOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { TbLockPassword } from 'react-icons/tb';
import { auth, db } from '../../services/firebaseConnection';
import { deleteUser } from 'firebase/auth';
import { collection, deleteDoc, query, where, getDocs } from 'firebase/firestore';

export function Account() {

    return (
        <main className={styles.container}>
            <div className={styles.accountArea}>
                <div className={styles.areaHello}>
                    <h1>Olá, Maria Júlia 👋</h1>
                    <span>Seja bem-vindo(a) a nossa área de conta</span>
                </div>

                <div className={styles.form}>

                    <div className={styles.areaAddImg}>
                        <FaCircleUser size={100} color="#808080" className={styles.iconUser} />
                        <span className={styles.addImg}>Adicionar imagem</span>
                    </div>

                    <div className={styles.inputArea} style={{ display: 'flex', flexDirection: 'row' }}>
                        <CustomInput
                            label='Nome'
                            icon={<IoPersonOutline size={35} color='#dcdcdc' />}
                            className={styles.input}
                        />
                        <span>Alterar nome</span>
                    </div>
                    <div className={styles.inputArea} style={{ display: 'flex', flexDirection: 'row' }}>
                        <CustomInput
                            label='Email'
                            icon={<MdOutlineEmail size={35} color='#dcdcdc' />}
                            className={styles.input}
                        />
                        <span>Alterar email</span>
                    </div>
                    <div className={styles.inputArea} style={{ display: 'flex', flexDirection: 'row' }}>
                        <CustomInput
                            label='Senha'
                            icon={<TbLockPassword size={35} color='#dcdcdc' />}
                            className={styles.input}
                        />
                        <span>Alterar senha</span>
                    </div>
                </div>

                <footer className={styles.areaDelet}>
                    <hr />
                    <p>Área perigosa ⚠️</p>
                    <button>Deletar conta</button>
                </footer>
            </div>

        </main>
    )
}