"use client";

import { DASHBOARD_URL } from "@/lib/api";

interface Props {
  isTyping: boolean;
  txCount: number;
  phone: string;
  onReset: () => void;
}

export function WhatsAppHeader({ isTyping, txCount, phone, onReset }: Props) {
  return (
    <div className="flex-shrink-0 bg-whatsapp-header px-4 pb-3 pt-10 text-white">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-whatsapp-accent text-lg font-bold">
          M
        </div>
        <div className="flex-1">
          <div className="font-semibold leading-tight">RSoft MIA</div>
          <div className="text-xs text-white/70 leading-tight">
            {isTyping ? "typing..." : "AI Banking Agent · online"}
          </div>
        </div>
        <a
          href={DASHBOARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wide hover:bg-white/20"
        >
          dashboard
        </a>
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-white/60">
        <span>Session: {phone}</span>
        <div className="flex items-center gap-3">
          <span>tx on-chain: {txCount}</span>
          <button
            onClick={onReset}
            className="rounded bg-white/10 px-2 py-0.5 text-[10px] hover:bg-white/20"
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
}
