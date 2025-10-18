'use client';

import { useResultPage } from '@/feature/result/useResultPage';
import { LoadingScreen } from '@/feature/result/LoadingScreen';
import { ResultHeader } from '@/feature/result/ResultHeader';
import { ImageDisplay } from '@/feature/result/ImageDisplay';
import { ActionButtons } from '@/feature/result/ActionButtons';

/**
 * 生成された画像を表示する結果ページ
 */
export default function ResultPage() {
  const {
    imageData,
    isSaving,
    handleSaveToAlbum,
    handleDownload,
    handleBackToHome,
  } = useResultPage();

  if (!imageData) {
    return <LoadingScreen />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-5xl w-full flex flex-col h-full py-4">
        <ResultHeader />
        <ImageDisplay imageData={imageData} />
        <ActionButtons
          isSaving={isSaving}
          onSaveToAlbum={handleSaveToAlbum}
          onDownload={handleDownload}
          onBackToHome={handleBackToHome}
        />
      </div>
    </div>
  );
}
