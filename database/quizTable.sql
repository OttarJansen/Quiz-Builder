-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS quizzes_id_seq;

-- Table Definition
CREATE TABLE "public"."quizzes" (
    "id" int4 NOT NULL DEFAULT nextval('quizzes_id_seq'::regclass),
    "title" varchar(255) NOT NULL,
    "user_id" uuid NOT NULL,
    "is_public" bool DEFAULT true,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_quiz_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);