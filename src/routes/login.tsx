import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { LoginForm } from "@/features/auth/LoginForm";
import { useLogin } from "@/features/auth/useLogin";
import { pb } from "@/lib/pocketbase";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    if (pb.authStore.isValid) {
      throw redirect({ to: "/sets" });
    }
  },
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => {
    const redirectValue = search["redirect"];
    return typeof redirectValue === "string" ? { redirect: redirectValue } : {};
  },
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const { redirect: redirectTo } = Route.useSearch();
  const login = useLogin({
    onSuccess: () => router.history.push(redirectTo ?? "/sets"),
  });

  return <LoginForm {...login} />;
}
