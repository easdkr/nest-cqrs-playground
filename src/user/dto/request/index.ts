import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UserRequest {
  export class CreateUserBody {
    @ApiProperty()
    @IsEmail()
    public readonly email: string;

    @ApiProperty()
    @IsStrongPassword()
    public readonly password: string;
  }
}
