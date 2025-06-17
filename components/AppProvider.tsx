"use client";

import React from "react";

import { SessionProvider } from "next-auth/react";
import { PaymentSheetProvider } from "@/context/payment-sheet-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={client}>
      <SessionProvider>
        <PaymentSheetProvider>{children}</PaymentSheetProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
