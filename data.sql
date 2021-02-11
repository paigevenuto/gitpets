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
