'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-sky-50 via-amber-50/30 to-blue-50">
      {/* 背景のパーティクル効果 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 py-12 sm:py-16">
        <div className="max-w-4xl w-full text-center space-y-6 sm:space-y-10 animate-fadeIn">
          {/* タイトルセクション */}
          <div className="space-y-3 sm:space-y-5">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-sky-900 mb-3 sm:mb-5 tracking-tight">
              Emo
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-sky-700 leading-relaxed max-w-2xl mx-auto px-4">
              時を遡り、失われた風景を取り戻す
            </p>
            
            <p className="text-sm sm:text-base text-sky-600/80 max-w-xl mx-auto px-4">
              あの日、あの場所の記憶を呼び起こし、<br className="hidden sm:block" />
              美しい額縁に入れてギャラリーに飾りましょう
            </p>
          </div>

          {/* アクションボタン */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-2xl mx-auto px-4 pt-2 sm:pt-4">
            {/* 思い出を探す */}
            <button
              onClick={() => router.push('/map')}
              className="group relative overflow-hidden py-5 sm:py-7 px-5 sm:px-7 rounded-2xl bg-gradient-to-br from-sky-300 to-cyan-400 text-sky-900 font-semibold text-base sm:text-lg shadow-lg shadow-sky-200/40 hover:shadow-sky-300/60 transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-sky-300/40"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex flex-col items-center gap-2 sm:gap-3">
                <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div>
                  <div className="text-lg sm:text-xl font-bold mb-1">思い出を探す</div>
                  <div className="text-xs sm:text-sm text-sky-800/70">場所と時間を指定して風景を復元</div>
                </div>
              </div>
            </button>

            {/* ギャラリーを見る */}
            <button
              onClick={() => router.push('/album')}
              className="group relative overflow-hidden py-5 sm:py-7 px-5 sm:px-7 rounded-2xl bg-gradient-to-br from-amber-200 to-amber-300 text-amber-900 font-semibold text-base sm:text-lg shadow-lg shadow-amber-200/40 hover:shadow-amber-300/60 transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-amber-300/40"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex flex-col items-center gap-2 sm:gap-3">
                <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="text-lg sm:text-xl font-bold mb-1">ギャラリーを見る</div>
                  <div className="text-xs sm:text-sm text-amber-800/70">保存した風景を鑑賞する</div>
                </div>
              </div>
            </button>
          </div>

          {/* 使い方ガイド */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-10 border-t border-sky-200/60">
            <h2 className="text-base sm:text-lg font-semibold text-sky-900 mb-5 sm:mb-7">使い方</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto">
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-sky-200/40 shadow-sm">
                <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-sky-200/50 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold text-sky-700">1</span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-sky-900 mb-1 sm:mb-2">場所を選ぶ</h3>
                <p className="text-xs sm:text-sm text-sky-700/70">地図上で思い出の場所をクリック</p>
              </div>
              
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-sky-200/40 shadow-sm">
                <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-sky-200/50 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold text-sky-700">2</span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-sky-900 mb-1 sm:mb-2">日時を指定</h3>
                <p className="text-xs sm:text-sm text-sky-700/70">その時の日時を選択</p>
              </div>
              
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-amber-200/40 shadow-sm">
                <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-amber-200/50 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold text-amber-700">3</span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-sky-900 mb-1 sm:mb-2">額縁に飾る</h3>
                <p className="text-xs sm:text-sm text-sky-700/70">復元した風景をギャラリーに保存</p>
              </div>
            </div>
          </div>
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