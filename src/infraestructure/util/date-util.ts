class DateUtil {
    datePtBrToISOFormat (datePtBr: string): string {
        return datePtBr.slice(6, 10) + '-' + datePtBr.slice(3, 5) + '-' + datePtBr.slice(0, 2);
    }

    removeIsoTimezone(dataString: string): Date {
        try {
            let partes = dataString.split('-');
            const day = Number(partes[0])
            const month = Number(partes[1]) - 1
            const year = Number(partes[2])
            return new Date(day, month, year)
        } catch(e) {
            return new Date(dataString)
        }
    }

    currentDateTime(): string {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
}
  
  export = DateUtil
  