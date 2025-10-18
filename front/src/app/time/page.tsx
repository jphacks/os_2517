'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatedBackground } from '@/feature/time/AnimatedBackground';
import { GlassCard } from '@/feature/time/GlassCard';
import { TimePageHeader } from '@/feature/time/TimePageHeader';
import { DateTimeInput } from '@/feature/time/DateTimeInput';
import { ConfirmButton } from '@/feature/time/ConfirmButton';
import { SkeletonClockLoader } from '@/components/SkeletonClockLoader';
import { generateImage } from '@/lib/api';
import { STORAGE_KEYS, Position } from '@/types';

export default function TimePage() {
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    if (!selectedDateTime) return;

    // セッションストレージから位置情報を取得
    const positionStr = sessionStorage.getItem(STORAGE_KEYS.MAP_POSITION);
    if (!positionStr) {
      alert('位置情報が選択されていません。マップページから選択してください。');
      router.push('/map');
      return;
    }

    const position: Position = JSON.parse(positionStr);

    // 日時をセッションストレージに保存
    sessionStorage.setItem(STORAGE_KEYS.DATETIME, selectedDateTime);

    try {
      setIsLoading(true);

      // 🚧 API呼び出し（モック実装）
      const base64Image = await generateImage(position, selectedDateTime);

      // 結果をセッションストレージに保存
      sessionStorage.setItem('generated_image', base64Image);

      // 結果ページへ遷移
      router.push('/result');
    } catch (error) {
      console.error('画像生成エラー:', error);
      alert('画像の生成に失敗しました。もう一度お試しください。');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SkeletonClockLoader />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 p-4">
      <AnimatedBackground />

      <GlassCard>
        <div className="space-y-6 sm:space-y-8">
          <TimePageHeader />
          <DateTimeInput 
            value={selectedDateTime}
            onChange={setSelectedDateTime}
          />
          <ConfirmButton 
            onClick={handleConfirm}
            disabled={!selectedDateTime}
          />
        </div>
      </GlassCard>
    </div>
  );
}
