export function GET() {
  return Response.json({
    name: "Expense Tracker",
    short_name: "هزینه‌ها",
    description: "مدیریت هزینه‌های شخصی",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    lang: "fa",
    dir: "rtl",
    icons: [
      {
        src: "/api/pwa/icon",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
  });
}
