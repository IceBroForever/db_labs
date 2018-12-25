SELECT * FROM songs
    WHERE songs_make_tsvector(name, lyrics) @@ plainto_tsquery(${phrase});