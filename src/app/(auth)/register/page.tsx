"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createClient } from "@/lib/supabase/client";
import { getAuthError } from "@/lib/utils/error";

const registerSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirm: z.string().min(6, "Mínimo 6 caracteres")
}).refine((d) => d.password === d.confirm, {
  message: "Las contraseñas no coinciden",
  path: ["confirm"]
});

type RegisterInput = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values: RegisterInput) {
    setServerError(null);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password
    });
    if (error) {
      setServerError(getAuthError(error.code));
      return;
    }
    if (data.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-sm text-center">
        <div className="mb-4 text-4xl">✅</div>
        <h2 className="text-xl font-semibold">Revisa tu correo</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Te enviamos un enlace de confirmación. Una vez que confirmes tu correo podrás iniciar sesión.
        </p>
        <Link href="/login" className="mt-6 inline-block text-sm font-medium text-accent hover:underline">
          Ir al inicio de sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Crear cuenta</h1>
        <p className="mt-1 text-sm text-zinc-400">Empieza a usar Meridian</p>
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
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-zinc-700 bg-surface px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-accent focus:outline-none"
            {...register("password")}
          />
          {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirm" className="text-sm font-medium text-zinc-300">
            Confirmar contraseña
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-zinc-700 bg-surface px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-accent focus:outline-none"
            {...register("confirm")}
          />
          {errors.confirm && <p className="text-xs text-red-400">{errors.confirm.message}</p>}
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
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-medium text-accent hover:underline">
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}
