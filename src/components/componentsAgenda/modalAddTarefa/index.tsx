import styles from '../../../styles/modalAddTarefa.module.css';
import '../../../styles/modal.css'
import { formatarData } from '../../../utils/dataFormatada';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../services/firebaseConnection';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify'

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
    cor: string;
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
        cor: '#0B5ED7'
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
                cor: ''
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

                <section className={styles.addArea}>
                    <div className={styles.inputsText}>
                        <TextField
                            label="Título da tarefa"
                            variant='outlined'
                            fullWidth
                            value={tarefa.titulo}
                            name="titulo"
                            onChange={(e) => setTarefa(prev => ({ ...prev, titulo: e.target.value }))}
                        />

                        <TextField
                            label="Descrição da tarefa"
                            value={tarefa.descricao}
                            variant='outlined'
                            fullWidth
                            multiline
                            name="descricao"
                            onChange={(e) => setTarefa(prev => ({ ...prev, descricao: e.target.value }))}
                        />
                    </div>

                    <div className={styles.inputsSelect}>
                        <div className={styles.inputsLinha}>

                            <TextField
                                type='datetime-local'
                                label='Inicio'
                                variant='outlined'
                                value={tarefa.dataHoraInicio}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => setTarefa(prev => ({ ...prev, dataHoraInicio: e.target.value }))}
                            />

                            <TextField
                                type='datetime-local'
                                label='Fim'
                                variant='outlined'
                                value={tarefa.dataHoraFim}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => setTarefa(prev => ({ ...prev, dataHoraFim: e.target.value }))}
                            />
                        </div>

                        <div className={styles.inputsLinha}>
                            <FormControl fullWidth>
                                <InputLabel id="select-status">Status</InputLabel>
                                <Select
                                    labelId="select-label"
                                    label="Status"
                                    variant='outlined'
                                    value={tarefa.status}
                                    onChange={(e) => setTarefa(prev => ({ ...prev, status: e.target.value }))}
                                >
                                    <MenuItem value='Concluido'>🟢 Concluido</MenuItem>
                                    <MenuItem value='Pendente'>🟠 Pendente</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="select-prioridade">Prioridade</InputLabel>
                                <Select
                                    labelId="select-label"
                                    label="Prioridade"
                                    variant='outlined'
                                    value={tarefa.prioridade}
                                    onChange={(e) => setTarefa(prev => ({ ...prev, prioridade: e.target.value }))}
                                >
                                    <MenuItem value='Alta prioridade'>Alta prioridade</MenuItem>
                                    <MenuItem value='Baixa prioridade'>Média prioridade</MenuItem>
                                    <MenuItem value='Média prioridade'>Baixa prioridade</MenuItem>
                                </Select>
                            </FormControl>
                            <input className={styles.inputCor} type='color' value={tarefa.cor} onChange={(e) => setTarefa(prev => ({ ...prev, cor: e.target.value }))} />
                        </div>

                    </div>
                    <Button variant="contained" color="primary" onClick={addTarefa} className={styles.btnAdicionar}>
                        Adicionar
                    </Button>
                </section>

            </motion.div>
        </main>
    )
}