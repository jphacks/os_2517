import { useRouter } from 'next/navigation';
import { ActionButton } from './ActionButton';

/**
 * アクションボタンセクション
 */
export function ActionButtons() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-2xl mx-auto px-4 pt-2 sm:pt-4">
      <ActionButton
        onClick={() => router.push('/map')}
        title="思い出を探す"
        description="場所と時間を指定して風景を復元"
        colorScheme="sky"
        icon={
          <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
      />

      <ActionButton
        onClick={() => router.push('/album')}
        title="ギャラリーを見る"
        description="保存した風景を鑑賞する"
        colorScheme="amber"
        icon={
          <svg className="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
      />
    </div>
  );
}
