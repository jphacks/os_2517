import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveToAlbum, downloadImage } from '@/lib/album';
import { STORAGE_KEYS, Position, GeneratedImage } from '@/types';

/**
 * 結果ページのロジックを管理するカスタムフック
 */
export function useResultPage() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  // 画像データの初期化
  useEffect(() => {
    const image = sessionStorage.getItem('generated_image');
    if (!image) {
      router.push('/map');
      return;
    }
    setImageData(image);
  }, [router]);

  // アルバムに保存
  const handleSaveToAlbum = async () => {
    if (!imageData) return;

    try {
      setIsSaving(true);

      const positionStr = sessionStorage.getItem(STORAGE_KEYS.MAP_POSITION);
      const datetime = sessionStorage.getItem(STORAGE_KEYS.DATETIME);

      if (!positionStr || !datetime) {
        throw new Error('位置情報または日時が見つかりません');
      }

      const position: Position = JSON.parse(positionStr);

      const image: GeneratedImage = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        base64: imageData,
        position,
        datetime,
        createdAt: new Date().toISOString(),
      };

      await saveToAlbum(image);
      alert('ギャラリーに飾りました!');
      
      router.push('/album');
    } catch (error) {
      console.error('保存エラー:', error);
      alert('保存に失敗しました。');
    } finally {
      setIsSaving(false);
    }
  };

  // ダウンロード
  const handleDownload = () => {
    if (!imageData) return;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    downloadImage(imageData, `memory-${timestamp}.png`);
  };

  // ホームに戻る
  const handleBackToHome = () => {
    sessionStorage.removeItem('generated_image');
    router.push('/');
  };

  return {
    imageData,
    isSaving,
    handleSaveToAlbum,
    handleDownload,
    handleBackToHome,
  };
}
