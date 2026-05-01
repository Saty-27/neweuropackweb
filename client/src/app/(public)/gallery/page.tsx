import GalleryClient from './GalleryClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industrial Packaging Gallery | Europack Portfolio',
  description: 'Explore our 26+ industrial packaging projects.',
};

export default function GalleryPage() {
  const staticItems = [
    { _id: '1', title: 'Export Packing', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/ExportPacking.webp' } },
    { _id: '2', title: 'Heavy Machine Packing', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/heavymachinepacking.webp' } },
    { _id: '3', title: 'Wooden Skids', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/woodenskids.webp' } },
    { _id: '4', title: 'Heavy Engineering', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/heavyengineeringpacking.webp' } },
    { _id: '5', title: 'Shrink Packing', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/shrinkpacking.webp' } },
    { _id: '6', title: 'Nailless Boxes', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/naillessboxes.webp' } },
    { _id: '7', title: 'Plywood Boxes', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/plywoodBoxes.webp' } },
    { _id: '8', title: 'Huge Machine Packing', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/hugemachinepacking.webp' } },
    { _id: '9', title: 'Boxes', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/Boxes.webp' } },
    { _id: '10', title: 'Packing Service', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/Packing.webp' } },
    { _id: '11', title: 'Hardwood Boxes', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/Hardwood-Boxes.webp' } },
    { _id: '12', title: 'Kraft Paper Board', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/KRAFT-PAPER-BOARD-BED.webp' } },
    { _id: '13', title: 'Machine Packing', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/machinepacking.webp' } },
    { _id: '14', title: 'Nailess Boxes Mumbai', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/nailessboxesinmumbai.webp' } },
    { _id: '15', title: 'Industrial Project 2023', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/2023-04-03.webp' } },
    { _id: '16', title: 'Project Archive 2024', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/2024-01-06.webp' } },
    { _id: '17', title: 'Operational Showcase', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/IMG-20180511-WA0066.webp' } },
    { _id: '18', title: 'Working Process Video 1', category: 'Video', type: 'video', videoUrl: 'images/Gallery/WhatsApp Video 2026-04-28 at 14.27.41.mp4', image: { url: 'images/Gallery/Packing.webp' } },
    { _id: '19', title: 'Working Process Video 2', category: 'Video', type: 'video', videoUrl: 'images/Gallery/WhatsApp Video 2026-04-28 at 14.27.53.mp4', image: { url: 'images/Gallery/Packing.webp' } },
    { _id: '20', title: 'Working Process Video 3', category: 'Video', type: 'video', videoUrl: 'images/Gallery/WhatsApp Video 2026-04-28 at 14.27.54.mp4', image: { url: 'images/Gallery/Packing.webp' } },
    { _id: '21', title: 'Working Process Video 4', category: 'Video', type: 'video', videoUrl: 'images/Gallery/WhatsApp Video 2026-04-28 at 14.27.55.mp4', image: { url: 'images/Gallery/Packing.webp' } },
    { _id: '22', title: 'Working Process Video 5', category: 'Video', type: 'video', videoUrl: 'images/Gallery/WhatsApp Video 2026-04-28 at 14.27.55 (1).mp4', image: { url: 'images/Gallery/Packing.webp' } },
    { _id: '23', title: 'Project Overview 2026', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/WhatsApp Image 2026-04-28 at 14.29.02.jpeg' } },
    { _id: '24', title: 'Final Packing Video', category: 'Video', type: 'video', videoUrl: 'images/Gallery/WhatsApp Video 2026-04-28 at 14.29.08.mp4', image: { url: 'images/Gallery/Packing.webp' } },
    { _id: '25', title: 'Secondary Packing', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/2023-04-03 (1).webp' } },
    { _id: '26', title: 'Transit Security', category: 'Industrial', type: 'image', image: { url: 'images/Gallery/2024-01-06 (1).webp' } }
  ];

  return (
    <div className="bg-white">
      <GalleryClient items={staticItems} settings={{ subtitle: 'Industrial Portfolio' }} />
    </div>
  );
}
