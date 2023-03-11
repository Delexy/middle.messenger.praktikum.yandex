import Store from "../Modules/Store/Store";

class ChatController {
  private token: string;
  private chatId: number;
  private socket: WebSocket | null;
  private messageAmount: number;

  constructor(token: string, chatId: number) {
    this.token = token;
    this.chatId = chatId;
    this.messageAmount = 0;
  }

  connect(): Promise<WebSocket> | null {
    const user = Store.getState().user as Record<string, unknown>;
    if (user && "id" in user) {
      return new Promise((resolve) => {
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${this.chatId}/${this.token}`);
        socket.addEventListener("open", () => {
          console.log("Соединение установлено");
          this.getOld();
        });
        this.socket = socket;
        this.addEvents();
        this.supportConnecting();
        resolve(socket);
      });
    }
    return null;
  }

  addEvents() {
    if (this.socket) {
      this.socket.addEventListener("close", this.onClose.bind(this));
      this.socket.addEventListener("message", this.onMessage.bind(this));
      this.socket.addEventListener("error", this.onError.bind(this));
    }
  }

  supportConnecting() {
    setInterval(() => {
      this.socket?.send(JSON.stringify({
        type: 'ping'
      }))
    }, 10000);
  }

  onClose(event: CloseEvent) {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  }

  onMessage(event: MessageEvent) {
    const data = JSON.parse(event.data);
    switch(data?.type) {
      case 'message':
        this.processNewMessage(data);
      break;
      case 'pong':
      break;
      default:
        this.processOldMessages(data);
    }
  }

  onError(event: ErrorEvent) {
    console.log("Ошибка", event.message);
  }

  getSocket() {
    return this.socket;
  }

  sendMessage(message: string) {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          content: message,
          type: "message",
        })
      );
    }
  }

  getOld() {
    if(this.socket) {
      this.socket.send(JSON.stringify({
        content: `${this.messageAmount}`,
        type: 'get old',
      }));
    }
  }

  processOldMessages(messages: any[]) {
    if(messages?.length) {
      const oldMessages = ((Store.getState()?.activeChat as Record<string, unknown>)?.messages as any[]) || [];
      const allMessages = [...oldMessages, ...messages.reverse()];
      Store.set('activeChat.messages', allMessages);
      this.messageAmount += messages.length;
    }
  }

  processNewMessage(message: Record<string, unknown>) {
    const oldMessages = ((Store.getState()?.activeChat as Record<string, unknown>)?.messages as any[]) || [];
    const allMessages = [...oldMessages, message];
    Store.set('activeChat.messages', allMessages);
    this.messageAmount++;;
  }
}

export default ChatController;
