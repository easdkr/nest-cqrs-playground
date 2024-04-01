import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { mockDeep } from 'jest-mock-extended';
import { CommandBus } from '@nestjs/cqrs';
import { EncryptionService } from '../../encryption/encryption.service';

describe(UserService, () => {
  let service: UserService;
  const mockCommandBus = mockDeep<CommandBus>();
  const mockEncryptionService = {
    hash: jest.fn().mockImplementation((password: string) => password),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: CommandBus,
          useValue: mockCommandBus,
        },
        {
          provide: EncryptionService,
          useValue: mockEncryptionService,
        },
      ],
    }).compile();

    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('유저 생성하기', () => {
    beforeAll(async () => {
      // given
      const email = 'test@test.com';
      const password = 'password';

      // when
      await service.create(email, password);
    });

    it('유저 생성 요청이 오면 CommandBus를 통해 CreateUserCommand를 실행한다', async () => {
      // then
      expect(mockCommandBus.execute).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: expect.any(String),
      });
    });

    it('비밀번호는 암호화하여 전달한다', async () => {
      // then
      expect(mockEncryptionService.hash).toHaveBeenCalledWith('password');
    });
  });
});
