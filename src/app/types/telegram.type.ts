export interface Telegram {
  WebApp: WebApp;
}

export interface WebApp {
  initData: string;
  initDataUnsafe: WebAppInitData;
}

interface WebAppInitData {
  chat: WebAppChat;
}

interface WebAppChat {
  id: number;
  type: "group" | "supergroup" | "chat";
}

declare global {
  interface Window {
    Telegram: Telegram;
  }
}
