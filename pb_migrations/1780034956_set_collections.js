/// <reference path="../pb_data/types.d.ts" />

migrate(
  // UP
  (db) => {
    const collection = new Collection({
      name: "set_collections",
      type: "base",
      system: false,

      fields: [
        {
          name: "set_id",
          type: "text",
          required: true,
          options: {
            min: 1,
            max: 64,
            pattern: "",
          },
        },
      ],

      indexes: [
        "CREATE UNIQUE INDEX `idx_set_collections_set_id` ON `set_collections` (`set_id`)",
      ],

      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: null,
      deleteRule: "@request.auth.id != ''",
    });

    return db.save(collection);
  },

  // DOWN
  (db) => {
    const collection = db.findCollectionByNameOrId("set_collections");
    return db.delete(collection);
  },
);
