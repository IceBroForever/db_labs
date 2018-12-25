SELECT songs.* FROM songs
    LEFT JOIN singers_songs
        ON songs.id=singers_songs.song
    LEFT JOIN singers
        ON singers.id=singers_songs.singer
    WHERE singers.id=${id};