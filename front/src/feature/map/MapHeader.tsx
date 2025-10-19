/**
 * マップページのヘッダーコンポーネント
 */
export function MapHeader() {
  return (
    <div className="text-center mb-3 sm:mb-4 animate-fadeIn">
      <div className="inline-block mb-3 sm:mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-full bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-sky-900 drop-shadow-sm">
        あれは何処だろう？
      </h1>
      <p className="text-sm sm:text-base text-sky-700 leading-relaxed">
        あの頃の思い出の場所を、地図上で選んでください
      </p>
    </div>
  );
}
