import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SetSelector } from "@/features/setSelector/SetSelector";

export const Route = createFileRoute("/sets/")({
  component: SetsPage,
});

function SetsPage() {
  const navigate = useNavigate();
  return (
    <SetSelector
      value=""
      onChange={(setId) => navigate({ to: "/sets/$setId", params: { setId } })}
    />
  );
}
