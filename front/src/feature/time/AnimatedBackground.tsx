/**
 * 背景のアニメーション要素
 * 3つの円形のぼやけたグラデーションがパルスアニメーション
 */
export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
    </div>
  );
}
