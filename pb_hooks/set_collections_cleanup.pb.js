/// <reference path="../pb_data/types.d.ts" />

// Before returning the set_collections list, delete any record that has
// no associated card_entries. This handles the edge case where the user
// closed the app before the on-leave cleanup could run.
onRecordListRequest((e) => {
  try {
    const collections = e.app.findAllRecords("set_collections");
    for (const record of collections) {
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
    }
  } catch (err) {
    // biome-ignore  lint/suspicious/noConsole: Log but never propagate — cleanup must not block the list response
    console.error("set_collections cleanup failed:", err);
  }
  e.next();
}, "set_collections");
