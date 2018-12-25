INSERT INTO songs (name, duration, rating, genre, lyrics, released)
    VALUES (${name}, ${duration}, ${rating}, ${genre}, ${lyrics}, ${released})
    RETURNING id;