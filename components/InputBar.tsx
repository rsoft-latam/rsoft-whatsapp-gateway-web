"use client";

import { useRef, useState } from "react";
import { VoiceRecorder } from "./VoiceRecorder";

interface Props {
  onSendText: (text: string) => void;
  onSendVoice: (blob: Blob, durationSec: number, mimeType: string) => void;
  onSendImage: (file: File) => void;
  disabled: boolean;
}

export function InputBar({
  onSendText,
  onSendVoice,
  onSendImage,
  disabled,
}: Props) {
  const [text, setText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const send = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSendText(trimmed);
    setText("");
  };

  return (
    <div className="flex-shrink-0 border-t border-slate-200 bg-slate-50 px-2 py-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 disabled:opacity-40"
          aria-label="Attach image"
          title="Attach photo"
        >
          📎
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onSendImage(f);
            e.target.value = "";
          }}
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder={disabled ? "waiting..." : "Type a message"}
          disabled={disabled}
          className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 outline-none focus:border-whatsapp-teal disabled:opacity-60"
        />
        {text.trim().length > 0 ? (
          <button
            type="button"
            onClick={send}
            disabled={disabled}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp-teal text-white hover:bg-whatsapp-header disabled:opacity-40"
            aria-label="Enviar"
            title="Enviar"
          >
            ➤
          </button>
        ) : (
          <VoiceRecorder onCapture={onSendVoice} disabled={disabled} />
        )}
      </div>
    </div>
  );
}
