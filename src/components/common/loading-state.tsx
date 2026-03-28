export function LoadingState({ message = "Cargando..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-zinc-500">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-accent" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
