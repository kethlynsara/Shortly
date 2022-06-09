CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
    id SERIAL NOT NULL PRIMARY KEY,
    token TEXT UNIQUE NOT NULL,
    "userId" INTEGER REFERENCES "users"("id"),
    "closeSessionDate" TIMESTAMP ,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()       
);

CREATE TABLE links (
    id SERIAL NOT NULL PRIMARY KEY,
    url TEXT NOT NULL,
    "shortUrl" TEXT UNIQUE NOT NULL,
    views INTEGER NOT NULL,
    "userId" INTEGER REFERENCES "users"("id"),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
