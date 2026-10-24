-- Grant folder access only to built-in roles that still have the equivalent recap permission.
UPDATE roles SET permissions = json_insert(permissions, '$[#]', 'albums.write'), version = version + 1
WHERE built_in = 1 AND id IN ('owner', 'administrator', 'editor')
AND EXISTS (SELECT 1 FROM json_each(roles.permissions) WHERE value = 'recaps.write')
AND NOT EXISTS (SELECT 1 FROM json_each(roles.permissions) WHERE value = 'albums.write');
--> statement-breakpoint
UPDATE roles SET permissions = json_insert(permissions, '$[#]', 'albums.publish'), version = version + 1
WHERE built_in = 1 AND id IN ('owner', 'administrator')
AND EXISTS (SELECT 1 FROM json_each(roles.permissions) WHERE value = 'recaps.publish')
AND NOT EXISTS (SELECT 1 FROM json_each(roles.permissions) WHERE value = 'albums.publish');
