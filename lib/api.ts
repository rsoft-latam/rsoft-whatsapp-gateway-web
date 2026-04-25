import type { ChatResponse } from "./types";

const BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:8000";

export async function sendText(phone: string, body: string): Promise<ChatResponse> {
  const res = await fetch(`${BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, body }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`chat failed: ${res.status} ${text}`);
  }
  return res.json();
}

export async function sendMedia(
  phone: string,
  file: Blob,
  filename: string,
  mimeType: string,
  caption = "",
): Promise<ChatResponse> {
  const form = new FormData();
  form.append("phone", phone);
  form.append("caption", caption);
  form.append("file", new File([file], filename, { type: mimeType }));

  const res = await fetch(`${BASE}/api/chat/media`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`chat/media failed: ${res.status} ${text}`);
  }
  return res.json();
}

export const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? `${BASE}/dashboard`;
