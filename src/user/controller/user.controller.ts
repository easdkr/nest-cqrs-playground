import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service';
import { UserRequest } from '../dto/request';
import { UserResponse } from '../dto/response';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: UserResponse.CreateUserResponse })
  @Post()
  public async create(
    @Body() body: UserRequest.CreateUserBody,
  ): Promise<UserResponse.CreateUserResponse> {
    const user = await this.userService.create(body.email, body.password);

    return UserResponse.CreateUserResponse.from(user);
  }
}
