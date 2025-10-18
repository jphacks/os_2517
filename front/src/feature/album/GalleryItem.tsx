import { GeneratedImage } from '@/types';

interface GalleryItemProps {
  image: GeneratedImage;
  index: number;
  frameSize: { width: string; height: string };
  onClick: () => void;
}

/**
 * ギャラリーの個別アイテム(額縁と銘板)
 */
export function GalleryItem({ image, index, frameSize, onClick }: GalleryItemProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer flex-shrink-0 animate-fade-in-gallery relative scroll-snap-align-center"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        scrollSnapAlign: 'center'
      }}
    >
      {/* スポットライト効果 */}
      <div className="absolute -top-16 sm:-top-24 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-32 sm:h-40 bg-gradient-radial from-white/12 via-white/4 to-transparent blur-3xl pointer-events-none"></div>
      
      {/* 額縁 */}
      <div 
        className="relative p-4 sm:p-6 transition-all duration-500 transform group-hover:scale-[1.01]"
        style={{ 
          width: frameSize.width,
          height: frameSize.height,
          maxHeight: '700px',
          background: 'linear-gradient(135deg, #d4a843 0%, #f5e6c8 20%, #d4a843 40%, #c49a3a 60%, #f5e6c8 80%, #d4a843 100%)',
          boxShadow: `
            0 25px 70px rgba(0,0,0,0.45),
            0 0 0 2px rgba(0,0,0,0.1),
            inset 0 0 0 3px #8b7355,
            inset 0 0 0 6px #d4a843,
            inset 0 0 0 9px #f5e6c8,
            inset 0 0 0 12px #c49a3a,
            inset 0 2px 3px rgba(255,255,255,0.35),
            inset 0 -2px 3px rgba(0,0,0,0.25)
          `,
          borderRadius: '2px'
        }}
      >
        {/* 額縁の装飾パターン */}
        <div className="absolute inset-0 opacity-25 pointer-events-none"
             style={{
               backgroundImage: `
                 repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(139,115,85,0.25) 4px, rgba(139,115,85,0.25) 5px),
                 repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(139,115,85,0.25) 4px, rgba(139,115,85,0.25) 5px)
               `
             }}
        ></div>
        
        {/* 装飾的な角 */}
        <div className="absolute top-3 left-3 w-8 h-8">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-900 via-amber-700 to-transparent"></div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-amber-900 via-amber-700 to-transparent"></div>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8">
          <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-amber-900 via-amber-700 to-transparent"></div>
          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-amber-900 via-amber-700 to-transparent"></div>
        </div>
        <div className="absolute bottom-3 left-3 w-8 h-8">
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-900 via-amber-700 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-amber-900 via-amber-700 to-transparent"></div>
        </div>
        <div className="absolute bottom-3 right-3 w-8 h-8">
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-amber-900 via-amber-700 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-amber-900 via-amber-700 to-transparent"></div>
        </div>
        
        {/* 内側の境界線 */}
        <div className="h-full border-3 border-amber-950 bg-black/75 p-1.5 relative overflow-hidden">
          <div className="relative w-full h-full overflow-hidden bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.base64}
              alt="Memory"
              className="w-full h-full object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-300"
            />
            {/* ガラスの反射効果 */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/4 via-transparent to-transparent pointer-events-none"></div>
            {/* 影 */}
            <div className="absolute inset-0 shadow-inner pointer-events-none" style={{ boxShadow: 'inset 0 0 15px rgba(0,0,0,0.25)' }}></div>
          </div>
        </div>
      </div>
      
      {/* プレート(銘板) */}
      <div className="mt-2 sm:mt-4 mx-auto px-3 sm:px-4 py-1.5 sm:py-2 text-center relative" 
           style={{ 
             width: 'clamp(150px, 50vw, 200px)',
             background: 'linear-gradient(180deg, #8b7355 0%, #6b5a47 50%, #5a4a3a 100%)',
             boxShadow: `
               0 4px 12px rgba(0,0,0,0.35),
               inset 0 1px 0 rgba(255,255,255,0.08),
               inset 0 -1px 0 rgba(0,0,0,0.25)
             `,
             border: '1px solid rgba(0,0,0,0.25)'
           }}>
        <p className="text-[9px] sm:text-[10px] font-serif text-amber-100/85 font-semibold mb-0.5 tracking-wide"
           style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
          {new Date(image.datetime).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p className="text-[8px] sm:text-[9px] text-amber-200/75 font-serif"
           style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
          {new Date(image.datetime).toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
        <div className="mt-1 pt-1 border-t border-amber-900/50">
          <p className="text-[9px] text-amber-300/70 tracking-wide"
             style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
            {image.position.lat.toFixed(4)}°N, {image.position.lng.toFixed(4)}°E
          </p>
        </div>
      </div>
    </div>
  );
}
