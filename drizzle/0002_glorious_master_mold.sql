CREATE TABLE media_cloudinary_migration (
  id text PRIMARY KEY NOT NULL,
  name text NOT NULL,
  alt text NOT NULL,
  data blob,
  url text,
  public_id text,
  size integer NOT NULL,
  width integer NOT NULL,
  height integer NOT NULL,
  created_at integer NOT NULL,
  created_by text REFERENCES user(id)
);
--> statement-breakpoint
INSERT INTO media_cloudinary_migration (id, name, alt, data, size, width, height, created_at, created_by)
SELECT id, name, alt, data, size, width, height, created_at, created_by FROM media;
--> statement-breakpoint
DROP TABLE media;
--> statement-breakpoint
ALTER TABLE media_cloudinary_migration RENAME TO media;
