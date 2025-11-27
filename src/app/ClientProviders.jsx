"use client"; // <--- important

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useState } from "react";

export default function ClientProviders({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        {children}
        <Footer />
      </QueryClientProvider>
    </SessionProvider>
  );
}
