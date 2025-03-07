import styles from '../../styles/modalInfoTarefa.module.css';
import '../../styles/modal.css'
import { formatarData } from '../../utils/dataFormatada';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';
import { db } from '../../services/firebaseConnection';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

interface InfosProps {
    infos: {
        title: string;
        start: string;
        end: string;
        description: string;
        status: string;
        priority: string;
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
    prioridade: string,
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
        prioridade: infos.priority,
        backgroundColor: infos.backgroundColor
    })

    async function salvarEdicao() {
        const docRef = doc(db, 'tarefas', infos.id)

        try {
            if (tarefa.titulo === '' || tarefa.descricao === '' || tarefa.dataHoraFim === '' || tarefa.status === '' || tarefa.prioridade === '') {
                return toast.warning('Preencha todos os campos!')
            }
            await updateDoc(docRef, {
                titulo: tarefa.titulo,
                descricao: tarefa.descricao,
                status: tarefa.status,
                prioridade: tarefa.prioridade,
                dataHoraInicio: tarefa.dataHoraInicio,
                dataHoraFim: tarefa.dataHoraFim,
                cor: tarefa.backgroundColor
            })
            fecharModal()
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

                <section className={styles.form}>
                    <TextField label="Título" variant="outlined" fullWidth value={tarefa.titulo} disabled={habilitarEdicao} onChange={(e) => setTarefa(prev => ({ ...prev, titulo: e.target.value }))} />
                    <TextField label="Descrição" variant="outlined" fullWidth multiline value={tarefa.descricao} disabled={habilitarEdicao} onChange={(e) => setTarefa(prev => ({ ...prev, descricao: e.target.value }))} />
                    <TextField type='datetime-local' label='inicio' fullWidth value={tarefa.dataHoraInicio} disabled={habilitarEdicao} onChange={(e) => setTarefa(prev => ({ ...prev, dataHoraInicio: e.target.value }))} />
                    <TextField type='datetime-local' label='fim' fullWidth value={tarefa.dataHoraFim} disabled={habilitarEdicao} onChange={(e) => setTarefa(prev => ({ ...prev, dataHoraFim: e.target.value }))} />

                    <div className={styles.selects}>

                        <FormControl fullWidth>
                            <InputLabel id="select-prioridadel">Nível de prioridade</InputLabel>
                            <Select
                                labelId="select-label"
                                label="Nível de prioridade"
                                variant='outlined'
                                value={tarefa.prioridade}
                                disabled={habilitarEdicao}
                                className={styles.status}
                                onChange={(e) => setTarefa(prev => ({ ...prev, prioridade: e.target.value }))}
                            >
                                <MenuItem value='Alta prioridade'>Alta prioridade</MenuItem>
                                <MenuItem value='Baixa prioridade'>Média prioridade</MenuItem>
                                <MenuItem value='Média prioridade'>Baixa prioridade</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="select-status">Status</InputLabel>
                            <Select
                                labelId="select-label"
                                label="Status"
                                variant='outlined'
                                value={tarefa.status}
                                disabled={habilitarEdicao}
                                className={styles.prioridade}
                                onChange={(e) => setTarefa(prev => ({ ...prev, status: e.target.value }))}
                            >
                                <MenuItem value='Concluido'>🟢 Concluido</MenuItem>
                                <MenuItem value='Pendente'>🟠 Pendente</MenuItem>
                            </Select>
                        </FormControl>
                        <input type='color' value={tarefa.backgroundColor} disabled={habilitarEdicao} className={styles.inputCor} onChange={(e) => setTarefa(prev => ({ ...prev, backgroundColor: e.target.value }))} />
                    </div>
                </section>

                <section className={styles.btn}>

                    {habilitarEdicao ?
                        <Button variant="contained" color="primary" onClick={() => setHabilitarEdicao(!habilitarEdicao)}>Editar</Button> :
                        <Button variant='contained' color='primary' onClick={salvarEdicao}>Salvar edição</Button>}

                    <Button variant="contained" color="primary" onClick={excluirTarefa}>
                        Excluir
                    </Button>
                </section>
            </motion.div>
        </main>

    )
}