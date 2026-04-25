const SESSION_KEY = "quipu.session.phone";
const BOLIVIA_PREFIX = "+591700";

export function getOrCreatePhone(): string {
  if (typeof window === "undefined") return "+591700000000";

  const existing = localStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const suffix = Math.floor(100000 + Math.random() * 900000).toString();
  const phone = `${BOLIVIA_PREFIX}${suffix}`;
  localStorage.setItem(SESSION_KEY, phone);
  return phone;
}

export function resetPhone(): string {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
  return getOrCreatePhone();
}
