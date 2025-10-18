interface ActionButtonsProps {
  isSaving: boolean;
  onSaveToAlbum: () => void;
  onDownload: () => void;
  onBackToHome: () => void;
}

/**
 * 結果ページのアクションボタン群
 */
export function ActionButtons({
  isSaving,
  onSaveToAlbum,
  onDownload,
  onBackToHome,
}: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 flex-shrink-0">
      {/* アルバムに保存 */}
      <button
        onClick={onSaveToAlbum}
        disabled={isSaving}
        className="py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold text-white text-sm sm:text-base
                   bg-sky-500
                   hover:bg-sky-600
                   disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed
                   transform transition-all duration-300
                   hover:scale-[1.03] hover:shadow-2xl
                   active:scale-[0.97]
                   focus:outline-none focus:ring-4 focus:ring-sky-400/50
                   shadow-lg shadow-sky-500/30"
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          {isSaving ? '記憶を刻んでいます...' : 'アルバムに残す'}
        </span>
      </button>

      {/* ダウンロード */}
      <button
        onClick={onDownload}
        className="py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold text-sky-700 text-sm sm:text-base
                   bg-white/80 backdrop-blur-sm border-2 border-sky-200
                   hover:bg-white hover:border-sky-300 hover:shadow-xl
                   transform transition-all duration-300
                   hover:scale-[1.03]
                   active:scale-[0.97]
                   focus:outline-none focus:ring-4 focus:ring-sky-400/30"
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          ダウンロード
        </span>
      </button>

      {/* ホームに戻る */}
      <button
        onClick={onBackToHome}
        className="py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold text-sky-700 text-sm sm:text-base
                   bg-white/60 backdrop-blur-sm border-2 border-sky-100
                   hover:bg-white/80 hover:border-sky-200 hover:shadow-lg
                   transform transition-all duration-300
                   hover:scale-[1.03]
                   active:scale-[0.97]
                   focus:outline-none focus:ring-4 focus:ring-sky-400/20"
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          別の時間へ
        </span>
      </button>
    </div>
  );
}
