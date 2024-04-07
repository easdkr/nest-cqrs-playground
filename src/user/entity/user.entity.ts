import { AggregateRoot } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { CreateUserEvent } from '../event';

export class User extends AggregateRoot {
  #id: string;
  #email: string;
  #password: string;

  public constructor(id: string, email: string, password: string) {
    super();
    this.autoCommit = true;
    this.#id = id;
    this.#email = email;
    this.#password = password;
  }

  public get id(): string {
    return this.#id;
  }

  public get email(): string {
    return this.#email;
  }

  public get password(): string {
    return this.#password;
  }

  public static new(args: { email: string; password: string }): User {
    return new User(randomUUID(), args.email, args.password);
  }

  public created(id: string) {
    this.apply(new CreateUserEvent(id));
  }
}
