import { ReactNode } from 'react';

interface ActionButtonProps {
  onClick: () => void;
  title: string;
  description: string;
  icon: ReactNode;
  colorScheme: 'sky' | 'amber';
}

/**
 * アクションボタンコンポーネント
 */
export function ActionButton({ onClick, title, description, icon, colorScheme }: ActionButtonProps) {
  const colors = {
    sky: {
      bg: 'from-sky-300 to-cyan-400',
      text: 'text-sky-900',
      descText: 'text-sky-800/70',
      shadow: 'shadow-sky-200/40 hover:shadow-sky-300/60',
      ring: 'focus:ring-sky-300/40',
    },
    amber: {
      bg: 'from-amber-200 to-amber-300',
      text: 'text-amber-900',
      descText: 'text-amber-800/70',
      shadow: 'shadow-amber-200/40 hover:shadow-amber-300/60',
      ring: 'focus:ring-amber-300/40',
    },
  };

  const scheme = colors[colorScheme];

  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden py-5 sm:py-7 px-5 sm:px-7 rounded-2xl bg-gradient-to-br ${scheme.bg} ${scheme.text} font-semibold text-base sm:text-lg shadow-lg ${scheme.shadow} transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 ${scheme.ring}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative flex flex-col items-center gap-2 sm:gap-3">
        {icon}
        <div>
          <div className="text-lg sm:text-xl font-bold mb-1">{title}</div>
          <div className={`text-xs sm:text-sm ${scheme.descText}`}>{description}</div>
        </div>
      </div>
    </button>
  );
}
