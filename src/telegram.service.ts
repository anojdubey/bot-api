import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  private readonly bot: Telegraf;

  constructor(private readonly configService: ConfigService) {
    const token = '6103414626:AAG85A71y22Hb6nzdapZMm1LZKnQub7Eqd4';
    this.bot = new Telegraf(token);
    this.bot.start((ctx) => ctx.reply('Welcome!'));
  }

  public async sendMessage(chatId: string, message: string): Promise<any> {
    return this.bot.telegram.sendMessage(chatId, message);
  }

  public getBot(): Telegraf {
    return this.bot;
  }
}
