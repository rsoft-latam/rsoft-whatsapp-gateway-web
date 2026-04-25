# rsoft-whatsapp-gateway-web

Web emulator for the Quipu agentic bank. Shows a phone with a WhatsApp-style chat UI
calling the real `rsoft-whatsapp-gateway` backend. Every message you send generates
real on-chain transactions on Arc (or deterministic mocks if the backend is in mock mode).

Built for the **Agentic Economy on Arc** hackathon demo. Deployed on Vercel.

## Why web instead of real WhatsApp?

Twilio Sandbox requires every visitor to opt in from their phone (72h expiry, US number).
For a hackathon judge who spends 90 seconds on a demo, that's too much friction. The
web emulator gives a single clickable URL that works on desktop and mobile, no signup.

The backend logic is identical — same Quipu agent, same x402 tool calls, same Arc
settlement. Only the transport layer changes (HTTP REST instead of Twilio webhook).

## Features

- iPhone-shaped frame with a WhatsApp chat inside
- Text messages
- Voice notes via browser `MediaRecorder` (hold mic button, release to send)
- Image upload (receipts trigger Gemini vision parsing on the backend)
- Typing indicator while Quipu thinks
- Live counter: "X on-chain tx in this session"
- Button to open the live `/dashboard` in a side tab
- Session phone persisted in localStorage (reset button available)

## Setup

```bash
npm install
cp .env.local.example .env.local
# fill NEXT_PUBLIC_API_URL with your gateway URL (local or Railway)

npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

```bash
npx vercel
# or push to GitHub and connect the repo in the Vercel dashboard

# set env var in Vercel project settings:
#   NEXT_PUBLIC_API_URL = https://<your-railway-app>.up.railway.app
```

## Architecture

```
Browser
   │
   │ POST /api/chat          { phone, body }
   │ POST /api/chat/media    multipart (audio or image)
   ▼
rsoft-whatsapp-gateway (Railway)
   │
   └──> Quipu agent → Bank MCP → Arc L1
```

No proxying through Next.js API routes — direct fetch from the browser to the
gateway. Backend has `CORSMiddleware` enabled with wildcard origin. Tighten to
the Vercel URL in production if needed.
