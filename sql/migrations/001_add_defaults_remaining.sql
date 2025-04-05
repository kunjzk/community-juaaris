-- Description: Add defaults_remaining column to juaaris table
-- Migration: 001_add_defaults_remaining.sql
-- Date: 2024-04-05

-- Up (changes to apply)
ALTER TABLE juaaris
ADD COLUMN defaults_remaining INTEGER NOT NULL DEFAULT 5;

-- Down (how to reverse this change)
ALTER TABLE juaaris
DROP COLUMN defaults_remaining; 