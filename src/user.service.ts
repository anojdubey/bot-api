import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users: Set<string> = new Set();

  public subscribeUser(chatId: string): void {
    this.users.add(chatId);
  }

  public unsubscribeUser(chatId: string): void {
    this.users.delete(chatId);
  }

  public getUsers(): string[] {
    return Array.from(this.users);
  }
}
