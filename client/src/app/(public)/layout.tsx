'use client';

import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import FloatingContact from '../../components/common/FloatingContact';
import { useState, useEffect } from 'react';
import { fetchAPI } from '../../lib/api';
import { usePathname } from 'next/navigation';

import { ModalProvider, useModal } from '../../context/ModalContext';
import InquiryModal from '../../components/layout/InquiryModal';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <LayoutContent>{children}</LayoutContent>
    </ModalProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isEnquiryModalOpen, closeEnquiryModal } = useModal();
  const pathname = usePathname();
  const [whatsapp, setWhatsapp] = useState('1234567890');

  useEffect(() => {
    // Fetch WhatsApp number from CMS content
    fetchAPI('/cms/home')
      .then((res) => {
        if (res.success && res.data?.content?.whatsappNumber) {
          setWhatsapp(res.data.content.whatsappNumber);
        }
      })
      .catch(() => {/* use default */});
  }, []);

  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 400px)' }}>
        {children}
      </main>
      <Footer />
      <FloatingContact />
      <InquiryModal isOpen={isEnquiryModalOpen} onClose={closeEnquiryModal} />
    </>
  );
}
