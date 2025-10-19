/**
 * 結果ページのローディング画面
 */
export function LoadingScreen() {
  return (
    <div className="fixed inset-0 overflow-hidden flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      <p className="text-sky-700 font-semibold">風景を探しています...</p>
    </div>
  );
}
