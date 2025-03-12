import '../../../styles/modal.css';
import { motion } from 'framer-motion';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import styles from '../../../styles/modalAgenda.module.css'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../services/firebaseConnection';
import { toast } from 'react-toastify';

interface TransactionsProps {
    value: number;
    type?: 'exit' | 'entry';
    date: string;
    description: string;
    id: string
}

interface InfosProps {
    infos: TransactionsProps,
    closeModal: () => void
}

export function ModalAccountBalance({ infos, closeModal }: InfosProps) {
    const [infosEdit, setInfosEdit] = useState<TransactionsProps>({
        value: infos.value,
        date: infos.date,
        description: infos.description,
        id: infos.id
    })

    async function editTransaction() {
        const updateRef = doc(db, 'finances-transactions', infos.id)
        try {

            if (infos.value === 0 || infos.description === '') {
                return toast.warning('Preencha todos os campos!')
            }

            await updateDoc(updateRef, {
                value: infosEdit.value,
                description: infosEdit.description
            })

            toast.success('Transação editada com sucesso!')
            closeModal()

        } catch (error) {
            console.log('Erro ao editar transação: ' + error)
        }


    }

    async function deletTransaction() {
        try {
            await deleteDoc(doc(db, 'finances-transactions', infos.id))
            toast.success('Transação deletada com sucesso!')
            closeModal()
        } catch (error) {
            console.log('Erro ao deletar transação: ' + error)
        }
    }

    return (
        <main className="sobreposicao">
            <motion.div className='conteudo'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >

                <div className='header'>
                    <h1>Editar ou Excluir transação</h1>
                    <button onClick={closeModal}>X</button>
                </div>

                <div className={styles.form}>
                    <TextField
                        fullWidth
                        label='Valor'
                        InputLabelProps={{ shrink: true }}
                        value={infosEdit.value}
                        onChange={(e) => setInfosEdit(prev => ({ ...prev, value: Number(e.target.value) }))}
                    />

                    <TextField
                        fullWidth
                        label='Descrição'
                        InputLabelProps={{ shrink: true }}
                        value={infosEdit.description}
                        onChange={(e) => setInfosEdit(prev => ({ ...prev, description: e.target.value }))}
                    />
                </div>

                <div className={styles.btn}>
                    <Button variant="contained" color="primary" style={{ backgroundColor: '#0B5ED7' }} onClick={editTransaction}>Editar</Button>
                    <Button variant="contained" color="primary" style={{ backgroundColor: '#0B5ED7' }} onClick={deletTransaction}>Excluir</Button>
                </div>

            </motion.div>
        </main>
    )
}