import { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto my-8 w-[380px] max-w-full rounded-[48px] bg-black p-3 shadow-2xl ring-1 ring-white/10">
      <div className="relative overflow-hidden rounded-[36px] bg-white">
        <div className="absolute left-1/2 top-2 z-20 flex h-6 w-28 -translate-x-1/2 items-center justify-center rounded-full bg-black">
          <span className="sr-only">notch</span>
        </div>
        <div className="flex h-[720px] flex-col">{children}</div>
      </div>
    </div>
  );
}
