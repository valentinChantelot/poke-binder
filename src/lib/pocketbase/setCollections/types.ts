import type { RecordModel } from "pocketbase";

export type SetCollection = RecordModel & {
  // biome-ignore lint/style/useNamingConvention: PocketBase field name
  set_id: string;
};
