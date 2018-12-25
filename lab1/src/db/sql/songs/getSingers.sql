SELECT array_agg(singers_songs.singer) AS singers FROM singers_songs
    WHERE singers_songs.song=${id};