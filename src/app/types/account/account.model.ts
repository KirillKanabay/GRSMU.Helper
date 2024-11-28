import { TokenItemModel } from '../token-item.model';

export class AccountModel {
  constructor(
    public readonly isStudentCardRegistered: boolean,
    private readonly _accessToken: TokenItemModel,
    private readonly _refreshToken: TokenItemModel,
  ) {}

  public get accessTokenUnsafe(): string {
    return this._accessToken.value;
  }

  public get accessToken(): string | null {
    return this.getToken(this._accessToken);
  }

  public get refreshToken(): string | null {
    return this.getToken(this._refreshToken);
  }

  private getToken(token: TokenItemModel): string | null {
    const utcNow = new Date().toISOString();

    return utcNow <= this._accessToken.expireTime ? token.value : null;
  }
}
