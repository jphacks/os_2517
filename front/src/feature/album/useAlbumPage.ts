import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getAllImages, deleteImage } from '@/lib/album';
import { GeneratedImage } from '@/types';

interface ImageDimensions {
  width: number;
  height: number;
}

export function useAlbumPage() {
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
      const hasHorizontalScroll = container.scrollWidth > container.clientWidth;
      if (!hasHorizontalScroll) return;

      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [images]);

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
    if (!confirm('この記憶を削除しますか?')) return;
    
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

  const handleScrollToNext = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
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
      return { width: 'clamp(300px, 80vw, 450px)', height: 'clamp(300px, 80vw, 450px)' };
    }

    const aspectRatio = dims.width / dims.height;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 640;
    const isMobile = screenWidth < 640;
    
    const maxHeightPx = isMobile ? (typeof window !== 'undefined' ? window.innerHeight - 200 : 500) : (typeof window !== 'undefined' ? window.innerHeight - 160 : 600);
    
    if (aspectRatio > 1) {
      const width = Math.min(maxHeightPx * aspectRatio, isMobile ? 350 : 550);
      return {
        width: `${width}px`,
        height: `${width / aspectRatio}px`
      };
    } else if (aspectRatio < 1) {
      const height = Math.min(maxHeightPx, 700);
      return {
        width: `${height * aspectRatio}px`,
        height: `${height}px`
      };
    } else {
      const size = Math.min(maxHeightPx, isMobile ? 350 : 450);
      return {
        width: `${size}px`,
        height: `${size}px`
      };
    }
  };

  return {
    images,
    selectedImage,
    isLoading,
    scrollContainerRef,
    setSelectedImage,
    handleDelete,
    handleBackToHome,
    handleScrollToNext,
    getFrameSize,
  };
}
