import React from 'react'

function Details(props) {
    return (
        <div className="c-player--details">
            <div className="details-img">
                <img src={props.song.cover_image_path} alt="" />
            </div>
            <h3 className="details-title">{props.song.name}</h3>
            <h4 className="details-artist">{props.song.artist.artist_name}</h4>
        </div>
    )
}

export default Details
