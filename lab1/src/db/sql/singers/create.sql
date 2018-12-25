INSERT INTO singers (nickname, name, surname, birth)
    VALUES (${nickname}, ${name}, ${surname}, ${birth})
    RETURNING id;