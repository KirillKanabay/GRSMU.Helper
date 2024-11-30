import { Injectable } from '@angular/core';
import { TokenModel } from '../types/token.model';
import { jwtDecode } from 'jwt-decode';
import { AccountModel } from '../types/account/account.model';
import { UserClaimsModel } from '../types/user-claims.model';
import { TokenItemModel } from '../types/token-item.model';

@Injectable({ providedIn: 'root' })
export class AppUserFactory {
  
  public createFromStorage(): AccountModel | null {
    const userData: {
      isStudentCardRegistered: boolean;
      _accessToken: TokenItemModel;
      _refreshToken: TokenItemModel;
    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!userData._accessToken || !userData._refreshToken) {
      return null;
    }

    return new AccountModel(
      userData.isStudentCardRegistered,
      userData._accessToken,
      userData._refreshToken,
    );
  }

  public createByToken({accessToken, refreshToken}: TokenModel): AccountModel | null {
    const claims = this.parseToken(accessToken);

    if (!claims) {
      return null;
    }

    return new AccountModel(
      Boolean(claims.isStudentCardRegistered),
      accessToken,
      refreshToken,
    );
  }

  private parseToken(token: TokenItemModel): UserClaimsModel | null {
    try {
      return jwtDecode<UserClaimsModel>(token.value);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
}
