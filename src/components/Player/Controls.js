import React from 'react'
import { MdSkipPrevious, MdSkipNext} from "react-icons/md";
import { IoPlayOutline, IoPause } from "react-icons/io5";

function Controls(props) {
    return (
        <div className="c-player--controls">
            <button className="skip-btn" onClick={() => props.SkipSong(false)}>
                <MdSkipPrevious />
            </button>
            <button
                aria-hidden="true"
                className="play-btn"
                onClick={() => props.setIsPlaying(!props.isPlaying)}
            >
                {!props?.isPlaying ? <IoPlayOutline /> : <IoPause />}
            </button>
            <button className="skip-btn" onClick={() => props.SkipSong()}>
                <MdSkipNext />
            </button>
        </div>
    )
}

export default Controls
