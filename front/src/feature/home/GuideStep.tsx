interface GuideStepProps {
  number: number;
  title: string;
  description: string;
  colorScheme?: 'sky' | 'amber';
}

/**
 * 使い方ガイドの個別ステップ
 */
export function GuideStep({ number, title, description, colorScheme = 'sky' }: GuideStepProps) {
  const bgColor = colorScheme === 'sky' ? 'bg-sky-200/50' : 'bg-amber-200/50';
  const textColor = colorScheme === 'sky' ? 'text-sky-700' : 'text-amber-700';
  const borderColor = colorScheme === 'sky' ? 'border-sky-200/40' : 'border-amber-200/40';

  return (
    <div className={`bg-white/40 backdrop-blur-sm rounded-xl p-4 sm:p-5 border ${borderColor} shadow-sm`}>
      <div className={`w-11 h-11 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full ${bgColor} flex items-center justify-center`}>
        <span className={`text-xl sm:text-2xl font-bold ${textColor}`}>{number}</span>
      </div>
      <h3 className="text-sm sm:text-base font-semibold text-sky-900 mb-1 sm:mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-sky-700/70">{description}</p>
    </div>
  );
}
