"use client";

import { useCallback, useEffect, useState } from "react";
import { InputBar } from "@/components/InputBar";
import { MessageList } from "@/components/MessageList";
import { PhoneFrame } from "@/components/PhoneFrame";
import { WhatsAppHeader } from "@/components/WhatsAppHeader";
import { sendMedia, sendText } from "@/lib/api";
import { getOrCreatePhone, resetPhone } from "@/lib/session";
import type { Message } from "@/lib/types";

function timestamp(): string {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export default function Home() {
  const [phone, setPhone] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [txCount, setTxCount] = useState(0);

  useEffect(() => {
    setPhone(getOrCreatePhone());
  }, []);

  const pushMessage = useCallback((m: Message) => {
    setMessages((prev) => [...prev, m]);
  }, []);

  const handleError = useCallback(
    (err: unknown) => {
      console.error(err);
      pushMessage({
        id: uid(),
        direction: "in",
        body: "Ups, no pude procesar eso. Probá de nuevo en unos segundos.",
        timestamp: timestamp(),
      });
    },
    [pushMessage],
  );

  const onSendText = useCallback(
    async (text: string) => {
      if (!phone) return;
      pushMessage({
        id: uid(),
        direction: "out",
        body: text,
        timestamp: timestamp(),
      });
      setIsTyping(true);
      try {
        const res = await sendText(phone, text);
        pushMessage({
          id: uid(),
          direction: "in",
          body: res.reply,
          timestamp: timestamp(),
        });
        setTxCount(res.tx_count);
      } catch (e) {
        handleError(e);
      } finally {
        setIsTyping(false);
      }
    },
    [phone, pushMessage, handleError],
  );

  const onSendVoice = useCallback(
    async (blob: Blob, durationSec: number, mimeType: string) => {
      if (!phone) return;
      const localId = uid();
      pushMessage({
        id: localId,
        direction: "out",
        body: "",
        timestamp: timestamp(),
        kind: "voice",
        durationSec,
      });
      setIsTyping(true);
      try {
        const res = await sendMedia(phone, blob, "voice.webm", mimeType);
        if (res.transcribed_text) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === localId ? { ...m, transcribedText: res.transcribed_text ?? undefined } : m,
            ),
          );
        }
        pushMessage({
          id: uid(),
          direction: "in",
          body: res.reply,
          timestamp: timestamp(),
        });
        setTxCount(res.tx_count);
      } catch (e) {
        handleError(e);
      } finally {
        setIsTyping(false);
      }
    },
    [phone, pushMessage, handleError],
  );

  const onSendImage = useCallback(
    async (file: File) => {
      if (!phone) return;
      const localId = uid();
      pushMessage({
        id: localId,
        direction: "out",
        body: "",
        timestamp: timestamp(),
        kind: "image",
      });
      setIsTyping(true);
      try {
        const res = await sendMedia(phone, file, file.name, file.type);
        if (res.transcribed_text) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === localId ? { ...m, transcribedText: res.transcribed_text ?? undefined } : m,
            ),
          );
        }
        pushMessage({
          id: uid(),
          direction: "in",
          body: res.reply,
          timestamp: timestamp(),
        });
        setTxCount(res.tx_count);
      } catch (e) {
        handleError(e);
      } finally {
        setIsTyping(false);
      }
    },
    [phone, pushMessage, handleError],
  );

  const onReset = useCallback(() => {
    const fresh = resetPhone();
    setPhone(fresh);
    setMessages([]);
    setTxCount(0);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <header className="w-full px-6 py-4 text-center">
        <h1 className="text-xl font-semibold tracking-tight">
          Quipu — Agentic Banking on WhatsApp
        </h1>
        <p className="mt-1 text-xs text-white/60">
          Demo en vivo · Arc L1 · Circle USDC · Settlement sub-segundo
        </p>
      </header>

      <PhoneFrame>
        <WhatsAppHeader
          isTyping={isTyping}
          txCount={txCount}
          phone={phone}
          onReset={onReset}
        />
        <MessageList messages={messages} isTyping={isTyping} />
        <InputBar
          onSendText={onSendText}
          onSendVoice={onSendVoice}
          onSendImage={onSendImage}
          disabled={!phone || isTyping}
        />
      </PhoneFrame>

      <footer className="max-w-md px-6 pb-8 text-center text-[11px] text-white/50">
        Sessions are ephemeral — each browser gets a random phone number.
        Every message you send hits the real Quipu agent on Arc testnet.
        Hit <b>reset</b> in the header to start over.
      </footer>
    </main>
  );
}
