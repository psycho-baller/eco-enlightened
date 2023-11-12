CREATE DATABASE eco_enlightened;
CREATE DATABASE celery_schedule_jobs;
CREATE EXTENSION vector;

-- CREATE TABLE IF NOT EXISTS embeddings (
--   id SERIAL PRIMARY KEY,
--   embedding vector,
--   text text,
--   created_at timestamptz DEFAULT now()
-- );