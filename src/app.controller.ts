import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { UserService } from './user.service';

@Controller()
export class AppController {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly userService: UserService,
  ) {}

  @Post('/subscribe')
  public async subscribe(@Body('chatId') chatId: string): Promise<any> {
    this.userService.subscribeUser(chatId);
    return HttpStatus.OK;
  }

  @Post('/unsubscribe')
  public async unsubscribe(@Body('chatId') chatId: string): Promise<any> {
    this.userService.unsubscribeUser(chatId);
    return HttpStatus.OK;
  }

  @Get('/users')
  public getUsers(): string[] {
    return this.userService.getUsers();
  }
}
