--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

-- Started on 2023-03-05 20:41:19

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16402)
-- Name: shoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shoes (
    id integer NOT NULL,
    name character varying(30),
    thumbnail character varying,
    releasedate character varying,
    asks jsonb,
    bids jsonb,
    lastsales jsonb,
    sizes text[]
);


ALTER TABLE public.shoes OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16401)
-- Name: shoes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shoes_id_seq OWNER TO postgres;

--
-- TOC entry 3325 (class 0 OID 0)
-- Dependencies: 215
-- Name: shoes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shoes_id_seq OWNED BY public.shoes.id;


--
-- TOC entry 3173 (class 2604 OID 24616)
-- Name: shoes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shoes ALTER COLUMN id SET DEFAULT nextval('public.shoes_id_seq'::regclass);


--
-- TOC entry 3319 (class 0 OID 16402)
-- Dependencies: 216
-- Data for Name: shoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shoes (id, name, thumbnail, releasedate, asks, bids, lastsales, sizes) FROM stdin;
2	NIKE DUNK LOW TRIPLE PINK GS	https://i.imgur.com/9J6Ckgm.png	01.06.2022	[{"id": "1", "size": "5.5Y", "price": 220}, {"id": "2", "size": "4Y", "price": 250}, {"id": "3", "size": "6Y", "price": 255}, {"id": "5", "size": "7Y", "price": 222}]	[{"id": "1", "size": "5.5Y", "price": 180}, {"id": "2", "size": "6.5Y", "price": 22}]	[{"id": "1", "date": "2023-01-16T15:08:01.753Z", "size": "5.5Y", "price": 228}, {"id": "2", "date": "2023-01-16T15:08:01.753Z", "size": "4Y", "price": 221}, {"id": "3", "date": "2023-01-16T15:08:01.753Z", "size": "6Y", "price": 247}]	{3.5Y,4Y,4.5Y,5Y,5.5Y,6Y,6.5Y,7Y}
6	JORDAN 1 LOW CONCORD	https://i.imgur.com/B3ujYuW.png	17.01.2023	[{"id": "1", "size": "8", "price": 220}, {"id": "2", "size": "11", "price": 250}, {"id": "3", "size": "10", "price": 255}]	[{"id": "1", "size": "8US", "price": 180}, {"id": "2", "size": "10US", "price": 22}]	[{"id": "1", "date": "2023-01-16T15:08:01.753Z", "size": "8", "price": 255}, {"id": "2", "date": "2023-01-16T15:08:01.753Z", "size": "11", "price": 321}, {"id": "3", "date": "2023-01-16T15:08:01.753Z", "size": "10", "price": 276}]	{7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12}
9	JORDAN 1 PATENT BRED	https://i.imgur.com/BzVWH8V.png	30.12.2021	[{"id": "1", "size": "8", "price": 220}, {"id": "2", "size": "11", "price": 250}, {"id": "3", "size": "10", "price": 255}]	[{"id": "1", "size": "8US", "price": 180}, {"id": "2", "size": "10US", "price": 22}]	[{"id": "1", "date": "2023-01-16T15:08:01.753Z", "size": "8", "price": 255}, {"id": "2", "date": "2023-01-16T15:08:01.753Z", "size": "11", "price": 321}, {"id": "3", "date": "2023-01-16T15:08:01.753Z", "size": "10", "price": 276}]	{7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12}
3	NIKE DUNK LOW GREY FOG	https://i.imgur.com/v5KZcDl.png	21.09.2021	[{"id": "1", "size": "8", "price": 220}, {"id": "2", "size": "11", "price": 250}, {"id": "3", "size": "10", "price": 255}, {"id": "5980e510-db01-41d6-ac25-9a58f6da879a", "size": "11", "price": 248}]	[{"id": "1", "size": "8US", "price": 180}, {"id": "2", "size": "10US", "price": 22}]	[{"id": "1", "date": "2023-01-16T15:08:01.753Z", "size": "8", "price": 255}, {"id": "2", "date": "2023-01-16T15:08:01.753Z", "size": "11", "price": 321}, {"id": "3", "date": "2023-01-16T15:08:01.753Z", "size": "10", "price": 276}]	{7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12}
4	JORDAN 1 BRED	https://i.imgur.com/4RvPKiQ.png	24.02.2018	[{"id": "1", "size": "8", "price": 220}, {"id": "2", "size": "11", "price": 250}, {"id": "3", "size": "10", "price": 255}]	[{"id": "1", "size": "8US", "price": 180}, {"id": "2", "size": "10US", "price": 22}]	[{"id": "1", "date": "2023-01-16T15:08:01.753Z", "size": "8", "price": 200}, {"id": "2", "date": "2023-01-16T15:08:01.753Z", "size": "11", "price": 211}, {"id": "3", "date": "2023-01-16T15:08:01.753Z", "size": "10", "price": 231}]	{7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12}
10	JORDAN 1 HYPER ROYAL	https://i.imgur.com/Vq2Cz6B.png	17.04.2021	[{"id": "1", "size": "8", "price": 220}, {"id": "2", "size": "11", "price": 250}, {"id": "3", "size": "10", "price": 255}]	[{"id": "1", "size": "8US", "price": 180}, {"id": "2", "size": "10US", "price": 22}]	[{"id": "1", "date": "2023-01-16T15:08:01.753Z", "size": "8", "price": 255}, {"id": "2", "date": "2023-01-16T15:08:01.753Z", "size": "11", "price": 321}, {"id": "3", "date": "2023-01-16T15:08:01.753Z", "size": "10", "price": 276}]	{7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12}
11	NIKE DUNK LOW BLACK WHITE	https://i.imgur.com/0Vydaf6.png	10.03.2021	[{"id": "1", "size": "8", "price": 220}, {"id": "2", "size": "11", "price": 250}, {"id": "3", "size": "10", "price": 255}]	[{"id": "1", "size": "8US", "price": 180}, {"id": "2", "size": "10US", "price": 22}]	[{"id": "1", "date": "2023-01-16T15:08:01.753Z", "size": "8", "price": 255}, {"id": "2", "date": "2023-01-16T15:08:01.753Z", "size": "11", "price": 321}, {"id": "3", "date": "2023-01-16T15:08:01.753Z", "size": "10", "price": 276}]	{7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12}
14	NIKE DUNK LOW FLEECE BLUE	https://i.imgur.com/5YDW1lr.png	24.10.2022	[{"id": "1", "size": "8", "price": 220}, {"id": "2", "size": "11", "price": 250}, {"id": "3", "size": "10", "price": 255}]	[{"id": "1", "size": "8US", "price": 180}, {"id": "2", "size": "10US", "price": 22}]	[{"id": "1", "date": "2023-01-16T15:08:01.753Z", "size": "8", "price": 255}, {"id": "2", "date": "2023-01-16T15:08:01.753Z", "size": "11", "price": 321}, {"id": "3", "date": "2023-01-16T15:08:01.753Z", "size": "10", "price": 276}]	{7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12}
1	JORDAN 1 MOCHA GS	https://i.imgur.com/v6LIvU7.png	31.10.2020	[{"id": "1", "size": "5.5Y", "price": 220}, {"id": "2", "size": "4Y", "price": 250}, {"id": "df239e78-4cec-413f-89cf-251e59efb8c9", "size": "3.5Y", "price": 122}]	[{"id": "", "size": "", "price": null}, {"id": "b6f0ecb5-e656-4a7a-9452-4b193b9406ab", "size": "3.5Y", "price": 122}, {"id": "3b84c39f-964e-480e-847f-614f53f8bb48", "size": "5.5Y", "price": 55}]	[{"id": "1", "date": "2023-01-16T15:08:01.753Z", "size": "5.5Y", "price": 300}, {"id": "2", "date": "2023-01-16T15:08:01.753Z", "size": "4Y", "price": 290}, {"id": "3", "date": "2023-01-16T15:08:01.753Z", "size": "6Y", "price": 225}, {"id": "a604d800-5ddf-4df4-827d-6b552bea12f1", "date": "2023-01-16T15:08:01.753Z", "size": "6Y", "price": 191}, {"id": "589dbcdb-9626-4be4-9eb9-2f352fde4947", "date": "2023-01-16T15:08:01.753Z", "size": "4Y", "price": 190}, {"id": "589dbcdb-9626-4be4-9eb9-2f352fde4947", "date": "2023-01-16T15:08:01.753Z", "size": "4Y", "price": 190}]	{3.5Y,4Y,4.5Y,5Y,5.5Y,6Y,6.5Y,7Y}
5	JORDAN 1 TAXI	https://i.imgur.com/vpyanZM.png	24.09.2022	[{"id": "1", "size": "8", "price": 220}, {"id": "2", "size": "11", "price": 250}, {"id": "3", "size": "10", "price": 255}]	[{"id": "1", "size": "8US", "price": 180}, {"id": "2", "size": "10US", "price": 22}]	[{"id": "1", "date": "2023-01-16T15:08:01.753Z", "size": "5.5Y", "price": 300}, {"id": "2", "date": "2023-01-16T15:08:01.753Z", "size": "4Y", "price": 290}, {"id": "3", "date": "2023-01-16T15:08:01.753Z", "size": "6Y", "price": 225}, {"id": "a604d800-5ddf-4df4-827d-6b552bea12f1", "date": "2023-01-16T15:08:01.753Z", "size": "6Y", "price": 191}, {"id": "589dbcdb-9626-4be4-9eb9-2f352fde4947", "date": "2023-01-16T15:08:01.753Z", "size": "4Y", "price": 190}, {"id": "589dbcdb-9626-4be4-9eb9-2f352fde4947", "date": "2023-01-16T15:08:01.753Z", "size": "4Y", "price": 190}, {"id": "589dbcdb-9626-4be4-9eb9-2f352fde4947", "date": "2023-01-16T15:08:01.753Z", "size": "4Y", "price": 190}, {"id": "589dbcdb-9626-4be4-9eb9-2f352fde4947", "date": "2023-01-16T15:08:01.753Z", "size": "4Y", "price": 190}]	{7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12}
12	NIKE DUNK LOW FUSCHIA GS	https://i.imgur.com/OVpv7Ts.png	14.02.2023	[{"id": "1", "size": "5.5Y", "price": 220}, {"id": "2", "size": "4Y", "price": 250}, {"id": "df239e78-4cec-413f-89cf-251e59efb8c9", "size": "3.5Y", "price": 122}]	[{"id": "1", "size": "5.5Y", "price": 180}, {"id": "2", "size": "6.5Y", "price": 22}]	[{"id": "1", "date": "2023-01-16T15:08:01.753Z", "size": "5.5Y", "price": 228}, {"id": "2", "date": "2023-01-16T15:08:01.753Z", "size": "4Y", "price": 221}, {"id": "3", "date": "2023-01-16T15:08:01.753Z", "size": "6Y", "price": 247}]	{3.5Y,4Y,4.5Y,5Y,5.5Y,6Y,6.5Y,7Y}
13	NIKE DUNK LOW RED SWOOSH	https://i.imgur.com/Ja26Xu5.png	01.10.2022	[{"id": "1", "size": "8", "price": 220}, {"id": "2", "size": "11", "price": 250}, {"id": "3", "size": "10", "price": 255}]	[{"id": "1", "size": "8US", "price": 180}, {"id": "2", "size": "10US", "price": 22}]	[{"id": "1", "date": "2023-01-16T15:08:01.753Z", "size": "8", "price": 255}, {"id": "2", "date": "2023-01-16T15:08:01.753Z", "size": "11", "price": 321}, {"id": "3", "date": "2023-01-16T15:08:01.753Z", "size": "10", "price": 276}]	{7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12}
\.


--
-- TOC entry 3326 (class 0 OID 0)
-- Dependencies: 215
-- Name: shoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shoes_id_seq', 12, true);


--
-- TOC entry 3175 (class 2606 OID 24618)
-- Name: shoes shoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shoes
    ADD CONSTRAINT shoes_pkey PRIMARY KEY (id);


-- Completed on 2023-03-05 20:41:20

--
-- PostgreSQL database dump complete
--

