-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS submissions_id_seq;

-- Table Definition
CREATE TABLE "public"."submissions" (
    "id" int4 NOT NULL DEFAULT nextval('submissions_id_seq'::regclass),
    "quiz_id" int4 NOT NULL,
    "user_id" uuid,
    "score" int4,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_submission_quiz" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_submission_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL,
    PRIMARY KEY ("id")
);