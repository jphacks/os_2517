/**
 * 結果ページのヘッダーコンポーネント
 */
export function ResultHeader() {
  return (
    <div className="text-center mb-4 md:mb-6 animate-fadeIn flex-shrink-0">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-900 mb-2">
        思い出の風景  
      </h1>
      <p className="text-sky-700 text-sm sm:text-base md:text-lg leading-relaxed">
        あの日を覚えていますか？
      </p>
    </div>
  );
}
