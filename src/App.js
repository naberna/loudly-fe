import React, {useState, useEffect, useCallback, useMemo} from 'react';
import Player from './components/Player/Player';

const API_KEY = '___agAFTxkmMIWsmN9zOpM_6l2SkZPPy21LGRlxhYD8';

function App() {
    const [songs, setSongs] = useState(null);
    const [likedSongs, setLikedSongs] = useState(null);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(0);

    useEffect(() => {
        if (songs?.length > 0) {
            setNextSongIndex(() => {
                if (currentSongIndex + 1 > songs.length - 1) {
                    return 0;
                } else {
                    return currentSongIndex + 1;
                }
            });
        }
    }, [currentSongIndex, songs]);

    useEffect(() => {
        fetch(
            'https://api-stg.jam-community.com/song/trending'
        )
            .then((response) => response.json())
            .then((response) => {
                setSongs(response);
            })
            .catch((err) => {
                setSongs([]);
                console.error('Error', err);
            })
    }, []);

    const songID = useMemo(() => songs ? songs[currentSongIndex]?.id : undefined, [songs, currentSongIndex]);
    const isLiked = useMemo(() => Boolean(likedSongs?.includes(songID)), [songID, likedSongs]);

    const like = useCallback(() => {
        if (!songID) return false;
        const lSongs = JSON.parse(JSON.stringify(likedSongs || []));

        if (!likedSongs?.includes(songID)) {
            lSongs.push(songID);
            setLikedSongs(lSongs);
        } else return false;

        const headers = new Headers();
        const body = new URLSearchParams();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        body.append('id', songID);

        const requestOptions = {
            method: 'POST',
            headers,
            body,
            redirect: 'follow',
        }

        fetch(
            `https://api-stg.jam-community.com/interact/like?apikey=${API_KEY}`,
            requestOptions,
        )
            .then((res) => {
                if (res.status !== 200) res.error();
            })
            .catch((err) => {
                setLikedSongs(lSongs?.filter((likedSong) => likedSong !== songID) || []);
            });
    }, [likedSongs, songID]);

    return (
        <div className="App">
            {!Boolean(songs?.length) ? (
                <div>
                    loading...
                </div>
            ) : (
                <Player
                    id={songID}
                    isLiked={isLiked}
                    currentSongIndex={currentSongIndex}
                    setCurrentSongIndex={setCurrentSongIndex}
                    nextSongIndex={nextSongIndex}
                    songs={songs}
                    like={like}
                />
            )}
        </div>
    );
}

export default App;
