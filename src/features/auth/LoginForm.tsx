import type { useLogin } from "./useLogin";

type Props = ReturnType<typeof useLogin>;

export function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  error,
  isPending,
  handleSubmit,
}: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </label>
      <label>
        Mot de passe
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </label>
      {error !== null && <p role="alert">{error}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
