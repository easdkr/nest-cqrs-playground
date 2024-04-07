import { User } from './user.entity';

describe(User, () => {
  describe('새 유저 생성', () => {
    it('유저 생성 성공', () => {
      // given
      const email = 'test@test.com';
      const password = 'password';

      // when
      const user = User.new({ email, password });

      // then
      expect(user).toBeInstanceOf(User);
      expect(user.id).toEqual(expect.any(String));
      expect(user.email).toBe(email);
      expect(user.password).toBe(password);
    });
  });

  describe('유저 생성 후 이벤트 발행', () => {
    it('유저 생성 후 이벤트 발행', () => {
      // given
      const email = 'test@test.com';
      const password = 'password';

      // when
      const user = User.new({ email, password });
      const applySpy = jest.spyOn(user, 'apply');
      user.created(user.id);

      // then
      expect(applySpy).toHaveBeenCalledTimes(1);
      expect(applySpy).toHaveBeenCalledWith({ id: user.id });
    });
  });
});
