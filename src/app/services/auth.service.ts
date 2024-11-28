import { Injectable, signal } from "@angular/core";
import { TelegramService } from "./telegram.service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, delay, map, Observable, of, pipe, tap } from "rxjs";
import { AppUser } from "../types/account/user.type";
import { ApiService } from "./api/api.service";
import { TokenModel } from "../types/token.model";

@Injectable({ providedIn: 'root'})
export class AuthService {

  private appUser$ = new BehaviorSubject<AppUser | null>(null);

  constructor(
    private readonly telegramService: TelegramService,
    private readonly apiService: ApiService
  ){}

  public auth() : Observable<AppUser> {
    const token = this.telegramService.getInitData();
    const chatId = this.telegramService.getChatId();

    return this.apiService
      .post<TokenModel>('tg-auth', { token, chatId })
      .pipe(
        map(() => )  
      );
    // this.httpClient.post('https://r9390nk5-7080.euw.devtunnels.ms/api/account/authorization', { token : token, chatId: chatId}).subscribe((res) => console.log(res));
  }
}