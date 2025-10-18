/**
 * 時計アイコン付きのヘッダーセクション - レスポンシブ対応
 */
export function TimePageHeader() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg">
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5 sm:mb-2">
        あの日、あの時へ
      </h1>
      <p className="text-purple-200 text-[11px] sm:text-xs md:text-sm leading-relaxed px-2">
        時を遡り、過ぎ去りし日の情景を呼び起こす
      </p>
    </div>
  );
}
