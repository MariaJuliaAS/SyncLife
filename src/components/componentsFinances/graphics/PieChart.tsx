import { Pie } from 'react-chartjs-2';
import {
    Chart as chartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';
import styles from '../../../styles/accountBalance.module.css'

chartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

interface PaymentsProps {
    value: number;
    method: string;
}

interface PieChartProps {
    payments: PaymentsProps[];
    className: string;
}


export function PieChart({ payments, className }: PieChartProps) {
    if (payments.length === 0) {
        return (
            <div className={styles.noTransactions}>
                <h1 style={{ maxWidth: '80%', textAlign: 'center' }}>Seu gráfico de controle de gastos aparecerá aqui!</h1>
            </div>
        )
    }

    const groupedData = payments.reduce<Record<string, number>>((acc, payment) => {

        const { method, value } = payment;
        acc[method] = (acc[method] || 0) + value;
        return acc;

    }, {})

    const data = {
        labels: Object.keys(groupedData),
        datasets: [
            {
                data: Object.values(groupedData),
                backgroundColor: ['#0B5ED7', '#32CD32', '#ffc107', '#FF0000'],
                borderColor: ['#fff'],
                borderWidth: 1
            }
        ]
    }


    return (
        <Pie data={data} className={className} options={{
            plugins:
            {
                legend:
                {
                    position: 'right',
                    labels: {
                        padding: 10,
                        font: {
                            size: 16
                        }

                    }
                }
            }
        }} />
    )

}