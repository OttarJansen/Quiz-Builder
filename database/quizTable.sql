-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tests_id_seq;

-- Table Definition
CREATE TABLE "public"."tests" (
    "id" int4 NOT NULL DEFAULT nextval('tests_id_seq'::regclass),
    "title" varchar(255) NOT NULL,
    PRIMARY KEY ("id")
);