
const criptos: string[] = ["USD-BRL", "BTC-BRL", "BTC-USD", "ETH-BRL", "ETH-USD", "SOL-BRL", "SOL-USD"];

export interface CryptoCurrency {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

export async function getCripto() {
   try {
      const response = await fetch(`https://economia.awesomeapi.com.br/last/${criptos}`);
         
      if(!response.ok) throw new Error(`Erro na API`);
   
      const data = await response.json() as CryptoCurrency;
      return {data:data, ok:"true", error:""}
   
   } catch (error) {
      return {data:null, ok:false, error: 'Failed to fetch data'}
   }
}


export async function reportPriceCripto() {
  const result = await getCripto();

  if (result.ok && result.data) {
    console.log(result.data)

    const coins: CryptoCurrency[] = Object.values(result.data);
    const msg = coins.map(item =>
      `${item.code} / ${item.codein}\nPreço: ${item.codein === "BRL" ? "R$" : item.codein === "USD" ? "$" : ""} ${item.bid}`

    ).join("\n\n")

    const data = new Date(Number(coins[0].timestamp) * 1000);
    const dataBR = data.toLocaleDateString('pt-BR');
    const hourBR = data.toLocaleTimeString('pt-BR');

    console.log(msg + "\n\n" + dataBR, hourBR)
    return `Relatório\n\n ${msg}\n\n - Data: ${dataBR}, ${hourBR} `;
  }

  return null;
}