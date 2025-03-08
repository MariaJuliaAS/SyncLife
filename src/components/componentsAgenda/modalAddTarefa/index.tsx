import styles from '../../../styles/modalAgenda.module.css'
import '../../../styles/modal.css'
import { formatarData } from '../../../utils/dataFormatada';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../services/firebaseConnection';
import Button from "@mui/material/Button";
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { LayoutForm } from '../layoutForm';
import { auth } from '../../../services/firebaseConnection';

interface ModalAddTarefaProps {
    fecharModal: () => void;
    dataSelecionada: string | null;
}

interface TarefaProps {
    titulo: string;
    descricao: string;
    dataHoraInicio: string | undefined;
    dataHoraFim: string;
    status: string;
    prioridade: string;
    backgroundColor: string;
    userId?: string;
}

export function ModalAddTarefa({ fecharModal, dataSelecionada }: ModalAddTarefaProps) {

    const { dataFormatada, dataHoraFormatada, temHorario, dataAjustada } = formatarData(dataSelecionada)

    const [tarefa, setTarefa] = useState<TarefaProps>({
        titulo: '',
        descricao: '',
        dataHoraInicio: dataAjustada,
        dataHoraFim: '',
        status: '',
        prioridade: '',
        backgroundColor: '#0B5ED7',
        userId: auth.currentUser?.uid
    })

    async function addTarefa() {
        try {

            if (tarefa.titulo === '' || tarefa.descricao === '' || tarefa.dataHoraFim === '' || tarefa.status === '' || tarefa.prioridade === '') {
                return toast.warning('Preencha todos os campos')
            }

            await addDoc(collection(db, 'tarefas'), tarefa)
            setTarefa({
                titulo: '',
                descricao: '',
                dataHoraInicio: dataAjustada,
                dataHoraFim: '',
                status: '',
                prioridade: '',
                backgroundColor: '',
                userId: ''
            })
            toast.success('Tarefa adicionada com sucesso!')
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <main className='sobreposicao'>
            <motion.div className='conteudo'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >

                <section className='header'>
                    <h1>{temHorario ? dataHoraFormatada : dataFormatada}</h1>
                    <button onClick={fecharModal}>X</button>
                </section>

                <LayoutForm
                    tarefa={tarefa}
                    setTarefa={setTarefa}
                />

                <section className={styles.btn}>
                    <Button variant="contained" color="primary" onClick={addTarefa} className={styles.btnAdicionar}>
                        Adicionar
                    </Button>
                </section>

            </motion.div>
        </main>
    )
}