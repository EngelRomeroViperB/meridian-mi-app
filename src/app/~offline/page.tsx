import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-4 px-6 py-10">
      <h1 className="text-2xl font-semibold">Sin conexion</h1>
      <p className="text-sm text-zinc-300">Estas viendo una pagina offline cacheada. Cuando vuelva la conexion, podras sincronizar cambios pendientes.</p>
      <Link href="/" className="inline-flex w-fit rounded-xl bg-accent px-4 py-2 text-sm font-medium">
        Reintentar
      </Link>
    </main>
  );
}
