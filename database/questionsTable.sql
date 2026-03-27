-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS questions_id_seq;

-- Table Definition
CREATE TABLE "public"."questions" (
    "id" int4 NOT NULL DEFAULT nextval('questions_id_seq'::regclass),
    "quiz_id" int4 NOT NULL,
    "text" text NOT NULL,
    "position" int4 DEFAULT 0,
    CONSTRAINT "fk_question_quiz" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);