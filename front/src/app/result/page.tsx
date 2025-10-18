'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveToAlbum, downloadImage } from '@/lib/album';
import { STORAGE_KEYS, Position, GeneratedImage } from '@/types';

export default function ResultPage() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // セッションストレージから画像データを取得
    const image = sessionStorage.getItem('generated_image');
    if (!image) {
      // 画像がない場合はマップページへ
      router.push('/map');
      return;
    }
    setImageData(image);
  }, [router]);

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
      alert('アルバムに保存しました！');
      
      // アルバムページへ遷移
      router.push('/album');
    } catch (error) {
      console.error('保存エラー:', error);
      alert('保存に失敗しました。');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    if (!imageData) return;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    downloadImage(imageData, `memory-${timestamp}.png`);
  };

  const handleBackToHome = () => {
    // セッションストレージをクリア
    sessionStorage.removeItem('generated_image');
    router.push('/map');
  };

  if (!imageData) {
    return (
      <div className="fixed inset-0 overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <p className="text-white">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-5xl w-full flex flex-col h-full py-4">
        {/* ヘッダー */}
        <div className="text-center mb-4 md:mb-6 animate-fade-in flex-shrink-0">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            記憶が蘇りました
          </h1>
          <p className="text-purple-200 text-sm md:text-base leading-relaxed">
            時を超えて辿り着いた、あの日の情景
          </p>
        </div>

        {/* 画像表示 */}
        <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-4 mb-4 md:mb-6 animate-slide-up flex-1 flex flex-col min-h-0">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
            {/* セピア風のオーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-900/20 pointer-events-none z-10"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageData}
              alt="Generated memory"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {/* 時間の刻印 */}
          <div className="mt-3 text-center text-purple-200 text-xs md:text-sm font-serif flex-shrink-0">
            <p>過去から切り取られた一瞬</p>
          </div>
        </div>

        {/* ボタングループ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 flex-shrink-0">
          {/* アルバムに保存 */}
          <button
            onClick={handleSaveToAlbum}
            disabled={isSaving}
            className="py-3 px-4 rounded-2xl font-semibold text-white text-sm md:text-base
                     bg-gradient-to-r from-purple-500 to-pink-500
                     hover:from-purple-600 hover:to-pink-600
                     disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed
                     transform transition-all duration-300
                     hover:scale-[1.02] hover:shadow-2xl
                     active:scale-[0.98]
                     shadow-lg shadow-purple-500/50"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {isSaving ? '記憶を刻んでいます...' : 'この記憶を胸に刻む'}
            </span>
          </button>

          {/* ダウンロード */}
          <button
            onClick={handleDownload}
            className="py-3 px-4 rounded-2xl font-semibold text-white text-sm md:text-base
                     bg-white/10 backdrop-blur-sm border-2 border-white/20
                     hover:bg-white/20 hover:border-white/30
                     transform transition-all duration-300
                     hover:scale-[1.02]
                     active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              ダウンロード
            </span>
          </button>

          {/* ホームに戻る */}
          <button
            onClick={handleBackToHome}
            className="py-3 px-4 rounded-2xl font-semibold text-white text-sm md:text-base
                     bg-white/5 backdrop-blur-sm border-2 border-white/10
                     hover:bg-white/10 hover:border-white/20
                     transform transition-all duration-300
                     hover:scale-[1.02]
                     active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              別の記憶を探す
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
