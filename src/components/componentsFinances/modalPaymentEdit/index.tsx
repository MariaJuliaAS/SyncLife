import '../../../styles/modal.css';
import styles from '../../../styles/modalAgenda.module.css'
import { motion } from 'framer-motion';
import { TextField, FormControl, Select, Button, InputLabel, MenuItem } from '@mui/material';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebaseConnection';
import { toast } from 'react-toastify';

interface PaymentsProps {
    description: string;
    value: number | null;
    method: string;
    installments: string;
    payday: string;
    status: string;
    responsible: string;
    id: string;
}

interface ModalPaymentProps {
    closeModal: () => void;
    infos: PaymentsProps
}

export function ModalPaymentEdit({ closeModal, infos }: ModalPaymentProps) {
    const [infosPaymentEdit, setInfosPaymentEdit] = useState<PaymentsProps>({
        description: infos.description,
        value: infos.value,
        method: infos.method,
        status: infos.status,
        installments: infos.installments,
        payday: infos.payday,
        responsible: infos.responsible,
        id: infos.id
    })

    async function handleEditPayment() {
        const updateRef = doc(db, 'finances-payments', infos.id)
        try {

            await updateDoc(updateRef, {
                description: infosPaymentEdit.description,
                value: infosPaymentEdit.value,
                method: infosPaymentEdit.method,
                status: infosPaymentEdit.status,
                installments: infosPaymentEdit.installments,
                payday: infosPaymentEdit.payday,
                responsible: infosPaymentEdit.responsible,
            })

            toast.success('Pagamento editado com sucesso!')
            closeModal()

        } catch (error) {
            console.log('Erro ao editar pagamento: ' + error)
        }
    }

    return (
        <main className="sobreposicao">
            <motion.div className="conteudo"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >

                <div className='header'>
                    <h1>Edite seu pagamento</h1>
                    <button onClick={closeModal}>X</button>
                </div>

                <div className={styles.form}>
                    <TextField
                        fullWidth
                        label='Descrição'
                        value={infosPaymentEdit.description}
                        onChange={(e) => setInfosPaymentEdit(prev => ({ ...prev, description: e.target.value }))}
                    />
                    <TextField
                        fullWidth
                        label='Valor'
                        type='number'
                        value={infosPaymentEdit.value}
                        onChange={(e) => setInfosPaymentEdit(prev => ({ ...prev, value: Number(e.target.value) }))}
                    />

                    <div className={styles.selects}>

                        <FormControl fullWidth>
                            <InputLabel id='select-method'>Método</InputLabel>
                            <Select
                                labelId='select-method'
                                label='Método'
                                variant='outlined'
                                value={infosPaymentEdit.method}
                                onChange={(e) => setInfosPaymentEdit(prev => ({ ...prev, method: e.target.value }))}
                            >
                                <MenuItem value='Cartão (will)'>Cartão (will)</MenuItem>
                                <MenuItem value='Boleto'>Boleto</MenuItem>
                                <MenuItem value='Pix'>Pix</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id='select-status'>Status</InputLabel>
                            <Select
                                labelId='select-status'
                                label='Status'
                                variant='outlined'
                                value={infosPaymentEdit.status}
                                onChange={(e) => setInfosPaymentEdit(prev => ({ ...prev, status: e.target.value }))}
                            >
                                <MenuItem value='Pago'>Pago</MenuItem>
                                <MenuItem value='Pendente'>Pendente</MenuItem>
                            </Select>
                        </FormControl>

                    </div>

                    <div className={styles.selects}>
                        <TextField
                            fullWidth
                            label='Parcelas'
                            value={infosPaymentEdit.installments}
                            onChange={(e) => setInfosPaymentEdit(prev => ({ ...prev, installments: e.target.value }))}
                        />
                        <TextField
                            fullWidth
                            label='Vencimento'
                            type='date'
                            InputLabelProps={{ shrink: true }}
                            value={infosPaymentEdit.payday}
                            onChange={(e) => setInfosPaymentEdit(prev => ({ ...prev, payday: e.target.value }))}
                        />
                    </div>

                    <TextField
                        fullWidth
                        label='Responsável'
                        value={infosPaymentEdit.responsible}
                        onChange={(e) => setInfosPaymentEdit(prev => ({ ...prev, responsible: e.target.value }))}
                    />

                </div>

                <div className={styles.btn}>
                    <Button onClick={handleEditPayment} fullWidth variant='contained' color='primary' style={{ backgroundColor: '#0B5ED7' }}>
                        Editar
                    </Button>
                </div>

            </motion.div>
        </main>
    )
}