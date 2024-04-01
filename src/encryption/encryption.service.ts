import { Inject, Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { Encryption } from './encryption.token';

@Injectable()
export class EncryptionService {
  constructor(
    @Inject(Encryption.Token.ENCRYPTION_ROUND)
    private readonly encryptionRound: number,
  ) {}

  public hash(password: string): string {
    return hashSync(password, this.encryptionRound);
  }

  public compare(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}
