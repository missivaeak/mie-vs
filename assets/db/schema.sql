DROP TABLE IF EXISTS "image";

CREATE TABLE "image" (
    "image_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "type" VARCHAR(10),
    "source" TEXT
);

CREATE TABLE "place" (
    "place_id" INTEGER AUTOINCREMENT,
    "image_id" INTEGER,

    PRIMARY KEY ("place_id"),
    FOREIGN KEY ("image_id") REFERENCES "image" ("image_id")
)

CREATE TABLE "scene" (
    "scene_id" INTEGER AUTOINCREMENT,
    ""
)