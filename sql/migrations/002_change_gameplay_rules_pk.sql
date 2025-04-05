-- Description: Change gameplay_rules primary key from UUID to datetime
-- Migration: 002_change_gameplay_rules_pk.sql
-- Date: 2024-04-05

-- Up (changes to apply)
-- First, create new table with desired structure
CREATE TABLE gameplay_rules_new (
    effective_from TIMESTAMP WITH TIME ZONE PRIMARY KEY,
    days_in_advance_for_bet INTEGER NOT NULL,
    max_defaults INTEGER NOT NULL,
    second_dimension_cutoff INTEGER NOT NULL,
    last_bet_cutoff_hours INTEGER NOT NULL
);

-- Copy data if exists (converting old primary key to current timestamp)
INSERT INTO gameplay_rules_new (
    effective_from,
    days_in_advance_for_bet,
    max_defaults,
    second_dimension_cutoff,
    last_bet_cutoff_hours
)
SELECT 
    CURRENT_TIMESTAMP,
    days_in_advance_for_bet,
    max_defaults,
    second_dimension_cutoff,
    last_bet_cutoff_hours
FROM gameplay_rules;

-- Drop old table
DROP TABLE gameplay_rules;

-- Rename new table to original name
ALTER TABLE gameplay_rules_new RENAME TO gameplay_rules;

-- Down (how to reverse this change)
-- First, create table with old structure
CREATE TABLE gameplay_rules_old (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    days_in_advance_for_bet INTEGER NOT NULL,
    max_defaults INTEGER NOT NULL,
    second_dimension_cutoff INTEGER NOT NULL,
    last_bet_cutoff_hours INTEGER NOT NULL
);

-- Copy data back (generating new UUIDs)
INSERT INTO gameplay_rules_old (
    days_in_advance_for_bet,
    max_defaults,
    second_dimension_cutoff,
    last_bet_cutoff_hours
)
SELECT 
    days_in_advance_for_bet,
    max_defaults,
    second_dimension_cutoff,
    last_bet_cutoff_hours
FROM gameplay_rules;

-- Drop new table
DROP TABLE gameplay_rules;

-- Rename old table back to original name
ALTER TABLE gameplay_rules_old RENAME TO gameplay_rules; 