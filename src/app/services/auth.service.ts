import { Injectable, signal } from "@angular/core";
import { TelegramService } from "./telegram.service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, delay, Observable, of, tap } from "rxjs";
import { AppUser } from "../types/user.type";

@Injectable({ providedIn: 'root'})
export class AuthService {

  private appUser$ = new BehaviorSubject<AppUser | null>(null);

  constructor(
    private readonly telegramService: TelegramService,
    private readonly httpClient: HttpClient
  ){}

  public auth() : Observable<AppUser> {
    const token = this.telegramService.getInitData();
    const chatId = this.telegramService.getChatId();

    return of({ isStudentCardRegistered: false }).
      pipe(
        //delay(50000),
        tap((user) => this.appUser$.next(user))
      )
    // this.httpClient.post('https://r9390nk5-7080.euw.devtunnels.ms/api/account/authorization', { token : token, chatId: chatId}).subscribe((res) => console.log(res));
  }
}