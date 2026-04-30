'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../../../../../lib/api';
import FAQForm from '../../../../../components/admin/faq/FAQForm';
import { useParams } from 'next/navigation';

export default function EditFAQ() {
  const { id } = useParams();
  const [faq, setFaq] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFaq = async () => {
      try {
        const res = await fetchAPI('/faqs');
        if (res.success) {
          const found = res.data.find((f: any) => f._id === id);
          setFaq(found);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadFaq();
  }, [id]);

  if (loading) return <div>Loading FAQ...</div>;
  if (!faq) return <div>FAQ not found</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Edit FAQ</h1>
      <FAQForm initialData={faq} faqId={id as string} />
    </div>
  );
}
