'use client';

import dynamic from 'next/dynamic';
import { MapBackground } from '@/feature/map/MapBackground';
import { MapHeader } from '@/feature/map/MapHeader';
import { NextStepHint } from '@/feature/map/NextStepHint';
import { MapLoadingScreen } from '@/feature/map/MapLoadingScreen';

// InteractiveMapを動的インポートし、SSRを無効化
const InteractiveMap = dynamic(
  () => import('@/feature/map/InteractiveMap'),
  { 
    ssr: false,
    loading: () => <MapLoadingScreen />
  }
);

/**
 * マップページ - 記憶の場所を選択
 */
export default function MapPage() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-sky-100 via-blue-100 to-cyan-100">
      <MapBackground />

      {/* メインコンテンツ */}
      <div className="relative h-full w-full overflow-y-auto p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <MapHeader />
          
          {/* マップ */}
          <div className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <InteractiveMap />
          </div>
          
          {/* <NextStepHint /> */}
        </div>
      </div>
    </div>
  );
}
