-- Table Definition
CREATE TABLE "public"."users" (
    "id" uuid NOT NULL,
    "username" text NOT NULL,
    "consent" bool NOT NULL,
    "hashedpassword" text NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);