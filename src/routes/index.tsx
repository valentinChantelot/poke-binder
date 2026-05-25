import { createFileRoute, redirect } from "@tanstack/react-router";
import { pb } from "@/lib/pocketbase";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (pb.authStore.isValid) {
      throw redirect({ to: "/sets" });
    }
    throw redirect({ to: "/login" });
  },
});
