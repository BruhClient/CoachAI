"use client";

import { createContext, useContext, useState } from "react";

type PaymentSheetContextType = {
  isOpen: boolean;
  open: (purchasableSeconds: number) => void;
  close: () => void;
  purchasableSeconds: number | null;
};

const PaymentSheetContext = createContext<PaymentSheetContextType | undefined>(
  undefined
);

export const PaymentSheetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [purchasableSeconds, setPurchasableSeconds] = useState<number | null>(
    null
  );

  const open = (seconds: number) => {
    setPurchasableSeconds(seconds);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setPurchasableSeconds(null);
  };

  return (
    <PaymentSheetContext.Provider
      value={{ isOpen, open, close, purchasableSeconds }}
    >
      {children}
    </PaymentSheetContext.Provider>
  );
};

export const usePaymentSheet = () => {
  const context = useContext(PaymentSheetContext);
  if (!context)
    throw new Error("usePaymentSheet must be used within PaymentSheetProvider");
  return context;
};
