"use client";

import { useEffect } from "react";
import { resendOfflineQueue } from "@/lib/resendOffline";

export default function OfflineSync() {
  useEffect(() => {
    resendOfflineQueue();
  }, []);

  return null;
}
