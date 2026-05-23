import { useQuery } from "@tanstack/react-query";
import { setsQuery } from "../../lib/tcgdex";

type Props = {
  value: string;
  onChange: (setId: string) => void;
};

export function SetSelector({ value, onChange }: Props) {
  const { data: sets, isLoading, isError } = useQuery(setsQuery);

  if (isLoading) return <p>Loading sets…</p>;
  if (isError) return <p>Failed to load sets.</p>;
  if (!sets || sets.length === 0) return <p>No sets available.</p>;

  return (
    <label>
      Set
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {sets.map((set) => (
          <option key={set.id} value={set.id}>
            {set.name}
          </option>
        ))}
      </select>
    </label>
  );
}
