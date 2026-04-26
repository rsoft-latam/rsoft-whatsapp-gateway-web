"use client";

import { useEffect, useRef } from "react";
import type { Message } from "@/lib/types";
import { MessageBubble } from "./MessageBubble";
import { QuickReplies } from "./QuickReplies";
import { TypingIndicator } from "./TypingIndicator";

interface Props {
  messages: Message[];
  isTyping: boolean;
  onQuickReply?: (text: string) => void;
}

const CONFIRM_RE = /\b(confirm|confirmar)\b/i;
const CANCEL_RE = /\b(cancel|cancelar)\b/i;

function detectQuickReplies(body: string): string[] | null {
  if (CONFIRM_RE.test(body) && CANCEL_RE.test(body)) {
    return ["CONFIRM", "CANCEL"];
  }
  return null;
}

export function MessageList({ messages, isTyping, onQuickReply }: Props) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  // Show Quick Reply buttons only after the LATEST inbound message,
  // and only if it contains a confirm/cancel prompt.
  const lastIn = [...messages].reverse().find((m) => m.direction === "in");
  const lastMsg = messages[messages.length - 1];
  const showQuickReplies =
    !isTyping &&
    lastIn !== undefined &&
    lastIn === lastMsg &&
    onQuickReply !== undefined;
  const quickReplies = showQuickReplies && lastIn ? detectQuickReplies(lastIn.body) : null;

  return (
    <div className="whatsapp-bg flex-1 overflow-y-auto scrollbar-none py-3 space-y-2">
      {messages.map((m) => (
        <MessageBubble key={m.id} msg={m} />
      ))}
      {quickReplies && onQuickReply && (
        <QuickReplies options={quickReplies} onSelect={onQuickReply} />
      )}
      {isTyping && <TypingIndicator />}
      <div ref={endRef} />
    </div>
  );
}
