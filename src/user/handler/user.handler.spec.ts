import { Test } from '@nestjs/testing';
import { UserHandler } from './user.handler';
import { mockDeep } from 'jest-mock-extended';
import { UserRepository } from '../repository/user.repository';
import { CreateUserCommand } from '../command';
import { randomUUID } from 'crypto';
import { User } from '../entity';
import { ConflictException } from '@nestjs/common';
import { CqrsModule, EventPublisher } from '@nestjs/cqrs';

describe(UserHandler, () => {
  let userHandler: UserHandler;
  const mockRepository = mockDeep<UserRepository>();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
        UserHandler,
        EventPublisher,
      ],
    }).compile();

    userHandler = module.get(UserHandler);
  });

  it('should be defined', () => {
    expect(userHandler).toBeDefined();
  });

  describe('execute', () => {
    it('이미 존재하는 이메일이면 CONFLICT EXCEPTION 발생', async () => {
      // given
      const command = new CreateUserCommand('test@test.com', 'password');
      mockRepository.findOne.mockResolvedValueOnce(
        new User(randomUUID(), 'test@test.com', 'password'),
      );

      // when
      const received = () => userHandler.execute(command);

      // then
      await expect(received).rejects.toThrow(ConflictException);
    });

    it('유저 생성 성공', async () => {
      // given
      const command = new CreateUserCommand('test@test.com', 'password');
      mockRepository.findOne.mockResolvedValueOnce(null);
      mockRepository.create.mockResolvedValueOnce(
        new User(randomUUID(), 'test@test.com', 'password'),
      );

      // when
      const user = await userHandler.execute(command);

      // then
      expect(user).toBeInstanceOf(User);
      expect(user.id).toEqual(expect.any(String));
      expect(user.email).toBe('test@test.com');
      expect(user.password).toBe('password');
    });

    it('유저 생성 후 이벤트 발행', async () => {
      // given
      const command = new CreateUserCommand('test@test.com', 'password');
      mockRepository.findOne.mockResolvedValueOnce(null);
      const mockUser = new User(randomUUID(), command.email, command.password);
      mockRepository.create.mockResolvedValueOnce(mockUser);

      // 이벤트 발행 함수 스파이
      const createdSpy = jest.spyOn(mockUser, 'created');

      // when
      await userHandler.execute(command);

      // then
      expect(createdSpy).toHaveBeenCalledTimes(1);
    });
  });
});
