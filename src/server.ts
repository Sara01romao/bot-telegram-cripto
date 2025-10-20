import 'dotenv/config';
import Fastify from 'fastify';
import cron from 'node-cron';
import { reportPriceCripto } from './cripto_get';
const fastify = Fastify({
  logger: true
})

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;
const chatId = process.env.CHATID;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, () => {

  async function report() {
    const result_coins = await reportPriceCripto();

    bot.sendMessage(chatId, result_coins);
  }

  report();

});

cron.schedule('20 17 * * *', () => {
  async function report() {
    const result_coins = await reportPriceCripto();
    bot.sendMessage(chatId, result_coins);
  }

  report();
});

fastify.listen({ port: 3000 }, function (err) {
  if (err) {
    fastify.log.error(err)

  }
})