/// <reference path="../pb_data/types.d.ts" />

// Lazy cleanup: before returning a set_collections list, remove any record
// that has no associated card_entries. This is the sole cleanup mechanism —
// empty collections are safe to hold temporarily but must not appear in the UI.
onRecordsListRequest((e) => {
  let collections;
  try {
    collections = e.app.findAllRecords("set_collections");
  } catch (err) {
    // biome-ignore lint/suspicious/noConsole: server-side hook logging
    console.error("set_collections cleanup: failed to fetch collections:", err);
    e.next();
    return;
  }

  // One existence-check query per collection (N+1). Intentional: each query
  // uses limit=1, local SQLite makes per-query overhead negligible, and N is
  // bounded by the number of TCGDex sets a single user can open (~200 max).
  for (const record of collections) {
    try {
      const setId = record.getString("set_id");
      const entries = e.app.findRecordsByFilter(
        "card_entries",
        "set_id = {:setId}",
        "",
        1,
        0,
        { setId },
      );
      if (entries.length === 0) {
        e.app.delete(record);
      }
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: server-side hook logging
      console.error(
        "set_collections cleanup: failed for record",
        record.getId(),
        err,
      );
    }
  }

  e.next();
}, "set_collections");
