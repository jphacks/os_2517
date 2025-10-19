/**
 * 次のステップへの案内メッセージ
 */
export function NextStepHint() {
  return (
    <div className="mt-4 sm:mt-6 text-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
      <p className="text-xs sm:text-sm text-sky-600 italic">
        📍 場所が決まったら、次は時の針を巻き戻しましょう
      </p>
    </div>
  );
}
