/// <reference path="../pb_data/types.d.ts" />

// Before returning the set_collections list, delete any record that has
// no associated card_entries. This handles the edge case where the user
// closed the app before the on-leave cleanup could run.
onRecordListRequest((e) => {
  try {
    const collections = e.app.findAllRecords("set_collections");
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
  } catch (err) {
    // biome-ignore lint/suspicious/noConsole: server-side hook logging
    console.error("set_collections cleanup: failed to fetch collections:", err);
  }
  e.next();
}, "set_collections");
