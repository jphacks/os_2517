interface DateTimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * グラスモーフィズムスタイルの日時入力フィールド - レスポンシブ対応 + フォーカス状態強化
 */
export function DateTimeInput({ value, onChange }: DateTimeInputProps) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <label htmlFor="datetime" className="block text-[11px] sm:text-xs md:text-sm font-medium text-sky-700">
        いつの記憶を呼び覚ましますか
      </label>
      <div className="relative">
        <input
          type="datetime-local"
          id="datetime"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-4 
                   text-[13px] sm:text-sm md:text-base
                   bg-white/70 backdrop-blur-sm 
                   border-2 border-sky-200 
                   rounded-lg sm:rounded-xl md:rounded-2xl 
                   text-sky-900 placeholder-sky-400
                   focus:outline-none focus:ring-4 focus:ring-sky-400/50 focus:border-sky-400
                   transition-all duration-300
                   hover:bg-white hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/10
                   [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:transition-opacity
                   [&::-webkit-datetime-edit-fields-wrapper]:text-sky-900
                   [&::-webkit-datetime-edit-text]:text-sky-600
                   [&::-webkit-datetime-edit-month-field]:text-sky-900
                   [&::-webkit-datetime-edit-day-field]:text-sky-900
                   [&::-webkit-datetime-edit-year-field]:text-sky-900
                   [&::-webkit-datetime-edit-hour-field]:text-sky-900
                   [&::-webkit-datetime-edit-minute-field]:text-sky-900"
          style={{
            colorScheme: 'light'
          }}
        />
        {/* 入力フィールドの装飾 */}
        <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent"></div>
      </div>
      <p className="text-[10px] sm:text-xs text-sky-600 mt-1">
        時の流れから、一瞬を切り取ります
      </p>
    </div>
  );
}
