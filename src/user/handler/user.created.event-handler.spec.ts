import { Logger } from '@nestjs/common';
import { EmailService } from '../../email/email.service';
import { UserRepository } from '../repository';
import { UserCreatedEventHandler } from './user.created.event-handler';
import { Test } from '@nestjs/testing';
import { EventBus } from '@nestjs/cqrs';

describe('UserCreatedEventHandler', () => {
  let handler: UserCreatedEventHandler;
  const mockUserRepository = {
    findOneById: jest.fn(),
  };
  const mockEmailService = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserCreatedEventHandler,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
        Logger,
        {
          provide: EventBus,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get(UserCreatedEventHandler);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('handle', () => {
    it('유저가 존재하지 않으면 INTERNAL SERVER ERROR EXCEPTION 발생', async () => {
      // given
      mockUserRepository.findOneById.mockResolvedValueOnce(null);

      // when
      const received = () => handler.handle({ id: 'test-id' });

      // then
      await expect(received).rejects.toThrow('User not found');
    });

    it('이메일 전송 성공', async () => {
      // given
      mockUserRepository.findOneById.mockResolvedValueOnce({
        email: 'test@test.com',
      });
      mockEmailService.send.mockResolvedValueOnce({ success: true });

      // when
      await handler.handle({ id: 'test-id' });

      // then
      expect(mockEmailService.send).toHaveBeenCalledTimes(1);
      expect(mockEmailService.send).toHaveBeenCalledWith(
        'test@test.com',
        'Welcome to our platform!',
      );
    });
  });
});
