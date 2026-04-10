"use client";

import { RosProvider } from "@/contexts/RosContext";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <RosProvider>
      <Dashboard />
    </RosProvider>
  );
}
