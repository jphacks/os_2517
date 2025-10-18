'use client';

import dynamic from 'next/dynamic';

// InteractiveMapを動的インポートし、SSRを無効化
const InteractiveMap = dynamic(
  () => import('@/feature/map/InteractiveMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-600">マップを読み込んでいます...</p>
      </div>
    )
  }
);

export default function MapPage() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50 to-indigo-50">
      <div className="h-full w-full overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 text-slate-800">
              記憶の場所を探して
            </h1>
            <p className="text-slate-600 leading-relaxed">
              地図上のどこかに、あなたの思い出が眠っています
            </p>
          </div>
          <InteractiveMap />
          
          {/* 次のステップへの案内 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500 italic">
              📍 場所を選んだら、次は時間を遡ります
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
