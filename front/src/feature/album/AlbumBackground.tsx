/**
 * 美術館の壁のテクスチャ背景
 */
export function AlbumBackground() {
  return (
    <div 
      className="absolute inset-0 opacity-15 pointer-events-none"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(139,115,85,0.03) 1px, rgba(139,115,85,0.03) 2px),
          repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(139,115,85,0.03) 1px, rgba(139,115,85,0.03) 2px)
        `
      }}
    />
  );
}
