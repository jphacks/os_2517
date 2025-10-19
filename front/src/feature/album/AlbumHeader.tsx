interface AlbumHeaderProps {
  imageCount: number;
  onBackToHome: () => void;
}

/**
 * ギャラリーページのヘッダー
 */
export function AlbumHeader({ imageCount, onBackToHome }: AlbumHeaderProps) {
  return (
    <header className="border-b border-amber-200/40 bg-white/30 backdrop-blur-sm flex-shrink-0 z-10 relative shadow-sm">
      <div className="px-3 sm:px-6 py-2">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-base sm:text-lg font-serif text-amber-900 tracking-wide">
            Memory Gallery
            {imageCount > 0 && (
              <span className="ml-2 text-xs text-amber-700">({imageCount})</span>
            )}
          </h1>
          <button
            onClick={onBackToHome}
            className="px-2 sm:px-3 py-1 border border-amber-700 text-amber-900 font-serif text-xs hover:bg-amber-800 hover:text-white transition-all duration-300 whitespace-nowrap hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
          >
            <span className="hidden sm:inline">思い出を探しに行く</span>
            <span className="sm:hidden">新規</span>
          </button>
        </div>
      </div>
    </header>
  );
}
