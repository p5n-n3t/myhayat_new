#!/usr/bin/env node
// Deterministic local stand-in for the Cloudflare Workers AI REST contract that
// src/lib/router/router.ts talks to. It mimics the two call shapes the app makes:
//   POST /{account}/ai/run/{model}            (stream: true)  -> SSE chunks
//   POST /{account}/ai/run/{model}            (stream: false) -> single JSON body
// See CF_API_BASE_URL in router.ts for how the app is pointed at this server.
import http from "node:http";

const PORT = process.env.CF_AI_STUB_PORT ? Number(process.env.CF_AI_STUB_PORT) : 8799;

const REPLY =
  "Thank you for sharing that with me. It makes complete sense to feel this way, " +
  "and I'm glad you reached out. I'm here to listen for as long as you need. " +
  "Can you tell me a little more about what's been on your mind lately?";

function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method !== "POST" || !/^\/[^/]+\/ai\/run\/.+/.test(req.url ?? "")) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "not found" }));
    return;
  }

  const raw = await readBody(req);
  let stream = true;
  try {
    stream = JSON.parse(raw)?.stream !== false;
  } catch {
    // default to streaming
  }

  if (!stream) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ result: { response: REPLY } }));
    return;
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const words = REPLY.split(" ");
  for (const word of words) {
    res.write(`data: ${JSON.stringify({ response: `${word} ` })}\n\n`);
    await new Promise((r) => setTimeout(r, 15));
  }
  res.write("data: [DONE]\n\n");
  res.end();
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`cf-ai-stub listening on :${PORT}`);
});
