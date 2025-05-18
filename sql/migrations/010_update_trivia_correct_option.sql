-- Description: Update trivia table to include 'X' as a valid correct_option
-- Migration: 010_update_trivia_correct_option.sql
-- Date: 2024-04-14

-- Up (changes to apply)
ALTER TABLE trivia
ALTER COLUMN correct_option TYPE CHAR(1) USING correct_option::CHAR(1);

ALTER TABLE trivia
ADD CONSTRAINT trivia_correct_option_check 
CHECK (correct_option IN ('A', 'B', 'C', 'D', 'X'));

-- Down (how to reverse this change)
ALTER TABLE trivia
DROP CONSTRAINT IF EXISTS trivia_correct_option_check;

ALTER TABLE trivia
ALTER COLUMN correct_option TYPE CHAR(1) USING correct_option::CHAR(1);

ALTER TABLE trivia
ADD CONSTRAINT trivia_correct_option_check 
CHECK (correct_option IN ('A', 'B', 'C', 'D')); 