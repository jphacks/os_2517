interface ImageDisplayProps {
  imageData: string;
}

/**
 * 生成された画像を表示するコンポーネント
 */
export function ImageDisplay({ imageData }: ImageDisplayProps) {
  return (
    <div className="relative backdrop-blur-xl bg-white/60 rounded-3xl shadow-2xl border border-sky-200 p-4 sm:p-6 mb-4 md:mb-6 animate-slideUp flex-1 flex flex-col min-h-0">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
        {/* セピア風のオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sky-100/20 pointer-events-none z-10"></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageData}
          alt="Generated memory"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      {/* 時間の刻印 */}
      <div className="mt-3 sm:mt-4 text-center text-sky-700 text-xs sm:text-sm md:text-base flex-shrink-0">
        <p>あなたの思い出から再現された景色</p>
      </div>
    </div>
  );
}
