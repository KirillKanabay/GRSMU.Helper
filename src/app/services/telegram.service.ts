import { Injectable } from "@angular/core";
import { WebApp } from "../types/telegram.type";

@Injectable({'providedIn' : 'root'})
export class TelegramService{
  
  private readonly telegramWebApp: WebApp

  constructor(){
    this.telegramWebApp = window.Telegram.WebApp;
  }

  public getInitData() : string {
    //return this.telegramWebApp.initData;
    return 'query_id=AAFPs08cAAAAAE-zTxzfrI9o&user=%7B%22id%22%3A474985295%2C%22first_name%22%3A%22%D0%9A%D0%B8%D1%80%D0%B8%D0%BB%D0%BB%22%2C%22last_name%22%3A%22%D0%9A%D0%B0%D0%BD%D0%B0%D0%B1%D0%B0%D0%B9%22%2C%22username%22%3A%22Kirill_Kanabay%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FnUGakPuvPBfftA6ZKt_Bs8et2CYhaad5QBUKNrRcV98.svg%22%7D&auth_date=1732532756&signature=IESyYK4G6V7hWWB4UjXZrP8sxnLK_zETJx8YGK4nonC7CTiynsiIHlZ66EP-443N7DLQe3RI8U-hnbDnNEBcAw&hash=d14726ecd6dac0899f04aa54c6db814955f7b81ae71c8d4738e03ed8592fe7d0'
  }

  public getChatId() : string {
    return this.telegramWebApp.initDataUnsafe?.chat?.id?.toString();
  }
}