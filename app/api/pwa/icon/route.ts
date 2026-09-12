const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Expense Tracker">
  <rect width="512" height="512" rx="112" fill="#2563eb"/>
  <path fill="#fff" d="M145 126h222c17 0 31 14 31 31v198c0 17-14 31-31 31H145c-17 0-31-14-31-31V157c0-17 14-31 31-31Zm1 56v32h220v-32H146Zm0 79v22h74v-22h-74Zm0 61v22h119v-22H146Zm169-61a28 28 0 1 0 0 56 28 28 0 0 0 0-56Z"/>
</svg>`;

export function GET() {
  return new Response(icon, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
