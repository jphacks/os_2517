'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getAllImages, deleteImage } from '@/lib/album';
import { GeneratedImage } from '@/types';

interface ImageDimensions {
  width: number;
  height: number;
}

export default function AlbumPage() {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageDimensions, setImageDimensions] = useState<Map<string, ImageDimensions>>(new Map());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    loadImages();
  }, []);

  // 画像の寸法を取得
  useEffect(() => {
    images.forEach((image) => {
      if (!imageDimensions.has(image.id)) {
        const img = new Image();
        img.onload = () => {
          setImageDimensions(prev => new Map(prev).set(image.id, {
            width: img.naturalWidth,
            height: img.naturalHeight
          }));
        };
        img.src = image.base64;
      }
    });
  }, [images, imageDimensions]);

  // PC用ホイール操作を横スクロールに変換
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // 横スクロール可能な領域をチェック
      const hasHorizontalScroll = container.scrollWidth > container.clientWidth;
      if (!hasHorizontalScroll) return;

      // 横スクロールの場合はそのまま
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      
      // 縦スクロールを横スクロールに変換
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [images]); // imagesが変わったら再設定

  const loadImages = async () => {
    try {
      const data = await getAllImages();
      setImages(data);
    } catch (error) {
      console.error('画像の読み込みエラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('この記憶を削除しますか？')) return;
    
    try {
      await deleteImage(id);
      await loadImages();
      setSelectedImage(null);
    } catch (error) {
      console.error('削除エラー:', error);
      alert('削除に失敗しました。');
    }
  };

  const handleBackToHome = () => {
    router.push('/map');
  };

  // 次の画像にスクロール
  const handleScrollToNext = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    // 次の額縁の位置を計算（現在の位置 + コンテナ幅の80%程度）
    const scrollAmount = container.clientWidth * 0.8;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  // 画像のアスペクト比に基づいて額縁サイズを計算
  const getFrameSize = (imageId: string) => {
    const dims = imageDimensions.get(imageId);
    if (!dims) {
      // デフォルトサイズ（正方形）
      return { width: 'clamp(300px, 80vw, 450px)', height: 'clamp(300px, 80vw, 450px)' };
    }

    const aspectRatio = dims.width / dims.height;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 640;
    const isMobile = screenWidth < 640;
    
    // 基準となる最大高さ（ピクセル値）
    const maxHeightPx = isMobile ? (typeof window !== 'undefined' ? window.innerHeight - 200 : 500) : (typeof window !== 'undefined' ? window.innerHeight - 160 : 600);
    
    if (aspectRatio > 1) {
      // 横長の画像
      const width = Math.min(maxHeightPx * aspectRatio, isMobile ? 350 : 550);
      return {
        width: `${width}px`,
        height: `${width / aspectRatio}px`
      };
    } else if (aspectRatio < 1) {
      // 縦長の画像
      const height = Math.min(maxHeightPx, 700);
      return {
        width: `${height * aspectRatio}px`,
        height: `${height}px`
      };
    } else {
      // 正方形
      const size = Math.min(maxHeightPx, isMobile ? 350 : 450);
      return {
        width: `${size}px`,
        height: `${size}px`
      };
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-to-b from-amber-50 via-stone-100 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mx-auto mb-4"></div>
          <p className="text-amber-900 font-serif">記憶を呼び起こしています...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#7a8a95] flex flex-col">
      {/* 美術館の壁のテクスチャ */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.02) 1px, rgba(0,0,0,0.02) 2px),
            repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.02) 1px, rgba(0,0,0,0.02) 2px)
          `
        }}
      ></div>
      
      {/* ヘッダー - コンパクト&透明、レスポンシブ */}
      <header className="border-b border-slate-500/20 bg-transparent flex-shrink-0 z-10 relative">
        <div className="px-3 sm:px-6 py-2">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-base sm:text-lg font-serif text-slate-800 tracking-wide">
              Memory Gallery
              {images.length > 0 && (
                <span className="ml-2 text-xs text-slate-600">({images.length})</span>
              )}
            </h1>
            <button
              onClick={handleBackToHome}
              className="px-2 sm:px-3 py-1 border border-slate-600 text-slate-800 font-serif text-xs hover:bg-slate-800 hover:text-white transition-colors duration-300 whitespace-nowrap"
            >
              <span className="hidden sm:inline">新しい記憶を探す</span>
              <span className="sm:hidden">新規</span>
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ - 横スクロール */}
      <main className="flex-1 overflow-hidden relative">
        {images.length === 0 ? (
          // 空の状態
          <div className="h-full flex items-center justify-center p-4 sm:p-8">
            <div className="text-center">
              <div className="inline-block p-6 sm:p-8 border-2 border-dashed border-slate-400 rounded-lg bg-slate-200/50">
                <svg className="w-16 sm:w-20 h-16 sm:h-20 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="text-lg sm:text-xl font-serif text-slate-700 mb-2">
                  まだ記憶が保存されていません
                </h2>
                <p className="text-slate-600 font-serif text-xs sm:text-sm mb-4">
                  過去の情景を探しに出かけましょう
                </p>
                <button
                  onClick={handleBackToHome}
                  className="px-4 sm:px-6 py-2 bg-slate-700 text-white font-serif text-xs sm:text-sm hover:bg-slate-800 transition-colors duration-300"
                >
                  記憶を探しに行く
                </button>
              </div>
            </div>
          </div>
        ) : (
          // 横スクロールギャラリー - レスポンシブ対応
          <div
            ref={scrollContainerRef}
            className="h-full overflow-x-auto overflow-y-hidden scrollbar-hide relative scroll-snap-x-mandatory"
            style={{ 
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory'
            }}
          >
            {/* レスポンシブ: モバイルは300px、タブレット以上は450px */}
            <div className="h-full flex items-center" style={{ 
              width: 'max-content',
              paddingLeft: 'clamp(calc(50vw - 150px), calc(50vw - 150px), calc(50vw - 225px))',
              paddingRight: 'clamp(calc(50vw - 150px), calc(50vw - 150px), calc(50vw - 225px))',
              gap: 'clamp(calc(300px * 0.8), 10vw, calc(450px * 0.9))'
            }}>
              {images.map((image, index) => {
                const frameSize = getFrameSize(image.id);
                
                return (
                  <div
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className="group cursor-pointer flex-shrink-0 animate-fade-in-gallery relative scroll-snap-align-center"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      scrollSnapAlign: 'center'
                    }}
                  >
                    {/* スポットライト効果 */}
                    <div className="absolute -top-16 sm:-top-24 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-32 sm:h-40 bg-gradient-radial from-white/12 via-white/4 to-transparent blur-3xl pointer-events-none"></div>
                    
                    {/* 額縁 - 画像のアスペクト比に応じた可変サイズ */}
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
                  
                  {/* プレート（銘板） - レスポンシブ */}
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
              })}
            </div>
          </div>
        )}

        {/* スクロールヒント - レスポンシブ */}
        {images.length > 0 && (
          <button
            onClick={handleScrollToNext}
            className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex items-center gap-1.5 sm:gap-2 bg-slate-900/70 backdrop-blur-sm text-slate-200 px-3 sm:px-5 py-1.5 sm:py-2 rounded-sm text-[10px] sm:text-xs font-serif shadow-lg border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600 transition-all duration-300 cursor-pointer active:scale-95"
          >
            <svg className="w-2.5 sm:w-3 h-2.5 sm:h-3 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
            <span className="tracking-wide hidden sm:inline">横にスクロールして記憶を巡る</span>
            <span className="tracking-wide sm:hidden">スクロール →</span>
          </button>
        )}
      </main>

      {/* モーダル - レスポンシブ対応 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-7xl max-h-[90vh] w-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 閉じるボタン */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm border border-slate-600 text-white hover:bg-slate-800 transition-colors duration-300 rounded-full shadow-lg text-sm sm:text-base"
            >
              ✕
            </button>

            {/* 画像本体 - 実際のサイズで表示 */}
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage.base64}
                alt="Memory detail"
                className="max-w-full max-h-full object-contain shadow-2xl"
              />
            </div>

            {/* 情報パネル - 下部、レスポンシブ */}
            <div className="mt-2 sm:mt-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 px-3 sm:px-6 py-2 sm:py-4 rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4">
                <div className="text-center md:text-left">
                  <h3 className="text-sm sm:text-lg font-serif text-slate-200 font-semibold mb-0.5 sm:mb-1">
                    {new Date(selectedImage.datetime).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long',
                    })}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-serif">
                    {new Date(selectedImage.datetime).toLocaleTimeString('ja-JP', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    {' '}・{' '}
                    {selectedImage.position.lat.toFixed(4)}°N, {selectedImage.position.lng.toFixed(4)}°E
                  </p>
                </div>
                
                <button
                  onClick={() => handleDelete(selectedImage.id)}
                  className="px-4 sm:px-6 py-1.5 sm:py-2 bg-red-900/30 border border-red-700 text-red-400 font-serif text-xs sm:text-sm hover:bg-red-900/50 hover:text-red-300 transition-colors duration-300 rounded whitespace-nowrap"
                >
                  記憶を消去
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
