/**
 * 結果ページのヘッダーコンポーネント
 */
export function ResultHeader() {
  return (
    <div className="text-center mb-4 md:mb-6 animate-fadeIn flex-shrink-0">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-900 mb-2">
        時を超えた風景
      </h1>
      <p className="text-sky-700 text-sm sm:text-base md:text-lg leading-relaxed">
        あの日あの場所の、もう一つの可能性
      </p>
    </div>
  );
}
