-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS options_id_seq;

-- Table Definition
CREATE TABLE "public"."options" (
    "id" int4 NOT NULL DEFAULT nextval('options_id_seq'::regclass),
    "question_id" int4 NOT NULL,
    "text" varchar(255) NOT NULL,
    "is_correct" bool NOT NULL DEFAULT false,
    CONSTRAINT "options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);