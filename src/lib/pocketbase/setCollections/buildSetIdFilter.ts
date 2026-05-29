// TCGDex set IDs are alphanumeric with optional hyphens/underscores.
// Validating the format here guards against filter injection from crafted URLs.
export function buildSetIdFilter(setId: string): string {
  if (!/^[a-zA-Z0-9_-]+$/.test(setId)) {
    throw new Error(`Invalid setId format: "${setId}"`);
  }
  return `set_id="${setId}"`;
}
