import { Expose } from 'class-transformer';
import { User } from '../../entity';
import { ApiProperty } from '@nestjs/swagger';

/* eslint-disable @typescript-eslint/no-namespace */
export namespace UserResponse {
  export class CreateUserResponse {
    #id: string;
    #email: string;

    private constructor(id: string, email: string) {
      this.#id = id;
      this.#email = email;
    }

    @ApiProperty()
    @Expose()
    public get id(): string {
      return this.#id;
    }

    @ApiProperty()
    @Expose()
    public get email(): string {
      return this.#email;
    }

    public static from(user: User): CreateUserResponse {
      return new CreateUserResponse(user.id, user.email);
    }
  }
}
