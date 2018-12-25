INSERT INTO albums (name, singer, released)
    VALUES (${name}, ${singer}, ${released})
    RETURNING id;