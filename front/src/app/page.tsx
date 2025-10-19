'use client';

import { ParticleBackground } from '@/feature/home/ParticleBackground';
import { HeroSection } from '@/feature/home/HeroSection';
import { ActionButtons } from '@/feature/home/ActionButtons';
import { GuideSection } from '@/feature/home/GuideSection';

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-sky-50 via-amber-50/30 to-blue-50">
      <ParticleBackground />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 py-12 sm:py-16">
        <div className="max-w-4xl w-full text-center space-y-6 sm:space-y-10 animate-fadeIn">
          <HeroSection />
          <ActionButtons />
          <GuideSection />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}