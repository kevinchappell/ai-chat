export const TypingIndicator = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-3 h-3 bg-slate-300 rounded-full animate-[bounce_1s_ease-in-out_infinite] mr-1"></div>
      <div className="w-3 h-3 bg-slate-300 rounded-full animate-[bounce_1s_250ms_ease-in-out_infinite] mr-1"></div>
      <div className="w-3 h-3 bg-slate-300 rounded-full animate-[bounce_1s_500ms_ease-in-out_infinite]"></div>
    </div>
  );
}
