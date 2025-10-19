import { GeneratedImage } from '@/types';

interface ImageModalProps {
  image: GeneratedImage;
  onClose: () => void;
  onDelete: (id: string) => void;
}

/**
 * 画像プレビュー用モーダル
 */
export function ImageModal({ image, onClose, onDelete }: ImageModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 animate-fadeIn backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-7xl flex flex-col gap-2 sm:gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-slate-100 hover:bg-slate-800 hover:border-slate-600 hover:shadow-xl transition-all duration-300 rounded-full shadow-lg text-sm sm:text-base hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-slate-600/50"
        >
          ✕
        </button>

        {/* 画像本体 */}
        <div className="flex-1 flex items-center justify-center overflow-hidden min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.base64}
            alt="Memory detail"
            className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl rounded-lg"
          />
        </div>

        {/* 情報パネル */}
        <div className="flex-shrink-0 bg-slate-900/80 backdrop-blur-sm border border-slate-700 px-3 sm:px-6 py-2 sm:py-4 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-sm sm:text-lg font-serif text-slate-100 font-semibold mb-0.5 sm:mb-1">
                {new Date(image.datetime).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 font-serif">
                {new Date(image.datetime).toLocaleTimeString('ja-JP', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                {' '}・{' '}
                {image.position.lat.toFixed(4)}°N, {image.position.lng.toFixed(4)}°E
              </p>
            </div>
            
            <button
              onClick={() => onDelete(image.id)}
              className="px-4 sm:px-6 py-1.5 sm:py-2 bg-red-900/30 border border-red-700 text-red-400 font-serif text-xs sm:text-sm hover:bg-red-900/50 hover:text-red-300 hover:border-red-600 hover:shadow-lg hover:shadow-red-900/50 transition-all duration-300 rounded whitespace-nowrap hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-red-700/50"
            >
              取り外す
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
