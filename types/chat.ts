export interface User {
  id: string;
  name: string;
  avatar: string;
  status?: 'blocked' | 'pending' | 'accepted';
}

export interface ChatRequest {
  id: string;
  from: string;
  to: string;
  status: 'pending' | 'accepted' | 'declined';
  timestamp: Date;
}

export interface Message {
  id: string;
  text?: string;
  timestamp: Date;
  sent: boolean;
  isDateDivider?: boolean;
  video?: CompressedVideo;
  type?: 'request' | 'text' | 'video';
  requestId?: string;
}

export interface CompressedVideo {
  uri: string;
  thumbnail?: string;
  width: number;
  height: number;
}