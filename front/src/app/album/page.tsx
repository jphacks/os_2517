'use client';

import { useAlbumPage } from '@/feature/album/useAlbumPage';
import { AlbumBackground } from '@/feature/album/AlbumBackground';
import { AlbumHeader } from '@/feature/album/AlbumHeader';
import { LoadingScreen } from '@/feature/album/LoadingScreen';
import { EmptyState } from '@/feature/album/EmptyState';
import { GalleryItem } from '@/feature/album/GalleryItem';
import { ScrollHint } from '@/feature/album/ScrollHint';
import { ImageModal } from '@/feature/album/ImageModal';

export default function AlbumPage() {
  const {
    images,
    selectedImage,
    isLoading,
    scrollContainerRef,
    setSelectedImage,
    handleDelete,
    handleBackToHome,
    handleScrollToNext,
    getFrameSize,
  } = useAlbumPage();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 flex flex-col">
      <AlbumBackground />
      
      <AlbumHeader imageCount={images.length} onBackToHome={handleBackToHome} />

      <main className="flex-1 overflow-hidden relative">
        {images.length === 0 ? (
          <EmptyState onBackToHome={handleBackToHome} />
        ) : (
          <div
            ref={scrollContainerRef}
            className="h-full overflow-x-auto overflow-y-hidden scrollbar-hide relative scroll-snap-x-mandatory"
            style={{ 
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory'
            }}
          >
            <div className="h-full flex items-center" style={{ 
              width: 'max-content',
              paddingLeft: 'clamp(calc(50vw - 150px), calc(50vw - 150px), calc(50vw - 225px))',
              paddingRight: 'clamp(calc(50vw - 150px), calc(50vw - 150px), calc(50vw - 225px))',
              gap: 'clamp(calc(300px * 0.8), 10vw, calc(450px * 0.9))'
            }}>
              {images.map((image, index) => (
                <GalleryItem
                  key={image.id}
                  image={image}
                  index={index}
                  frameSize={getFrameSize(image.id)}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>
        )}

        {images.length > 0 && (
          <ScrollHint onClick={handleScrollToNext} />
        )}
      </main>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
