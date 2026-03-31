// app/loading.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="relative">
        {/* Outer pulse */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        {/* Inner glow */}
        <div className="relative w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
      </div>
      <div className="absolute bottom-10 animate-pulse text-[10px] uppercase tracking-[0.5em] font-bold text-muted-foreground mr-[-0.5em]">
        Loading Innovation
      </div>
    </div>
  );
}
