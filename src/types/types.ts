export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
  read: boolean;
}

export interface User {
  id: string;
  userName: string;
  about: string;
  profilePicture: string | null;
  messages: Message[];
  unreadMessagesCount?: number;
  typing: boolean;
}
