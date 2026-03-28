export function normalizeError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Ha ocurrido un error inesperado.";
}

export function getAuthError(code: string | undefined): string {
  switch (code) {
    case "invalid_credentials":
      return "Credenciales incorrectas. Verifica tu correo y contraseña.";
    case "email_already_exists":
    case "user_already_exists":
      return "Ya existe una cuenta con este correo electrónico.";
    case "weak_password":
      return "La contraseña debe tener al menos 6 caracteres.";
    case "email_not_confirmed":
      return "Por favor confirma tu correo antes de iniciar sesión.";
    default:
      return "Ocurrió un error. Inténtalo de nuevo.";
  }
}
