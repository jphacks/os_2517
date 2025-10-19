import { GuideStep } from './GuideStep';

/**
 * 使い方ガイドセクション
 */
export function GuideSection() {
  return (
    <div className="mt-8 sm:mt-12 pt-6 sm:pt-10 border-t border-sky-200/60">
      <h2 className="text-base sm:text-lg font-semibold text-sky-900 mb-5 sm:mb-7">使い方</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto">
        <GuideStep
          number={1}
          title="場所を選ぶ"
          description="地図上で思い出の場所をクリック"
        />
        
        <GuideStep
          number={2}
          title="日時を指定"
          description="その時の日時を選択"
        />
        
        <GuideStep
          number={3}
          title="額縁に飾る"
          description="復元した風景をギャラリーに保存"
          colorScheme="amber"
        />
      </div>
    </div>
  );
}
