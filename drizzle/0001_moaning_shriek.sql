ALTER TABLE `content` ADD `published_position` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
UPDATE content SET published_position = position WHERE published IS NOT NULL;
