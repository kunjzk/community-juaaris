# Database Migrations

This directory contains database migrations for the Community Juaaris project.

## Migration Status

| Migration File                   | Applied Date | Description                                             |
| -------------------------------- | ------------ | ------------------------------------------------------- |
| init.sql                         | YYYY-MM-DD   | Initial schema creation                                 |
| 001_add_defaults_remaining.sql   | YYYY-MM-DD   | Add defaults_remaining column to juaaris table          |
| 002_change_gameplay_rules_pk.sql | YYYY-MM-DD   | Change gameplay_rules primary key from UUID to datetime |

## How to Apply Migrations

1. Connect to NeonDB console
2. Copy the migration SQL
3. Run the SQL statements
4. Update this README with the applied date
5. Commit the changes

## Example Migration

Here's an example of how to write a migration:

```sql
-- Description: Add email field to juaaris table
-- Migration: 001_add_email.sql

-- Up (changes to apply)
ALTER TABLE juaaris
ADD COLUMN email VARCHAR(255);

-- Down (how to reverse this change)
ALTER TABLE juaaris
DROP COLUMN email;
```

## Best Practices

1. Always include both "Up" and "Down" migrations
2. Number migrations sequentially (001, 002, etc.)
3. Use descriptive file names
4. Test migrations on a development database first
5. Back up production data before applying migrations
6. Update this README after applying each migration
