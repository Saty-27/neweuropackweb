'use client';

import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isEnquiryModalOpen: boolean;
  openEnquiryModal: () => void;
  closeEnquiryModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const openEnquiryModal = () => setIsEnquiryModalOpen(true);
  const closeEnquiryModal = () => setIsEnquiryModalOpen(false);

  return (
    <ModalContext.Provider value={{ isEnquiryModalOpen, openEnquiryModal, closeEnquiryModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
