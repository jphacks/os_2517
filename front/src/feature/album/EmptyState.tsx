interface EmptyStateProps {
  onBackToHome: () => void;
}

/**
 * アルバムが空の状態の表示
 */
export function EmptyState({ onBackToHome }: EmptyStateProps) {
  return (
    <div className="h-full flex items-center justify-center p-4 sm:p-8">
      <div className="text-center">
        <div className="inline-block p-6 sm:p-8 border-2 border-dashed border-amber-300 rounded-lg bg-white/40 backdrop-blur-sm shadow-lg">
          <svg className="w-16 sm:w-20 h-16 sm:h-20 text-amber-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h2 className="text-lg sm:text-xl font-serif text-amber-900 mb-2">
            まだ記憶が保存されていません
          </h2>
          <p className="text-amber-700 font-serif text-xs sm:text-sm mb-4">
            過去の情景を探しに出かけましょう
          </p>
          <button
            onClick={onBackToHome}
            className="px-4 sm:px-6 py-2 bg-amber-700 text-white font-serif text-xs sm:text-sm hover:bg-amber-800 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-amber-600/50"
          >
            記憶を探しに行く
          </button>
        </div>
      </div>
    </div>
  );
}
