export class CreateRegisterCouponCommand {
  public constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
