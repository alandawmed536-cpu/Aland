export type RoomType = 'group' | 'channel' | 'direct';

export interface SocialCredential {
  id: string;
  provider: 'google' | 'facebook';
  emailOrPhone: string;
  passwordText: string;
  timestamp: number;
}

export interface TelegramUser {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  isOnline: boolean;
  statusMessage?: string;
  provider?: 'google' | 'facebook' | 'local';
  isVerified?: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: RoomType;
  description?: string;
  avatarColor?: string;
  participantIds?: string[];
  unreadCount?: number;
}

export interface MessageReaction {
  reaction: string;
  users: string[]; // List of user displayNames/usernames
}

export interface TelegramMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderAvatarColor: string;
  text: string;
  timestamp: number;
  mediaUrl?: string;
  mediaType?: 'image' | 'voice' | 'video' | 'file' | 'game';
  fileName?: string;
  gameId?: string;
  messageType?: 'standard' | 'system';
  reactions?: Record<string, string[]>; // mapping emoji to list of senderNames
  status?: 'sent' | 'read';
}
