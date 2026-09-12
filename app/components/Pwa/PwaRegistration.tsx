"use client";

import { useEffect } from "react";

export default function PwaRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/api/pwa/service-worker", {
        scope: "/",
      });
    }
  }, []);

  return null;
}
