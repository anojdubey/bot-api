import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { TelegramService } from './telegram.service';
import { UserService } from './user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const telegramService = app.get(TelegramService);
  const userService = app.get(UserService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

  const bot = telegramService.getBot();
  bot.command('subscribe', async (ctx) => {
    const chatId = ctx.message.chat.id.toString();
    await telegramService.sendMessage(chatId, 'You are now subscribed for daily weather updates.');
    userService.subscribeUser(chatId);
  });

  bot.command('unsubscribe', async (ctx) => {
    const chatId = ctx.message.chat.id.toString();
    await telegramService.sendMessage(chatId, 'You have unsubscribed from daily weather updates.');
    userService.unsubscribeUser(chatId);
  });

  bot.launch();
}

bootstrap();
