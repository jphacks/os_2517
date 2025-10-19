interface ScrollHintProps {
  onClick: () => void;
}

/**
 * 横スクロールのヒント
 */
export function ScrollHint({ onClick }: ScrollHintProps) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex items-center gap-1.5 sm:gap-2 bg-slate-900/70 backdrop-blur-sm text-slate-200 px-3 sm:px-5 py-1.5 sm:py-2 rounded-sm text-[10px] sm:text-xs font-serif shadow-lg border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600 hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-500"
    >
      <svg className="w-2.5 sm:w-3 h-2.5 sm:h-3 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
      <span className="tracking-wide hidden sm:inline">横にスクロールしてギャラリーを巡る</span>
      <span className="tracking-wide sm:hidden">スクロール →</span>
    </button>
  );
}
