import { DynamicModule, Global, Module } from '@nestjs/common';
import { Encryption } from './encryption.token';
import { EncryptionService } from './encryption.service';

@Global()
@Module({})
export class EncryptionModule {
  static forRoot(options: { round: number }): DynamicModule {
    return {
      module: EncryptionModule,
      providers: [
        {
          provide: Encryption.Token.ENCRYPTION_ROUND,
          useValue: options.round,
        },
        EncryptionService,
      ],
      exports: [EncryptionService],
    };
  }
}
