"use client";

import dynamic from 'next/dynamic';

const PdfOrganizer = dynamic(() => import('./PdfOrganizer'), { ssr: false });

export default function PdfOrganizerWrapper() {
  return <PdfOrganizer />;
}
