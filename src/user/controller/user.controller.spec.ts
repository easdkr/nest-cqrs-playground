import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { mockDeep } from 'jest-mock-extended';
import { UserService } from '../service';
import { User } from '../entity';
import { randomUUID } from 'crypto';

describe(UserController, () => {
  let userController: UserController;
  const mockService = mockDeep<UserService>();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockService,
        },
      ],
    }).compile();

    userController = module.get(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('유저 생성 성공', async () => {
      // given
      const email = 'test@test.com';
      const password = 'password';
      const body = { email, password };
      const id = randomUUID();

      mockService.create.mockResolvedValueOnce(new User(id, email, password));

      // when
      const res = await userController.create(body);

      // then
      expect(res.id).toBe(id);
      expect(res.email).toBe(email);
    });
  });
});
