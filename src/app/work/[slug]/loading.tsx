export default function ProjectLoading() {
  return (
    <div className="fixed inset-0 z-[3000] bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-10 h-10 border-2 border-white/10 border-t-[#00FF41] rounded-full animate-spin" />
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.5em]">
          Project
        </span>
      </div>
    </div>
  );
}
