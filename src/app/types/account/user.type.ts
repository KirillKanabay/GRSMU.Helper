import { TokenItemModel } from "../token-item.model";

export class AppUser {
  constructor(
    public readonly isStudentCardRegistered: boolean,
    private readonly _accessToken: TokenItemModel,
    private readonly _refreshToken: TokenItemModel
  ) {}

  public get accessToken(): string{
    //get utc now
    
    

  }
} 