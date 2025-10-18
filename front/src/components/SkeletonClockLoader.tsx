/**
 * SF風のスケルトン時計ローディングアニメーション
 * 歯車が回転し、タイムトラベル中の演出
 */
export function SkeletonClockLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 背景のパーティクル */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative">
        {/* 外側の円 - 回転 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border-4 border-purple-500/30 rounded-full animate-spin-slow" />
        </div>

        {/* 中間の歯車 - 逆回転 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-48 h-48 animate-spin-reverse" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="2"
              strokeDasharray="8 4"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 内側の歯車 - 高速回転 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-32 h-32 animate-spin" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="3"
              strokeDasharray="4 2"
            />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 中心の時計アイコン */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-pulse-slow">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* テキスト */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center w-full">
          <p className="text-white text-xl font-bold mb-2 animate-pulse">
            時を遡っています...
          </p>
          <p className="text-purple-300 text-sm">
            あの日の記憶を辿って
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
