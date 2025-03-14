import styles from '../../../styles/modalAgenda.module.css';
import '../../../styles/modal.css'
import { formatarData } from '../../../utils/dataFormatada';
import Button from "@mui/material/Button";
import { useState } from 'react';
import { db } from '../../../services/firebaseConnection';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { LayoutForm } from '../layoutForm';

interface InfosProps {
    infos: {
        title: string;
        start: string;
        end: string;
        description: string;
        status: string;
        backgroundColor: string;
        id: string;
    }
    fecharModal: () => void;
}

interface TarefaProps {
    titulo: string;
    descricao: string;
    dataHoraInicio: string | undefined;
    dataHoraFim: string;
    status: string;
    backgroundColor: string;
}

export function ModalInfoTarefa({ infos, fecharModal }: InfosProps) {
    const [habilitarEdicao, setHabilitarEdicao] = useState(true);

    const dataInicio = formatarData(infos.start);
    const dataFim = formatarData(infos.end);

    const [tarefa, setTarefa] = useState<TarefaProps>({
        titulo: infos.title,
        descricao: infos.description,
        dataHoraInicio: infos.start.slice(0, 16),
        dataHoraFim: infos.end.slice(0, 16),
        status: infos.status,
        backgroundColor: infos.backgroundColor
    })
    console.log(infos.end)

    async function salvarEdicao() {
        const docRef = doc(db, 'tarefas', infos.id)

        try {

            if (tarefa.titulo === '' || tarefa.descricao === '' || tarefa.dataHoraFim === '' || tarefa.status === '') {
                return toast.warning('Preencha todos os campos!')
            }

            await updateDoc(docRef, {
                titulo: tarefa.titulo,
                descricao: tarefa.descricao,
                status: tarefa.status,
                dataHoraInicio: tarefa.dataHoraInicio,
                dataHoraFim: tarefa.dataHoraFim,
                backgroundColor: tarefa.backgroundColor
            })
            fecharModal()
            window.location.reload()
            toast.success('Edição salva com sucesso!')

        }
        catch (erro) {
            console.log(erro)
        }
    }

    async function excluirTarefa() {
        await deleteDoc(doc(db, 'tarefas', infos.id))
            .then(() => {
                toast.success('Tarefa deletada com sucesso!')
                fecharModal();
            })
            .catch((err) => {
                console.log(err)
            })
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
                    {dataInicio.dataFormatada === dataFim.dataFormatada ? <h1>{dataInicio.dataHoraFormatada} - {dataFim.horaFormatada}</h1> : <h1>{dataInicio.dataHoraFormatada} - {dataFim.dataHoraFormatada}</h1>}
                    <button onClick={fecharModal}>X</button>
                </section>

                <LayoutForm
                    tarefa={tarefa}
                    setTarefa={setTarefa}
                    habilitarEdicao={habilitarEdicao}
                />

                <section className={styles.btn}>

                    {habilitarEdicao ?
                        <Button variant="contained" color="primary" onClick={() => setHabilitarEdicao(!habilitarEdicao)} style={{ backgroundColor: '#0B5ED7' }}>Editar</Button> :
                        <Button variant='contained' color='primary' onClick={salvarEdicao} style={{ backgroundColor: '#0B5ED7' }}>Salvar edição</Button>}

                    <Button variant="contained" color="primary" onClick={excluirTarefa} style={{ backgroundColor: '#0B5ED7' }}>
                        Excluir
                    </Button>
                </section>
            </motion.div>
        </main>

    )
}