class ArrayUtil {
  dividirEmSublistas (lista, numeroSublistas) {
    const tamanhoSublista = Math.ceil(lista.length / numeroSublistas)
    const sublistas: any = []

    for (let i = 0; i < lista.length; i += tamanhoSublista) {
      sublistas.push(lista.slice(i, i + tamanhoSublista))
    }

    return sublistas
  }
}

export = ArrayUtil
