SELECT * FROM (
    SELECT albums.*, avg(songs.rating) as rating FROM albums
        LEFT JOIN albums_songs
            ON albums.id=albums_songs.album
        LEFT JOIN songs
            ON albums_songs.song=songs.id
        GROUP BY albums.id
    ) as t
    WHERE t.rating>=${rating};