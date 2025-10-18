interface ConfirmButtonProps {
  onClick: () => void;
  disabled: boolean;
}

/**
 * グラデーション付きの確定ボタン - レスポンシブ対応 + フォーカス状態強化
 */
export function ConfirmButton({ onClick, disabled }: ConfirmButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative group w-full py-3 sm:py-3.5 md:py-4 
               px-6 sm:px-8 
               text-[13px] sm:text-sm md:text-base font-semibold
               bg-gradient-to-r from-purple-500 to-pink-500 
               text-white rounded-lg sm:rounded-xl md:rounded-2xl
               shadow-lg shadow-purple-500/50
               hover:shadow-2xl hover:shadow-purple-500/70
               disabled:opacity-50 disabled:cursor-not-allowed
               transition-all duration-300
               hover:scale-[1.03]
               disabled:hover:scale-100
               disabled:hover:shadow-lg
               active:scale-[0.97]
               focus:outline-none focus:ring-4 focus:ring-purple-400/60"
    >
      <span className="flex items-center justify-center gap-2">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        確定
      </span>
    </button>
  );
}
