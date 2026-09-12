import type { Metadata } from "next";

export const metadata: Metadata = {
  manifest: "/api/pwa/manifest",
};

export default function AuthPwaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
