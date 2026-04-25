export type Direction = "in" | "out";

export interface Message {
  id: string;
  direction: Direction;
  body: string;
  timestamp: string;
  kind?: "text" | "voice" | "image";
  durationSec?: number;
  transcribedText?: string;
}

export interface ChatResponse {
  reply: string;
  tx_count: number;
  wallet_address: string | null;
  transcribed_text: string | null;
}
