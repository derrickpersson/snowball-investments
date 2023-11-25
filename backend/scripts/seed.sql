-- Set up Database with proper schema:
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Homebrew)

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

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bank_account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bank_account (
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "accountNumber" character varying NOT NULL,
    "branchNumber" character varying DEFAULT '06000'::character varying NOT NULL,
    "institutionNumber" character varying DEFAULT '090'::character varying NOT NULL,
    "accountHolderId" uuid NOT NULL,
    "accountType" character varying DEFAULT 'chequing'::character varying NOT NULL,
    "accountCategory" character varying DEFAULT 'debit'::character varying NOT NULL
);


ALTER TABLE public.bank_account OWNER TO postgres;

--
-- Name: contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    email character varying NOT NULL,
    "ownerId" uuid NOT NULL
);


ALTER TABLE public.contact OWNER TO postgres;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: split; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.split (
    id integer NOT NULL,
    type character varying NOT NULL,
    "transactionId" uuid NOT NULL
);


ALTER TABLE public.split OWNER TO postgres;

--
-- Name: split_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.split_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.split_id_seq OWNER TO postgres;

--
-- Name: split_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.split_id_seq OWNED BY public.split.id;


--
-- Name: split_share; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.split_share (
    id integer NOT NULL,
    "splitId" integer NOT NULL,
    "contactId" character varying NOT NULL,
    amount double precision NOT NULL
);


ALTER TABLE public.split_share OWNER TO postgres;

--
-- Name: split_share_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.split_share_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.split_share_id_seq OWNER TO postgres;

--
-- Name: split_share_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.split_share_id_seq OWNED BY public.split_share.id;


--
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "debitAmount" double precision DEFAULT '0'::double precision NOT NULL,
    "creditAmount" double precision DEFAULT '0'::double precision NOT NULL,
    description character varying,
    category character varying NOT NULL,
    "bankAccountId" uuid NOT NULL,
    "vendorId" integer NOT NULL
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: vendor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vendor (
    id integer NOT NULL,
    name character varying NOT NULL,
    "logoURL" character varying NOT NULL
);


ALTER TABLE public.vendor OWNER TO postgres;

--
-- Name: vendor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vendor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vendor_id_seq OWNER TO postgres;

--
-- Name: vendor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vendor_id_seq OWNED BY public.vendor.id;


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: split id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.split ALTER COLUMN id SET DEFAULT nextval('public.split_id_seq'::regclass);


--
-- Name: split_share id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.split_share ALTER COLUMN id SET DEFAULT nextval('public.split_share_id_seq'::regclass);


--
-- Name: vendor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor ALTER COLUMN id SET DEFAULT nextval('public.vendor_id_seq'::regclass);


--
-- Name: contact PK_2cbbe00f59ab6b3bb5b8d19f989; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY (id);


--
-- Name: transaction PK_89eadb93a89810556e1cbcd6ab9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: vendor PK_931a23f6231a57604f5a0e32780; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor
    ADD CONSTRAINT "PK_931a23f6231a57604f5a0e32780" PRIMARY KEY (id);


--
-- Name: split PK_a656ea46749d1567ca7e7d5923a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.split
    ADD CONSTRAINT "PK_a656ea46749d1567ca7e7d5923a" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: split_share PK_ec38ba72d62a2c33e173655fb65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.split_share
    ADD CONSTRAINT "PK_ec38ba72d62a2c33e173655fb65" PRIMARY KEY (id);


--
-- Name: bank_account PK_f3246deb6b79123482c6adb9745; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_account
    ADD CONSTRAINT "PK_f3246deb6b79123482c6adb9745" PRIMARY KEY (id);


--
-- Name: bank_account UQ_0d65403190dfac7941ae649aefc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_account
    ADD CONSTRAINT "UQ_0d65403190dfac7941ae649aefc" UNIQUE ("accountNumber", "branchNumber", "institutionNumber");


--
-- Name: split UQ_bfe22cb4b12cbab802c252607d7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.split
    ADD CONSTRAINT "UQ_bfe22cb4b12cbab802c252607d7" UNIQUE ("transactionId");


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: vendor UQ_f61018bdc439c6d1a941261b671; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor
    ADD CONSTRAINT "UQ_f61018bdc439c6d1a941261b671" UNIQUE (name);


--
-- Name: contact UQ_fb613b01b48f8e960af444e6e9f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT "UQ_fb613b01b48f8e960af444e6e9f" UNIQUE (email, "ownerId");


--
-- Name: transaction FK_07540dda5970c29494e0f70f89e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT "FK_07540dda5970c29494e0f70f89e" FOREIGN KEY ("bankAccountId") REFERENCES public.bank_account(id) ON DELETE CASCADE;


--
-- Name: contact FK_68cfe567915dcb767204eba5895; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT "FK_68cfe567915dcb767204eba5895" FOREIGN KEY ("ownerId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: split FK_bfe22cb4b12cbab802c252607d7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.split
    ADD CONSTRAINT "FK_bfe22cb4b12cbab802c252607d7" FOREIGN KEY ("transactionId") REFERENCES public.transaction(id);


--
-- Name: transaction FK_c739b846be36480210f5885e774; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT "FK_c739b846be36480210f5885e774" FOREIGN KEY ("vendorId") REFERENCES public.vendor(id) ON DELETE CASCADE;


--
-- Name: split_share FK_d5179cde8db40d72f5d673f9cb0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.split_share
    ADD CONSTRAINT "FK_d5179cde8db40d72f5d673f9cb0" FOREIGN KEY ("splitId") REFERENCES public.split(id) ON DELETE CASCADE;


--
-- Name: bank_account FK_dea0100374cdbdf08397241c966; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_account
    ADD CONSTRAINT "FK_dea0100374cdbdf08397241c966" FOREIGN KEY ("accountHolderId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--



-- Set up vendors
INSERT INTO public.vendor (name, "logoURL") VALUES
('A & W', 'http://localhost:5173/vendors/a-and-w.png'),
('BestBuy', 'http://localhost:5173/vendors/bestbuy.png'),
('McDonalds', 'http://localhost:5173/vendors/mcdonalds.png'),
('Starbucks', 'http://localhost:5173/vendors/starbucks.png'),
('Steamworks', 'http://localhost:5173/vendors/steamworks.png'),
('Tap & Barrell', 'http://localhost:5173/vendors/tap-and-barrell.png'),
('Payday', '');

-- Set up example user
INSERT INTO public."user" (id, email, "firstName", "lastName", password) VALUES 
('8724c852-d966-4d55-894c-9272ad863404', 'test@example.com', 'Test', 'User', 'password');

INSERT INTO public.bank_account (id, "accountNumber", "accountHolderId", "accountType") VALUES 
('faeb42c7-e725-425c-894a-a2b27227f276', '12345678', '8724c852-d966-4d55-894c-9272ad863404', 'chequing'),
('b14a3de6-c81f-4180-b34d-8b446a8862a6', '87654321', '8724c852-d966-4d55-894c-9272ad863404', 'savings');

-- Seed transactions for the example user
INSERT INTO public.transaction ("bankAccountId", "vendorId", "creditAmount", "debitAmount", "category", "createdAt") VALUES
('faeb42c7-e725-425c-894a-a2b27227f276', 7, 0, 3500.5, 'other', '2023-11-15T01:27:22.038Z'),
('faeb42c7-e725-425c-894a-a2b27227f276', 1, 50.0, 0, 'dining', '2023-11-16T01:27:22.038Z'),
('faeb42c7-e725-425c-894a-a2b27227f276', 2, 75.0, 0, 'dining', '2023-11-17T01:27:22.038Z'),
('faeb42c7-e725-425c-894a-a2b27227f276', 3, 20.0, 0, 'dining', '2023-11-17T01:27:22.038Z' ),
('faeb42c7-e725-425c-894a-a2b27227f276', 4, 15.0, 0, 'dining', '2023-11-18T01:27:22.038Z'),
('faeb42c7-e725-425c-894a-a2b27227f276', 5, 100.0, 0, 'dining', '2023-11-20T01:27:22.038Z'),
('b14a3de6-c81f-4180-b34d-8b446a8862a6', 7, 0, 5000.5, 'other', '2023-11-20T01:27:22.038Z'),
('b14a3de6-c81f-4180-b34d-8b446a8862a6', 1, 30.0, 0, 'dining', '2023-11-21T01:27:22.038Z'),
('b14a3de6-c81f-4180-b34d-8b446a8862a6', 2, 45.0, 0, 'dining', '2023-11-21T01:27:22.038Z'),
('b14a3de6-c81f-4180-b34d-8b446a8862a6', 3, 60.0, 0, 'dining', '2023-11-21T01:27:22.038Z'),
('b14a3de6-c81f-4180-b34d-8b446a8862a6', 4, 10.0, 0, 'dining', '2023-11-21T01:27:22.038Z'),
('b14a3de6-c81f-4180-b34d-8b446a8862a6', 5, 25.0, 0, 'dining', '2023-11-24T01:27:22.038Z');

INSERT INTO public.contact ("firstName", "lastName", email, "ownerId") VALUES
('Karen', 'Smith', 'karen@example.com', '8724c852-d966-4d55-894c-9272ad863404'),
('John', 'Doe', 'john@example.com', '8724c852-d966-4d55-894c-9272ad863404'),
('Jane', 'Doe', 'jane@example.com', '8724c852-d966-4d55-894c-9272ad863404'),
('Bob', 'Smith', 'bob@example.com', '8724c852-d966-4d55-894c-9272ad863404'),
('Alice', 'Smith', 'alice@example.com', '8724c852-d966-4d55-894c-9272ad863404');