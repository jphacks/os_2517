'use client';

import dynamic from 'next/dynamic';

// InteractiveMapを動的インポートし、SSRを無効化
const InteractiveMap = dynamic(
  () => import('@/feature/map/InteractiveMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-blue-900/20 rounded-lg">
        <p className="text-purple-200">マップを読み込んでいます...</p>
      </div>
    )
  }
);

export default function MapPage() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* アニメーション背景（星空効果） */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        {/* 星のような光の粒子 */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/30 animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 3 + 2 + 's',
            }}
          />
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="relative h-full w-full overflow-y-auto p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
            <div className="inline-block mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200">
              記憶の場所を探して
            </h1>
            <p className="text-sm sm:text-base text-purple-200/80 leading-relaxed">
              地図上のどこかに、あなたの思い出が眠っています
            </p>
          </div>

          {/* マップ */}
          <div className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <InteractiveMap />
          </div>
          
          {/* 次のステップへの案内 */}
          <div className="mt-4 sm:mt-6 text-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <p className="text-xs sm:text-sm text-purple-300/70 italic">
              📍 場所を選んだら、次は時間を遡ります
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
