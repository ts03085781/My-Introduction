export interface OnMessageInterface {
  type: string;
  onlineUsers?: number;
  id?: string;
  sender: string;
  message?: string;
  timestamp: string;
}
