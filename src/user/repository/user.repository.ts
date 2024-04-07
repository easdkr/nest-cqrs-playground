import { Injectable } from '@nestjs/common';
import { User } from '../entity';

@Injectable()
export class UserRepository {
  #users = new Map<string, User>();

  public async create(user: User): Promise<User> {
    this.#users.set(user.email, user);

    return this.#users.get(user.email);
  }

  public async findOne(email: string): Promise<User> {
    return this.#users.get(email);
  }

  public async findOneById(id: string): Promise<User> {
    return Array.from(this.#users.values()).find((user) => user.id === id);
  }
}
