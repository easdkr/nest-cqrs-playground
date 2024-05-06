import { Injectable } from '@nestjs/common';
import {
  ICommand,
  ofType,
  Saga,
  UnhandledExceptionBus,
  UnhandledExceptionInfo,
} from '@nestjs/cqrs';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { CreateUserEvent } from '../event';
import { CreateRegisterCouponCommand } from '../command';

@Injectable()
export class UserSaga {
  private destroy$ = new Subject<void>();

  constructor(private unhandledExceptionsBus: UnhandledExceptionBus) {
    this.unhandledExceptionsBus
      .pipe(takeUntil(this.destroy$))
      .subscribe((exceptionInfo: UnhandledExceptionInfo) => {
        console.error('Unhandled exception in saga:', exceptionInfo);
        // 재시도나 에러 알림 등 처리
      });
  }

  /** @Saga() 가 있으면 애플리케이션의 이벤트 스트림을 구독하고 `ofType`으로 처리할 이벤트를 선택  */
  @Saga()
  public userCreated(event$: Observable<any>): Observable<ICommand> {
    const fakeCouponId = 'fake-coupon-id';
    return event$.pipe(
      ofType(CreateUserEvent),
      map((event) => new CreateRegisterCouponCommand(fakeCouponId, event.id)),
    );
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
