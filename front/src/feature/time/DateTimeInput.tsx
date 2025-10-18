interface DateTimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * グラスモーフィズムスタイルの日時入力フィールド - レスポンシブ対応
 */
export function DateTimeInput({ value, onChange }: DateTimeInputProps) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <label htmlFor="datetime" className="block text-[11px] sm:text-xs md:text-sm font-medium text-purple-200">
        日時を選択
      </label>
      <div className="relative">
        <input
          type="datetime-local"
          id="datetime"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-4 
                   text-[13px] sm:text-sm md:text-base
                   bg-white/5 backdrop-blur-sm 
                   border-2 border-white/20 
                   rounded-lg sm:rounded-xl md:rounded-2xl 
                   text-white placeholder-white/40
                   focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                   transition-all duration-300
                   hover:bg-white/10 hover:border-white/30
                   [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100
                   [&::-webkit-datetime-edit-fields-wrapper]:text-white
                   [&::-webkit-datetime-edit-text]:text-white/60
                   [&::-webkit-datetime-edit-month-field]:text-white
                   [&::-webkit-datetime-edit-day-field]:text-white
                   [&::-webkit-datetime-edit-year-field]:text-white
                   [&::-webkit-datetime-edit-hour-field]:text-white
                   [&::-webkit-datetime-edit-minute-field]:text-white"
          style={{
            colorScheme: 'dark'
          }}
        />
        {/* 入力フィールドの装飾 */}
        <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>
      </div>
      <p className="text-[10px] sm:text-xs text-purple-300/70 mt-1">
        過去の日時を選択してください
      </p>
    </div>
  );
}
