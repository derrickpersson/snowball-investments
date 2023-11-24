-- Set up test db
CREATE DATABASE test;
CREATE role 'postgres' with login password 'postgres';

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