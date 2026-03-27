-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS submission_answers_id_seq;

-- Table Definition
CREATE TABLE "public"."submission_answers" (
    "id" int4 NOT NULL DEFAULT nextval('submission_answers_id_seq'::regclass),
    "submission_id" int4 NOT NULL,
    "question_id" int4 NOT NULL,
    "option_id" int4 NOT NULL,
    CONSTRAINT "fk_answer_option" FOREIGN KEY ("option_id") REFERENCES "public"."options"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_answer_question" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_answer_submission" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);