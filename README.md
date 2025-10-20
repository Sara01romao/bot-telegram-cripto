
<h2 align="center"> 💻 Bot Telegram Cripto </h2> 
<img width="1381" height="628" alt="image" src="https://github.com/user-attachments/assets/fcfaf016-d1d6-450d-8e9d-5dee14d063eb" />


## 💻  Sobre o Projeto
Objetivo do projeto enviar relatórios automáticos sobre a cotação das criptomoedas diretamente no Telegram, por meio de um servidor Node.js que integra a API de criptos (CoinGecko) com o bot do Telegram.

## Etapas
- Criação do bot e geração do token no Telegram

- Integração com API para consulta das cotações das criptos

- Formatação e geração de mensagens de relatório com preço e horário da atualização

- Envio automático das informações ao Telegram via comando /start e através de agendamento com node-cron

<br>


## :rocket: Tecnologias Usadas

Back-End 
```
Node.js
Fastify
node-cron
node-telegram-bot-api
```

APIS
```
Telegram Bot API
CoinGecko API
```

Configurar variáveis de ambiente .env
```
BOT_TOKEN=seu_token_do_telegram
CHAT_ID=seu_chat_id
```

## Getting Started

First, run the development server:

```bash
pnpm install
pnpm dev
```
