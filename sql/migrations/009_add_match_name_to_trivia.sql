-- Description: Add match_name column to trivia table
-- Migration: 007_add_match_name_to_trivia.sql
-- Date: 2024-04-05

-- Up (changes to apply)
ALTER TABLE trivia
ADD COLUMN match_name TEXT;

-- Down (how to reverse this change)
ALTER TABLE trivia
DROP COLUMN match_name; 