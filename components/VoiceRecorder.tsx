"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  onCapture: (blob: Blob, durationSec: number, mimeType: string) => void;
  disabled: boolean;
}

export function VoiceRecorder({ onCapture, disabled }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const startRef = useRef<number>(0);

  const start = async () => {
    if (disabled) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const durSec = Math.max(1, Math.round((Date.now() - startRef.current) / 1000));
        stream.getTracks().forEach((t) => t.stop());
        if (blob.size > 0) onCapture(blob, durSec, "audio/webm");
      };
      mr.start();
      mediaRecorderRef.current = mr;
      startRef.current = Date.now();
      setIsRecording(true);
    } catch (e) {
      console.error("mic permission denied", e);
      alert("No se pudo acceder al micrófono. Permisos denegados.");
    }
  };

  const stop = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  return (
    <button
      type="button"
      onMouseDown={start}
      onMouseUp={stop}
      onMouseLeave={stop}
      onTouchStart={start}
      onTouchEnd={stop}
      disabled={disabled}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition ${
        isRecording
          ? "bg-red-500 scale-110"
          : "bg-whatsapp-teal hover:bg-whatsapp-header"
      } disabled:opacity-40`}
      aria-label="Mantener para grabar audio"
      title="Mantener presionado para grabar"
    >
      {isRecording ? "●" : "🎙"}
    </button>
  );
}
