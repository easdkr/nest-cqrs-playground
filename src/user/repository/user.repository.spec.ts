import { randomUUID } from 'crypto';
import { User } from '../entity';
import { UserRepository } from './user.repository';

describe(UserRepository, () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = new UserRepository();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('유저 생성 성공', async () => {
      // given
      const user = new User(randomUUID(), 'test@test.com', 'password');

      // when
      const created = await repository.create(user);

      // then
      expect(created).toBeInstanceOf(User);
      expect(created.id).toEqual(user.id);
      expect(created.email).toBe(user.email);
      expect(created.password).toBe(user.password);
    });
  });

  describe('findOne', () => {
    it('유저 조회 성공', async () => {
      // given
      const email = 'test@test.com';
      const password = 'password';
      const user = new User(randomUUID(), email, password);

      // when
      repository.create(user);
      const found = await repository.findOne(email);

      // then
      expect(found).toBeInstanceOf(User);
      expect(found.id).toEqual(user.id);
      expect(found.email).toBe(user.email);
      expect(found.password).toBe(user.password);
    });
  });
});
