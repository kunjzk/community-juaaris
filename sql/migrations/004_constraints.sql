-- Edit the valid more or less constraint to include the 'INVALID' value

-- Drop the existing constraint
ALTER TABLE matches DROP CONSTRAINT valid_more_or_less;

-- Add the new constraint
ALTER TABLE matches ADD CONSTRAINT valid_more_or_less CHECK (outcome_more_or_less IN ('MORE', 'LESS', 'INVALID'));