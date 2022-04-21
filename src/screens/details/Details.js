import React, { useEffect, useState } from "react";

import Header from "../../common/header/Header";
import Typography from '@material-ui/core/Typography'
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import { Link, withRouter } from 'react-router-dom';

import "./details.css";
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;


const Details = (props) => {
    /**
     * set state variables
     */
    const [movieDetails, setMovieDetails] = useState("");
    const [stars, setStars] = useState([])
    /**
     * set youtube video options
     */
    const youTubeOption = {
        height: '300',
        width: '700',
        playerVars: {
            autoplay: 1
        }
    }
    /**
     * this function is used to fetch a movie by id
     */
    async function fetchMovieById() {
        let response = await fetch(props.baseUrl + `movies/${props.match.params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        })
        response = await response.json();
        const initialRatings = [];
        for (let i = 0; i < 5; i++) {
            initialRatings.push({
                id: i + 1,
                color: 'black'
            })
        }
        setStars(initialRatings);
        setMovieDetails(response);
    }
    /**
     * this function is used to fhandle user interaction with ratings
     */
    const handleRating = (id) => {
        const changedRatings = stars.map((star, i) => {
            if (i < id) {
                star.color = 'yellow';
            }else{
                star.color = 'black';
            }
            return star;
        })
        setStars(changedRatings);
    }
    /**
     * fetch movie details on page load based on id in params
     */
    useEffect(() => {
        fetchMovieById()
    }, []);



    return (
        <div>
            <Header showBookShowButton={true} id={props.match.params.id} {...props}></Header>
            <Typography component={'span'}>
                <Link to="/" className="link" ><div className="back-button">{'< Back to Home'}</div></Link>
            </Typography>
            <div className="flex-container">
                <div className="left">
                    <img className="movie-image" src={movieDetails.poster_url} alt={movieDetails.title} />
                </div>
                <div className="middle">
                    <div className="mid-section">
                        <Typography variant="headline" component="h2">{movieDetails.title} </Typography>
                        <Typography>
                            <span className="bold">Genres: </span> {movieDetails.genres && movieDetails.genres.join(', ')}
                        </Typography>
                        <Typography><span className="bold">Duration:</span> {movieDetails.duration} </Typography>
                        <Typography><span className="bold">Release Date:</span> {new Date(movieDetails.release_date).toDateString()} </Typography>
                        <Typography><span className="bold"> Rating:</span> {movieDetails.critics_rating}  </Typography>
                        <div className="plot">
                            <Typography><span className="bold"> Plot:</span> <a href={movieDetails.wiki_url}>(Wiki Link)</a> {movieDetails.storyline}  </Typography>
                        </div>
                        <div className="trailer">
                            <Typography>
                                <span className="bold">Trailer:</span>
                            </Typography>
                            <YouTube
                                videoId={movieDetails.trailer_url && movieDetails.trailer_url.split("?v=")[1]}
                                opts={youTubeOption}
                            />
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="right">
                    <div className="right-section">
                        <Typography>
                            <span className="bold">Rate this movie: </span>
                        </Typography>
                        {
                            stars.map(star => {
                                return <StarBorderIcon
                                    key={star.id}
                                    className={star.color}
                                    onClick={() => handleRating(star.id)}
                                ></StarBorderIcon>
                            })
                        }
                         <div className="asrtists">
                            <Typography>
                                <span className="bold">Artists:</span>
                            </Typography>
                            <GridList cellHeight={160} cols={2}>
                                {movieDetails.artists != null && movieDetails.artists.map(artist => (
                                    <GridListTile
                                        className="gridTile"
                                        // onClick={() => this.artistClickHandler(artist.wiki_url)}
                                        key={artist.id}>
                                        <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                        <GridListTileBar
                                            title={artist.first_name + " " + artist.last_name}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default withRouter(Details);