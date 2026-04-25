import type { Message } from "@/lib/types";

export function MessageBubble({ msg }: { msg: Message }) {
  const isOwn = msg.direction === "out";
  const align = isOwn ? "justify-end" : "justify-start";
  const bubble = isOwn
    ? "bg-whatsapp-bubble-own"
    : "bg-whatsapp-bubble-other";
  const tail = isOwn ? "rounded-br-none" : "rounded-bl-none";

  return (
    <div className={`flex ${align} px-3`}>
      <div
        className={`max-w-[80%] rounded-lg ${bubble} ${tail} px-3 py-2 shadow-sm`}
      >
        <MessageBody msg={msg} />
        <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-500">
          <span>{msg.timestamp}</span>
          {isOwn && <span className="text-whatsapp-check">✓✓</span>}
        </div>
      </div>
    </div>
  );
}

function MessageBody({ msg }: { msg: Message }) {
  if (msg.kind === "voice") {
    return (
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <span className="text-lg">🎙️</span>
          <span className="flex-1 h-1 rounded bg-slate-300">
            <span className="block h-1 w-1/3 rounded bg-whatsapp-teal" />
          </span>
          <span className="text-xs">{msg.durationSec ?? "?"}s</span>
        </div>
        {msg.transcribedText && (
          <div className="mt-1 border-t border-slate-200 pt-1 text-xs italic text-slate-600">
            &ldquo;{msg.transcribedText}&rdquo;
          </div>
        )}
      </div>
    );
  }
  if (msg.kind === "image") {
    return (
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <span className="text-lg">📷</span>
          <span>Imagen enviada</span>
        </div>
        {msg.transcribedText && (
          <div className="mt-1 border-t border-slate-200 pt-1 text-xs italic text-slate-600">
            {msg.transcribedText}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="whitespace-pre-wrap break-words text-sm text-slate-800">
      {msg.body}
    </div>
  );
}
