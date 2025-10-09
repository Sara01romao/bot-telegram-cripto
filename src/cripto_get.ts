
const criptos: string[] = ["USD-BRL", "BTC-BRL", "BTC-USD", "ETH-BRL", "ETH-USD", "SOL-BRL", "SOL-USD"];

export async function getCripto() {
   try {
      const response = await fetch(`https://economia.awesomeapi.com.br/last/${criptos}`);
      const data = await response.json();

      console.log(data);

   } catch (error) {
      console.log({ error: 'Failed to fetch data' });
   }
}