class StringUtil {
    limparTexto(texto: string): string {
        const semAcentos = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const semCedilha = semAcentos.replace(/ç/g, 'c').replace(/Ç/g, 'C');
        const textoLimpo = semCedilha.replace(/[^\w\s]/g, '');
        return textoLimpo.toUpperCase();
    }
}

export = StringUtil
