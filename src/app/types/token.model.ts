import { TokenItemModel } from "./token-item.model";

export interface TokenModel {
  accessToken: TokenItemModel,
  refreshToken: TokenItemModel
}