import { Injectable } from "@angular/core";
import { TokenModel } from "../types/token.model";
import { jwtDecode } from "jwt-decode";
import { AppUser } from "../types/account/user.type";
import { UserClaimsModel } from "../types/user-claims.model";
import { TokenItemModel } from "../types/token-item.model";

@Injectable({ providedIn: 'root' })
export class AppUserFactory {

  public createByToken(token: TokenModel) : AppUser | null {
    const { accessToken, refreshToken } = token;
    const claims = this.parseToken(accessToken);

    if(!claims){
      return null;
    }

    return new AppUser(
      Boolean(claims.isStudentCardRegistered),
      token.accessToken,
      token.refreshToken)
  }

  private parseToken(token: TokenItemModel): UserClaimsModel | null {
    try {
      return jwtDecode<UserClaimsModel>(token.value);
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }
}