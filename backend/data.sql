-- Table: public.shoes

-- DROP TABLE IF EXISTS public.shoes;

CREATE TABLE IF NOT EXISTS public.shoes
(
    id integer NOT NULL DEFAULT nextval('shoes_id_seq'::regclass),
    name character varying(30) COLLATE pg_catalog."default",
    thumbnail character varying COLLATE pg_catalog."default",
    releasedate character varying COLLATE pg_catalog."default",
    asks jsonb,
    bids jsonb,
    lastsales jsonb,
    sizes text[] COLLATE pg_catalog."default",
    CONSTRAINT shoes_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.shoes
    OWNER to postgres;