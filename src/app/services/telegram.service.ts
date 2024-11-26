import { Injectable } from "@angular/core";
import { WebApp } from "../types/telegram.type";

@Injectable({'providedIn' : 'root'})
export class TelegramService{
  
  private readonly telegramWebApp: WebApp

  constructor(){
    this.telegramWebApp = window.Telegram.WebApp;
  }

  public getInitData() : string {
    return this.telegramWebApp.initData;
  }

  public getChatId() : string {
    return this.telegramWebApp.initDataUnsafe?.chat?.id?.toString();
  }
}