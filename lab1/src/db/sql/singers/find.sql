SELECT * FROM singers
    WHERE singers_make_tsvector(nickname, name, surname) @@ plainto_tsquery(${input});