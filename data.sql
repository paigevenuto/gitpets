CREATE TABLE pets (
    pet_id SERIAL PRIMARY KEY,
    name text NOT NULL,
    species text NOT NULL,
    mood text NOT NULL,
    food integer NOT NULL,
    play integer NOT NULL,
    love integer NOT NULL,
    lastHeart text
);

CREATE TABLE users (
    user_id text PRIMARY KEY,
    username text UNIQUE NOT NULL,
    pet_id integer REFERENCES pets (pet_id) ON DELETE CASCADE
);

CREATE TABLE species (
    id integer PRIMARY KEY,
    hunger_threshold text NOT NULL,
    sleep_threshold text NOT NULL,
    sadness_threshold text NOT NULL,
    description text NOT NULL
);

INSERT INTO species (id, hunger_threshold, sleep_threshold, sadness_threshold, description) VALUES (1, 32, 80, 32, 'This pet is very playful and needs lots of variety to be happy.<br>Recommended for those who use many programming languages a week.');
INSERT INTO species (id, hunger_threshold, sleep_threshold, sadness_threshold, description) VALUES (2, 32, 32, 80, 'This one is shy and requires plenty of attention to not get lonely.<br>Easily cared for, but cant go too long with without ❤s.');
INSERT INTO species (id, hunger_threshold, sleep_threshold, sadness_threshold, description) VALUES (3, 80, 32, 32, 'This one has an appetite, be sure to feed it code contributions more frequently!<br>Recommended for those who program most days of a week.');
