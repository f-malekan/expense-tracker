const offlinePage = `<!doctype html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#2563eb" />
    <title>Expense Tracker</title>
    <style>body{align-items:center;background:#f8fafc;color:#0f172a;display:flex;font-family:system-ui,sans-serif;justify-content:center;margin:0;min-height:100vh;padding:24px;text-align:center}main{max-width:26rem}h1{font-size:1.25rem;margin-bottom:.75rem}p{color:#475569;line-height:1.8}</style>
  </head>
  <body><main><h1>اتصال اینترنت در دسترس نیست</h1><p>پس از برقراری اتصال، دوباره تلاش کنید.</p></main></body>
</html>`;

export function GET() {
  return new Response(offlinePage, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
