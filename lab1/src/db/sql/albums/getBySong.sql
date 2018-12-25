SELECT albums.* FROM albums
    LEFT JOIN albums_songs
        ON albums.id=albums_songs.album
    WHERE albums_songs.song=${id}