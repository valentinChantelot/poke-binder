export function buildSetIdFilter(setId: string): string {
  return `set_id="${setId.replace(/"/g, "")}"`;
}
