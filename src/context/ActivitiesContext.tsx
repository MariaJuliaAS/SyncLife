import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { createContext, FormEvent, ReactNode, useEffect, useState } from "react"
import { auth, db } from "../services/firebaseConnection";
import toast from "react-hot-toast";
import { ActitivitiesProps } from "../components/activities/modal/modalAddActivity";

interface ActivitiesContextData {
    activitiesList?: GetActivitiesProps[];
    filterActivities: {
        toDo: GetActivitiesProps[];
        inProgress: GetActivitiesProps[];
        completed: GetActivitiesProps[];
    }
    handleAddActivity: (e: FormEvent, activities: ActitivitiesProps) => Promise<void>;
    handleMoveActivity: (docId: string, status: string) => Promise<void>;
    handleDeleteActivity: (docId: string) => Promise<void>;
}

export interface GetActivitiesProps {
    subject: string;
    details: string;
    dateTime: string;
    status: 'A Fazer' | 'Em Andamento' | 'Concluído';
    docId: string;
}

interface ActivitiesProviderProps {
    children: ReactNode
}

export const ActivitiesContext = createContext({} as ActivitiesContextData)

function ActivitiesProvider({ children }: ActivitiesProviderProps) {
    const [activitiesList, setActivitiesList] = useState<GetActivitiesProps[]>([])

    useEffect(() => {
        const q = query(
            collection(db, 'activities'),
            where('userId', '==', auth.currentUser?.uid)
        )

        const unsub = onSnapshot(q, (snapshot) => {
            let list: GetActivitiesProps[] = []

            snapshot.forEach((doc) => {
                const item = doc.data()

                list.push({
                    subject: item.subject,
                    details: item.details,
                    dateTime: item.dateTime,
                    status: item.status,
                    docId: doc.id
                })
            })
            setActivitiesList(list)
        })

        return () => {
            unsub()
        }
    }, [])

    const filterActivities = {
        toDo: activitiesList.filter((item) => item.status === 'A Fazer'),
        inProgress: activitiesList.filter((item) => item.status === 'Em Andamento'),
        completed: activitiesList.filter((item) => item.status === 'Concluído')
    }

    async function handleAddActivity(e: FormEvent, activities: ActitivitiesProps) {
        e.preventDefault()

        await addDoc(collection(db, "activities"),
            {
                ...activities,
                userId: auth.currentUser?.uid
            })
            .then(() => {
                toast.success("Atividade adicionada com sucesso!")
            })
            .catch((error) => {
                console.log("Erro ao adicionar atividade: " + error)

            })
    }

    async function handleMoveActivity(docId: string, status: string) {
        await updateDoc(doc(db, 'activities', docId), {
            status: status
        })
            .then(() => {
                toast.success('Atividade movida com sucesso!')
            })
            .catch((error) => {
                console.log('Error ao mover atividade: ', error)
            })
    }

    async function handleDeleteActivity(docId: string) {
        await deleteDoc(doc(db, 'activities', docId))
            .then(() => {
                toast.success('Atividade excluída com sucesso!')
            })
            .catch((error) => {
                console.log('Error ao excluir atividade: ' + error)
            })
    }

    return (
        <ActivitiesContext.Provider value={{ filterActivities, handleAddActivity, handleMoveActivity, handleDeleteActivity }}>
            {children}
        </ActivitiesContext.Provider>
    )
}

export default ActivitiesProvider;