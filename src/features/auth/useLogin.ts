import { useState } from "react";
import { pb } from "@/lib/pocketbase";

type UseLoginOptions = {
  onSuccess: () => void;
};

export function useLogin({ onSuccess }: UseLoginOptions) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    try {
      await pb.collection("users").authWithPassword(email, password);
      onSuccess();
    } catch {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setIsPending(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isPending,
    handleSubmit,
  };
}
