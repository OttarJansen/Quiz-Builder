-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS questions_id_seq;

-- Table Definition
CREATE TABLE "public"."questions" (
    "id" int4 NOT NULL DEFAULT nextval('questions_id_seq'::regclass),
    "test_id" int4 NOT NULL,
    "text" text NOT NULL,
    CONSTRAINT "questions_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "public"."tests"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);