import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
}

/**
 * グラスモーフィズムスタイルのカードコンテナ - レスポンシブ対応
 * 装飾的な要素とグロー効果を含む
 */
export function GlassCard({ children }: GlassCardProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* スケルトンクロック風のコンテナ */}
      <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-5 sm:p-6 md:p-8">
        {/* ガラスエフェクトの装飾 */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        
        {children}

        {/* 装飾的な要素 */}
        <div className="absolute -top-px -left-px w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-gradient-to-br from-white/20 to-transparent rounded-tl-2xl sm:rounded-tl-3xl"></div>
        <div className="absolute -bottom-px -right-px w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-gradient-to-tl from-white/20 to-transparent rounded-br-2xl sm:rounded-br-3xl"></div>
      </div>

      {/* 外側のグロー効果 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl sm:rounded-3xl blur-2xl"></div>
    </div>
  );
}
