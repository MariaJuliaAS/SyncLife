import styles from '../../../styles/transactions.module.css';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useState } from 'react';
import { auth, db } from '../../../services/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { formatarData } from '../../../utils/dataFormatada';

interface TransactionsProps {
    entryDescription: string;
    entryValue: string;
    exitDescription: string;
    exitValue: string
}

export function DebitMoviment() {
    const [inputValue, setInputValue] = useState<TransactionsProps>({
        entryDescription: '',
        entryValue: '',
        exitDescription: '',
        exitValue: ''
    })


    async function handleAddEntry() {
        if (!inputValue.entryValue || !inputValue.entryDescription) {
            return toast.warning('Preencha todos os campos!')
        }

        const date = formatarData(String(new Date())).dataFormatada

        await addDoc(collection(db, 'finances-transactions'), {
            value: Number(inputValue.entryValue),
            description: inputValue.entryDescription,
            type: 'entry',
            date: date,
            userId: auth.currentUser?.uid
        })

        setInputValue({
            entryDescription: '',
            entryValue: '',
            exitDescription: '',
            exitValue: ''
        })
    }

    async function handleAddExit() {
        if (!inputValue.exitValue || !inputValue.exitDescription) {
            return toast.warning('Preencha todos os campos!')
        }

        const date = formatarData(String(new Date())).dataFormatada

        await addDoc(collection(db, 'finances-transactions'), {
            value: Number(-inputValue.exitValue),
            description: inputValue.exitDescription,
            type: 'exit',
            date: date,
            userId: auth.currentUser?.uid
        })

        setInputValue({
            entryDescription: '',
            entryValue: '',
            exitDescription: '',
            exitValue: ''
        })
    }


    return (
        <div className={styles.transactions}>

            <h1 className={styles.title}>Transações</h1>

            <div className={styles.areaTransactions}>
                <div className={styles.exits}>

                    <div className={styles.inputsAreaTransactions}>
                        <span>Adicionar saídas</span>
                        <input
                            type='number'
                            placeholder='R$ -450'
                            className={styles.inputTransactions}
                            value={inputValue.exitValue}
                            onChange={(e) => setInputValue(prev => ({ ...prev, exitValue: e.target.value }))}
                        />
                        <input
                            type='text'
                            placeholder='Descrição'
                            className={styles.inputTransactions}
                            value={inputValue.exitDescription}
                            onChange={(e) => setInputValue(prev => ({ ...prev, exitDescription: e.target.value }))}
                        />
                    </div>

                    <button className={styles.btnTransactions} onClick={handleAddExit}>
                        <FaArrowAltCircleDown size={40} color='#fff' />
                    </button>
                </div>

                <div className={styles.entries}>

                    <div className={styles.inputsAreaTransactions}>
                        <span>Adicionar entrada</span>
                        <input
                            type='number'
                            placeholder='R$ 450'
                            className={styles.inputTransactions}
                            value={inputValue.entryValue}
                            onChange={(e) => setInputValue(prev => ({ ...prev, entryValue: e.target.value }))}
                        />
                        <input
                            type='text'
                            placeholder='Descrição'
                            className={styles.inputTransactions}
                            value={inputValue.entryDescription}
                            onChange={(e) => setInputValue(prev => ({ ...prev, entryDescription: e.target.value }))}
                        />
                    </div>

                    <button className={styles.btnTransactions} onClick={handleAddEntry}>
                        <FaArrowAltCircleUp size={40} color='#fff' />
                    </button>

                </div>

            </div>

        </div>
    )
}