SELECT * FROM songs
    WHERE songs_make_tsvector(name, lyrics) @@ to_tsquery('!${word#}');