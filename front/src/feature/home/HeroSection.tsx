/**
 * ヒーローセクション（タイトルと説明）
 */
export function HeroSection() {
  return (
    <div className="space-y-3 sm:space-y-5">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-sky-900 mb-3 sm:mb-5 tracking-tight">
        Emo
      </h1>
      
      <p className="text-lg sm:text-xl md:text-2xl text-sky-700 leading-relaxed max-w-2xl mx-auto px-4">
        時を遡り、記憶に隠された風景を取り戻す
      </p>
      
      <p className="text-sm sm:text-base text-sky-600/80 max-w-xl mx-auto px-4">
        あの日、あの場所の記憶を呼び起こし、<br className="hidden sm:block" />
        美しい額縁に入れてギャラリーに飾りましょう
      </p>
    </div>
  );
}
