SELECT DISTINCT albums.* FROM albums
    LEFT JOIN albums_songs
        ON albums.id=albums_songs.album
    LEFT JOIN songs
        ON albums_songs.song=songs.id
    WHERE songs.genre=${genre}