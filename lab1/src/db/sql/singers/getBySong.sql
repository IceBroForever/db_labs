SELECT singers.* FROM singers
    LEFT JOIN singers_songs
        ON singers.id=singers_songs.singer
    WHERE singers_songs.song=${id}