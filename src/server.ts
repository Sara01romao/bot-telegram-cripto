import 'dotenv/config';
import Fastify from 'fastify';
import {reportPriceCripto } from './cripto_get';
const fastify = Fastify({
  logger: true
})

interface MessageRequest {
  chatId: number | string;
}

// async function getMe() {
//   try {
//     const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getUpdates `);
//     const data = await response.json();

//     console.log(data.result[1].message);

//   } catch (error) {
//     console.log({ error: 'Failed to fetch data' });
//   }

// }
// getMe();


// interface MessageRequest {
//   chatId: number | string;
//   message: string;
//   cripto: string;
// }

fastify.post('/send-message', async function (req, reply) {
  console.log("body", req.body);
  const result_coins = await reportPriceCripto();

  try {
    const { chatId} = req.body as MessageRequest;
    const text = result_coins;

    const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,

      })
    });

    const data = await response.json();
    console.log('Mensagem enviada:', data);
    reply.send(data);

  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch data' });
  }
});

fastify.listen({ port: 3000 }, function (err) {
  if (err) {
    fastify.log.error(err)

  }
})