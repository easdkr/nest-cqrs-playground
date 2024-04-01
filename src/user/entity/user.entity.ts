import { randomUUID } from 'crypto';

export class User {
  #id: string;
  #email: string;
  #password: string;

  public constructor(id: string, email: string, password: string) {
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
}
