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
    singer_id BIGINT NOT NULL REFERENCES singers ON DELETE CASCADE,
    song_id BIGINT NOT NULL REFERENCES songs ON DELETE CASCADE,
    PRIMARY KEY (singer_id, song_id)
);

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    singer_id BIGINT REFERENCES singers ON DELETE CASCADE,
    released DATE DEFAULT CURRENT_DATE
);

CREATE TABLE albums_songs (
    album_id BIGINT NOT NULL REFERENCES albums ON DELETE CASCADE,
    song_id BIGINT NOT NULL REFERENCES songs ON DELETE CASCADE,
    PRIMARY KEY (album_id, song_id)
);

CREATE FUNCTION check_if_belong_to_singer()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    DECLARE
        singer BIGINT;
    BEGIN
        SELECT albums.singer_id INTO singer FROM albums WHERE albums.id=NEW.album_id;
        IF NOT exists(
            SELECT 1 FROM singers_songs
                WHERE singers_songs.singer_id=singer
                    AND singers_songs.song_id=NEW.song_id
        )
        THEN
            DELETE FROM albums_songs
                WHERE albums_songs.album_id=NEW.album_id
                    AND albums_songs.song_id=NEW.song_id;
            RAISE EXCEPTION 'Song % do not belong to singer %', NEW.song, singer;
        END IF;
        RETURN NEW;
    END;
    $$;

CREATE TRIGGER check_if_belong_to_singer
    AFTER INSERT ON albums_songs
    FOR EACH ROW EXECUTE PROCEDURE check_if_belong_to_singer();