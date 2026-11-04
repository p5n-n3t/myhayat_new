const fs = require("node:fs");
const sharp = require("sharp");

/**
 * Rebuild the outline beam from the real image alpha, so no rectangular orbit is drawn.
 * Run: node scripts/generate-hero-traces.cjs
 */
(async () => {
  const { data, info } = await sharp("public/myhayat_hero.png")
    .resize({ width: 500 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const opaque = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) opaque[i] = data[i * C + 3] > 50 ? 1 : 0;
  const present = (x, y) => x >= 0 && y >= 0 && x < W && y < H && opaque[y * W + x] === 1;

  const edges = new Map();
  const add = (x1, y1, x2, y2) => {
    const key = x1 + "," + y1;
    const exits = edges.get(key) || [];
    exits.push([x2, y2]);
    edges.set(key, exits);
  };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (!present(x, y)) continue;
    if (!present(x, y - 1)) add(x, y, x + 1, y);
    if (!present(x + 1, y)) add(x + 1, y, x + 1, y + 1);
    if (!present(x, y + 1)) add(x + 1, y + 1, x, y + 1);
    if (!present(x - 1, y)) add(x, y + 1, x, y);
  }

  const contours = [];
  while (edges.size) {
    const start = edges.keys().next().value;
    let key = start;
    const points = [];
    let closed = false;
    while (points.length < 20000) {
      const choices = edges.get(key);
      if (!choices?.length) break;
      const next = choices.pop();
      if (!choices.length) edges.delete(key);
      points.push(next);
      key = next.join(",");
      if (key === start) { closed = true; break; }
    }
    if (closed && points.length >= 10) contours.push(points);
  }
  contours.sort((a, b) => b.length - a.length);

  function distToSegment(p, a, b) {
    const dx = b[0] - a[0], dy = b[1] - a[1];
    if (!dx && !dy) return Math.hypot(p[0] - a[0], p[1] - a[1]);
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
  }
  function simplify(points, epsilon = 1.1) {
    if (points.length < 4) return points;
    const keep = new Set([0, points.length - 1]);
    const pending = [[0, points.length - 1]];
    while (pending.length) {
      const [a, b] = pending.pop();
      let best = -1, bestD = epsilon;
      for (let i = a + 1; i < b; i++) {
        const d = distToSegment(points[i], points[a], points[b]);
        if (d > bestD) { bestD = d; best = i; }
      }
      if (best >= 0) { keep.add(best); pending.push([a, best], [best, b]); }
    }
    return [...keep].sort((a,b)=>a-b).map(i=>points[i]);
  }

  // Largest outer silhouette + three disconnected accent rays. Internal transparent
  // holes and tiny details intentionally excluded to avoid beams through the artwork.
  const pathData = [contours[0], ...contours.slice(4, 7)].map(p => {
    const v = simplify(p);
    return "M" + v.map(pt=>pt.join(" ")).join(" L") + " Z";
  });
  const paths = pathData.map((d,i) =>
    `<path d="${d}" pathLength="100" class="base"/><path d="${d}" pathLength="100" class="glow track-${i}"/><path d="${d}" pathLength="100" class="beam track-${i}"/>`
  ).join("\n");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>
path{fill:none;stroke-linejoin:round;stroke-linecap:round}
.base{stroke:#FEC810;stroke-width:1.2;opacity:.10}
.glow,.beam{stroke-dasharray:6 94;animation:orbit 7s linear infinite}
.glow{stroke:#F85BAA;stroke-width:7;opacity:.42;filter:blur(2px)}
.beam{stroke:#FEC810;stroke-width:3;filter:drop-shadow(0 0 2px #FEC810)}
.track-1{animation-duration:3.9s}.track-2{animation-duration:4.7s;animation-direction:reverse}
.track-3{animation-duration:4.1s}
@keyframes orbit{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}
@media(prefers-reduced-motion:reduce){.glow,.beam{animation:none;opacity:0}.base{opacity:.18}}
</style>
${paths}
</svg>`;
  fs.writeFileSync("public/myhayat_hero_traces.svg", svg);
  console.log("Generated traced beams:", pathData.map(x=>x.length), "SVG bytes:", Buffer.byteLength(svg));
})().catch(e=>{console.error(e);process.exitCode=1;});

