import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") ?? "A-10491";
  const fail = id.endsWith("489");
  const warning = id.endsWith("490");
  const accent = fail ? "#ef4444" : warning ? "#f59e0b" : "#22c55e";
  const label = fail ? "FAIL" : warning ? "REVIEW" : "PASS";
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
  <rect width="960" height="540" fill="#101820"/>
  <rect x="150" y="90" width="660" height="360" rx="22" fill="#d7dde5"/>
  <rect x="195" y="142" width="570" height="256" rx="12" fill="#f8fafc" stroke="#64748b" stroke-width="8"/>
  <circle cx="340" cy="270" r="34" fill="#0f172a"/>
  <circle cx="620" cy="270" r="34" fill="#0f172a"/>
  <line x1="250" y1="190" x2="710" y2="190" stroke="#94a3b8" stroke-width="6"/>
  <line x1="250" y1="350" x2="710" y2="350" stroke="#94a3b8" stroke-width="6"/>
  ${fail ? '<rect x="300" y="326" width="270" height="16" fill="#ef4444" opacity="0.86"/><rect x="682" y="151" width="58" height="72" fill="#f97316" opacity="0.8"/>' : ""}
  ${warning ? '<rect x="518" y="182" width="124" height="84" fill="#f59e0b" opacity="0.5"/>' : ""}
  <rect x="40" y="38" width="210" height="66" rx="12" fill="${accent}"/>
  <text x="66" y="82" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="white">${label}</text>
  <text x="40" y="500" font-family="Arial, sans-serif" font-size="24" fill="#cbd5e1">${id} | OpenCV contour + measurement overlay</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": "no-store"
    }
  });
}
