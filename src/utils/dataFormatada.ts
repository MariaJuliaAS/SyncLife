export const formatarData = (dataSelecionada: string | null) => {
    const temHorario = dataSelecionada?.includes('T');
    const dataAjustada = temHorario ? dataSelecionada?.slice(0, 16) : (dataSelecionada + 'T00:00');
    const dataObj = new Date(String(dataAjustada));
    const dataHoraFormatada = dataObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
    const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
    const horaFormatada = dataObj.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    }
    )

    return { dataHoraFormatada, dataFormatada, temHorario, dataAjustada, horaFormatada }
}