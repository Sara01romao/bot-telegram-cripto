
const criptos: string[] = ["ethereum", "bitcoin", "solana"];

export type CryptoCurrency = {
  [key: string]: {
    brl: number;
    usd: number;
    last_updated_at: number;
  };
};

export async function getCripto() {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${criptos}&vs_currencies=brl,usd&include_last_updated_at=true`);

    if (!response.ok) throw new Error(`Erro na API`);

    const data = await response.json() as CryptoCurrency;
    console.log(data)
    return { data: data, ok: "true", error: "" }

  } catch (error) {
    return { data: null, ok: false, error: 'Failed to fetch data' }
  }
}

export async function reportPriceCripto() {
  const result = await getCripto();

  if (result.ok && result.data) {
    let msg = "";

    for (const key in result.data) {
      const element = result.data[key];

      msg += `${key.toUpperCase()}:\nR$ ${new Intl.NumberFormat("pt-BR").format(element.brl)} / $ ${new Intl.NumberFormat("en-US").format(element.usd)}\n Atualizado: ${new Date(element.last_updated_at * 1000).toLocaleString('pt-BR')}h\n\n`;
    }

    console.log("depois", msg)
    return `RELATÓRIO\n\n ${msg}`;
  }

  return null;
}