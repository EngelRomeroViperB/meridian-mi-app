"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createClient } from "@/lib/supabase/client";
import { getAuthError } from "@/lib/utils/error";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres")
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginInput) {
    setServerError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password
    });
    if (error) {
      setServerError(getAuthError(error.code));
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Bienvenido</h1>
        <p className="mt-1 text-sm text-zinc-400">Inicia sesión en tu cuenta</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-zinc-300">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="tucorreo@ejemplo.com"
            className="w-full rounded-xl border border-zinc-700 bg-surface px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-accent focus:outline-none"
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-zinc-300">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-zinc-700 bg-surface px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-accent focus:outline-none"
            {...register("password")}
          />
          {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
        </div>

        {serverError && (
          <p className="rounded-xl border border-red-800 bg-red-950/50 px-3 py-2 text-sm text-red-400">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-xl bg-accent py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="font-medium text-accent hover:underline">
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}
