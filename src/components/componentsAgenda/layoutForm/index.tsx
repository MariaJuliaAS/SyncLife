import styles from '../../../styles/modalAgenda.module.css';
import { TextField, FormControl, MenuItem, Select, InputLabel } from '@mui/material';


interface TaksProps {
    titulo: string;
    descricao: string;
    dataHoraInicio: string | undefined;
    dataHoraFim: string;
    status: string;
    prioridade: string,
    backgroundColor: string;
    userId?: string;
}

interface FormProps {
    tarefa: TaksProps;
    setTarefa: React.Dispatch<React.SetStateAction<TaksProps>>
    habilitarEdicao?: boolean;
}

export function LayoutForm({ tarefa, setTarefa, habilitarEdicao }: FormProps) {
    return (
        <section className={styles.form}>
            <TextField label="Título da tarefa" variant="outlined" fullWidth value={tarefa.titulo} disabled={habilitarEdicao} onChange={(e) => setTarefa(prev => ({ ...prev, titulo: e.target.value }))} />
            <TextField label="Descrição da tarefa" variant="outlined" fullWidth multiline value={tarefa.descricao} disabled={habilitarEdicao} onChange={(e) => setTarefa(prev => ({ ...prev, descricao: e.target.value }))} />
            <TextField type='datetime-local' label='Inicio' fullWidth value={tarefa.dataHoraInicio} disabled={habilitarEdicao} onChange={(e) => setTarefa(prev => ({ ...prev, dataHoraInicio: e.target.value }))} />
            <TextField
                type='datetime-local'
                label='Fim'
                fullWidth
                value={tarefa.dataHoraFim}
                disabled={habilitarEdicao}
                InputLabelProps={{
                    shrink: true
                }}
                onChange={(e) => setTarefa(prev => ({ ...prev, dataHoraFim: e.target.value }))} />

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
                        <MenuItem value='Média prioridade'>Média prioridade</MenuItem>
                        <MenuItem value='Baixa prioridade'>Baixa prioridade</MenuItem>
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
                        <MenuItem value='Concluido'>Concluido</MenuItem>
                        <MenuItem value='Pendente'>Pendente</MenuItem>
                    </Select>
                </FormControl>

            </div>
        </section>
    )
}