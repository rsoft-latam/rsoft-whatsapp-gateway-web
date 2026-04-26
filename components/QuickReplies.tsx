"use client";

interface Props {
  options: string[];
  onSelect: (option: string) => void;
}

export function QuickReplies({ options, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 px-3">
      {options.map((opt) => {
        const isPrimary = /^(confirm|yes|ok)/i.test(opt);
        const base =
          "rounded-full px-4 py-1.5 text-xs font-medium shadow-sm transition active:scale-95";
        const tone = isPrimary
          ? "bg-whatsapp-teal text-white hover:bg-whatsapp-header"
          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100";
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={`${base} ${tone}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
