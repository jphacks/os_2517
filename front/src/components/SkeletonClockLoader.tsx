/**
 * SF風のスケルトン時計ローディングアニメーション
 * 歯車が回転し、時計の針が連動して動く演出
 */
export function SkeletonClockLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      {/* 背景のパーティクル */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-sky-400 rounded-full animate-pulse"
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
        {/* 外側の大きな歯車 - ゆっくり回転 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-72 h-72 animate-spin-slow" viewBox="0 0 120 120">
            {/* 歯車の歯 */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 360) / 12;
              return (
                <g key={i} transform={`rotate(${angle} 60 60)`}>
                  <rect
                    x="58"
                    y="2"
                    width="4"
                    height="12"
                    fill="url(#gearGradient1)"
                    opacity="0.6"
                  />
                </g>
              );
            })}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="url(#gearGradient1)"
              strokeWidth="3"
              opacity="0.4"
            />
            <defs>
              <linearGradient id="gearGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 中間の歯車 - 逆回転 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-52 h-52 animate-spin-reverse" viewBox="0 0 100 100">
            {/* 歯車の歯 */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 360) / 8;
              return (
                <g key={i} transform={`rotate(${angle} 50 50)`}>
                  <rect
                    x="48"
                    y="8"
                    width="4"
                    height="10"
                    fill="url(#gearGradient2)"
                    opacity="0.7"
                  />
                </g>
              );
            })}
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke="url(#gearGradient2)"
              strokeWidth="2.5"
              opacity="0.5"
            />
            <defs>
              <linearGradient id="gearGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 中心の時計盤 */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white to-sky-50 flex items-center justify-center shadow-2xl shadow-sky-500/30 border-4 border-sky-400/30">
            {/* 時計の目盛り */}
            <svg className="absolute w-32 h-32" viewBox="0 0 100 100">
              {[...Array(12)].map((_, i) => {
                const angle = (i * 360) / 12;
                const isMain = i % 3 === 0;
                return (
                  <line
                    key={i}
                    x1="50"
                    y1="10"
                    x2="50"
                    y2={isMain ? "18" : "15"}
                    stroke="#0ea5e9"
                    strokeWidth={isMain ? "2" : "1"}
                    opacity="0.6"
                    transform={`rotate(${angle} 50 50)`}
                  />
                );
              })}
            </svg>

            {/* 時計の針 - 短針（歯車と連動） */}
            <div className="absolute w-32 h-32 flex items-center justify-center animate-clock-hour">
              <div className="absolute w-1.5 h-10 bg-gradient-to-b from-sky-500 to-sky-600 rounded-full shadow-lg origin-bottom" 
                   style={{ transformOrigin: 'center 80%', transform: 'translateY(-20%)' }} />
            </div>

            {/* 時計の針 - 長針（歯車と連動・高速） */}
            <div className="absolute w-32 h-32 flex items-center justify-center animate-clock-minute">
              <div className="absolute w-1 h-14 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full shadow-lg origin-bottom"
                   style={{ transformOrigin: 'center 80%', transform: 'translateY(-20%)' }} />
            </div>

            {/* 秒針 - 超高速逆回転 */}
            <div className="absolute w-32 h-32 flex items-center justify-center animate-clock-second">
              <div className="absolute w-0.5 h-16 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full shadow-lg origin-bottom"
                   style={{ transformOrigin: 'center 80%', transform: 'translateY(-20%)' }} />
            </div>

            {/* 中心の留め具 */}
            <div className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-sky-500 to-blue-500 shadow-lg z-10" />
          </div>
        </div>

        {/* テキスト */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center w-full">
          <p className="text-sky-900 text-xl font-bold mb-2 animate-pulse">
            記憶を紡いでいます...
          </p>
          <p className="text-sky-700 text-sm">
            時の歯車が、失われた風景を描き出す
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

        @keyframes clock-hour {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes clock-minute {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes clock-second {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }

        .animate-clock-hour {
          animation: clock-hour 8s linear infinite;
        }

        .animate-clock-minute {
          animation: clock-minute 2s linear infinite;
        }

        .animate-clock-second {
          animation: clock-second 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
