export function FormatDate(dateSelected: string) {
    const haveHour = dateSelected?.includes('T');
    const ajustedDate = haveHour ? dateSelected?.slice(0, 16) : (dateSelected + 'T00:00')
    const dateObj = new Date(ajustedDate);
    const dateHourFormatted = dateObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
    const dateFormatted = dateObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
    const hourFormatted = dateObj.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    })

    return { dateHourFormatted, dateFormatted, hourFormatted, haveHour, ajustedDate }
} 