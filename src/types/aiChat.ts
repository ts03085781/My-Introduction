export interface Message {
  role: string;
  content: string;
}

export interface MessageContent {
  text: string;
  typingSpeed?: number;
}
