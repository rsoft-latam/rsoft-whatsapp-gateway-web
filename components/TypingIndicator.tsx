export function TypingIndicator() {
  return (
    <div className="flex justify-start px-3">
      <div className="rounded-lg rounded-bl-none bg-whatsapp-bubble-other px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce-dot [animation-delay:-0.32s]" />
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce-dot [animation-delay:-0.16s]" />
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce-dot" />
        </div>
      </div>
    </div>
  );
}
