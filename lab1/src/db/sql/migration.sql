CREATE TABLE singers (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(65) NOT NULL,
    name VARCHAR(32),
    surname VARCHAR(32),
    birth DATE
);

CREATE FUNCTION singers_make_tsvector(nickname VARCHAR(65), name VARCHAR(32), surname VARCHAR(32))
        RETURNS tsvector AS $$
    BEGIN
        RETURN (setweight(to_tsvector('english', nickname),'A') ||
            setweight(to_tsvector('english', name), 'B') ||
            setweight(to_tsvector('english', surname), 'B'));
    END
    $$ LANGUAGE 'plpgsql' IMMUTABLE;

CREATE INDEX ON singers USING gin(singers_make_tsvector(nickname, name, surname));

CREATE TYPE GENRES as ENUM (
    'afro', 'avant-garde', 'blues', 'caribbean', 'comedy', 'country', 'easy listening', 'electronic', 'folk', 'hip-pop', 'jazz', 'latin', 'pop', 'r&b', 'soul', 'rock'
);

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    duration INT NOT NULL CHECK (duration > 0),
    rating REAL NOT NULL CHECK (rating >= 0 AND rating <= 5),
    genre GENRES NOT NULL,
    lyrics TEXT NOT NULL,
    released DATE DEFAULT CURRENT_DATE
);

CREATE FUNCTION songs_make_tsvector(name VARCHAR(64), lyrics TEXT)
        RETURNS tsvector AS $$
    BEGIN
        RETURN (setweight(to_tsvector('english', name),'A') ||
            setweight(to_tsvector('english', lyrics), 'B'));
    END
    $$ LANGUAGE 'plpgsql' IMMUTABLE;

CREATE INDEX ON songs USING gin(songs_make_tsvector(name, lyrics));

CREATE TABLE singers_songs (
    singer BIGINT NOT NULL REFERENCES singers ON DELETE CASCADE,
    song BIGINT NOT NULL REFERENCES songs ON DELETE CASCADE,
    PRIMARY KEY (singer, song)
);

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    singer BIGINT REFERENCES singers ON DELETE CASCADE,
    released DATE DEFAULT CURRENT_DATE
);

CREATE TABLE albums_songs (
    album BIGINT NOT NULL REFERENCES albums ON DELETE CASCADE,
    song BIGINT NOT NULL REFERENCES songs ON DELETE CASCADE,
    PRIMARY KEY (album, song)
);