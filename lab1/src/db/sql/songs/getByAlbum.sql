SELECT songs.* FROM songs
    LEFT JOIN albums_songs
        ON songs.id=albums_songs.song
    LEFT JOIN albums
        ON albums.id=albums_songs.album
    WHERE albums.id=${id};