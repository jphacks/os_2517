/**
 * ギャラリーページのローディング画面
 */
export function LoadingScreen() {
  return (
    <div className="h-screen bg-gradient-to-b from-amber-50 via-stone-100 to-amber-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mx-auto mb-4"></div>
        <p className="text-amber-900 font-serif">ギャラリーを準備しています...</p>
      </div>
    </div>
  );
}
