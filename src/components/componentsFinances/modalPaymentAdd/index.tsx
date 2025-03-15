import { FormControl, InputLabel, Select, TextField, MenuItem, Button } from '@mui/material';
import '../../../styles/modal.css';
import styles from '../../../styles/modalAgenda.module.css'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../services/firebaseConnection';
import { toast } from 'react-toastify';

interface PaymentsProps {
    description: string;
    value: number;
    method: string;
    status: string;
    installments: string;
    payday: string;
    responsible: string;
}

interface ModalPaymentProps {
    closeModal: () => void;
}

export function ModalPaymnentAdd({ closeModal }: ModalPaymentProps) {
    const [infosPayment, setInfosPayment] = useState<PaymentsProps>({
        description: '',
        value: 0,
        method: '',
        status: '',
        installments: '',
        payday: '',
        responsible: ''
    })

    async function handleAddPaymnet() {
        try {
            if (Object.values(infosPayment).some(value => value === '' || value === null)) {
                return toast.warning('Preencha todos os campos!')
            }

            await addDoc(collection(db, 'finances-payments'), { ...infosPayment, userId: auth.currentUser?.uid })
            toast.success('Pagamentos adicionados com sucesso!')

            setInfosPayment({
                description: '',
                value: 0,
                method: '',
                status: '',
                installments: '',
                payday: '',
                responsible: ''
            })
            closeModal()

        } catch (error) {
            console.log('Erro ao adicionar pagamento: ' + error)
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
                    <h1>Adicione novo pagamento</h1>
                    <button onClick={closeModal}>X</button>
                </div>

                <div className={styles.form}>
                    <TextField
                        fullWidth
                        label='Descrição'
                        value={infosPayment?.description}
                        onChange={(e) => setInfosPayment(prev => ({ ...prev, description: e.target.value }))}
                    />
                    <TextField
                        fullWidth
                        label='Valor'
                        type='number'
                        InputLabelProps={{ shrink: true }}
                        value={infosPayment?.value}
                        onChange={(e) => setInfosPayment(prev => ({ ...prev, value: Number(e.target.value) }))}
                    />

                    <div className={styles.selects}>

                        <FormControl fullWidth>
                            <InputLabel id='select-method'>Método</InputLabel>
                            <Select
                                labelId='select-method'
                                label='Método'
                                variant='outlined'
                                value={infosPayment?.method}
                                onChange={(e) => setInfosPayment(prev => ({ ...prev, method: e.target.value }))}
                            >
                                <MenuItem value='Cartão (will)'>Cartão (will)</MenuItem>
                                <MenuItem value='Boleto'>Boleto</MenuItem>
                                <MenuItem value='Pix'>Pix</MenuItem>
                                <MenuItem value='Dinheiro'>Dinheiro</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id='select-status'>Status</InputLabel>
                            <Select
                                labelId='select-status'
                                label='Status'
                                variant='outlined'
                                value={infosPayment?.status}
                                onChange={(e) => setInfosPayment(prev => ({ ...prev, status: e.target.value }))}
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
                            value={infosPayment?.installments}
                            onChange={(e) => setInfosPayment(prev => ({ ...prev, installments: e.target.value }))}
                        />
                        <TextField
                            fullWidth
                            label='Vencimento'
                            type='date'
                            InputLabelProps={{ shrink: true }}
                            value={infosPayment?.payday}
                            onChange={(e) => setInfosPayment(prev => ({ ...prev, payday: e.target.value }))}
                        />
                    </div>

                    <TextField
                        fullWidth
                        label='Responsável'
                        value={infosPayment?.responsible}
                        onChange={(e) => setInfosPayment(prev => ({ ...prev, responsible: e.target.value }))}
                    />

                </div>

                <div className={styles.btn}>
                    <Button onClick={handleAddPaymnet} fullWidth variant='contained' color='primary' style={{ backgroundColor: '#0B5ED7' }}>
                        Adicionar
                    </Button>
                </div>

            </motion.div>
        </main>
    )
}