import React, {useState, useRef, useEffect} from 'react'
import Controls from './Controls';
import Details from './Details';
import { HiChevronDoubleLeft } from "react-icons/hi";
import { FaEllipsisH } from "react-icons/fa"
import {AiOutlineShareAlt, AiOutlineHeart, AiFillHeart} from "react-icons/ai";

function Player(props) {
    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (
            isPlaying
            && audioEl?.current
        ) {
            audioEl?.current?.play();
        } else {
            audioEl?.current?.pause();
        }
    }, [isPlaying, audioEl, props.currentSongIndex]);

    const SkipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if (temp > props.songs.length - 1) {
                    temp = 0;
                }

                return temp;
            });
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.songs.length - 1;
                }

                return temp;
            });
        }
    }

    return (
        <div className="c-player">
            <div className='c-player--header'>
                <HiChevronDoubleLeft/>
                <h4>Playing now</h4>
                <FaEllipsisH/>
            </div>
            <div className='c-player--content'>
                <div className='c-player--socials'>
                    <AiOutlineShareAlt/>
                    <button
                        type="button"
                        onClick={props?.like}
                        disabled={props.isLiked}
                        title={props.isLiked ? 'You already like this song.' : undefined}
                    >
                        {props.isLiked ? <AiFillHeart />: <AiOutlineHeart />}
                    </button>
                </div>
                <audio
                    src={props.songs[props.currentSongIndex].music_file_path}
                    ref={audioEl}
                    onEnded={() => {
                        console.log('end')
                    }}
                />
                <Details song={props.songs[props.currentSongIndex]} />
                <Controls
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    SkipSong={SkipSong}
                />
                <p>Next up: <span>{props.songs[props.nextSongIndex].name} by {props.songs[props.nextSongIndex].artist.artist_name}</span></p>
            </div>
        </div>
    );
}

export default Player;
