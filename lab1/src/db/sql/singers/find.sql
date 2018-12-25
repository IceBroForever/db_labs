SELECT * FROM singers
    WHERE make_tsvector(name, lyrics) @@ plainto_tsquery(${input});