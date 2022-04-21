import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'

import Input from "@material-ui/core/Input";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';

import "./home.css"

/**
* Set Theme styling
*/
const styles = (theme) => ({
    headingCard: {
        color: theme.palette.primary.light,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
        maxWidth: 240,
    }
});


const Home = (props) => {
    const { classes } = props;
    /**
     * state variables
     */
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [genres, setGenres] = useState([]);
    const [genresSelected, setGenresSelected] = useState([]);
    const [artists, setArtists] = useState([]);
    const [artistsSelected, setArtistsSelected] = useState([]);
    const [selectedDateStart, setSelectedDateStart] = React.useState("");
    const [selectedDateEnd, setSelectedDateEnd] = React.useState("");

    /**
     * fetch Upcoming movies and set it to state variable
     */
    async function fetchUpcomingMovies() {
        let response = await fetch(props.baseUrl + "movies/?&status=PUBLISHED", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        })
        response = await response.json();
        setUpcomingMovies(response.movies);
    }
    /**
     * fetch Released movies and set it to state variable
     */
    async function fetchReleasedMovies(filters = "") {
        let apiUrl = `${props.baseUrl}movies/?status=RELEASED`
        if (filters) {
            apiUrl += filters
        }
        let response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        })
        response = await response.json();
        setReleasedMovies(response.movies);
    }

    /**
     * fetch Genre  and set it to state variable
     */
    async function fetchGenre() {
        let response = await fetch(props.baseUrl + "genres", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        })
        response = await response.json();
        setGenres(response.genres);
    }

    /**
     * fetch Artists  and set it to state variable
     */
    async function fetchArtists() {
        let response = await fetch(props.baseUrl + "artists", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        })
        response = await response.json();
        setArtists(response.artists);
    }

    /**
     * on page load fetch
     * Upcoming movies
     * Released MOvies
     * Artists
     * Genre
     */
    useEffect(() => {
        fetchUpcomingMovies();
        fetchReleasedMovies();
        fetchArtists();
        fetchGenre()
    }, [])

    /**
    * this function is used to change genres multi select
    */
    const handleChange = (event) => {
        setGenresSelected(event.target.value);
    };
    /**
     * this function is used to change artists multi select
     */
    const handleChangeArtists = (event) => {
        setArtistsSelected(event.target.value);
    };
    /**
     * this function is used to apply all the filters
     */
    const applyFilters = async () => {
        let queryString = "";
        if (searchValue !== "") {
            queryString += `&title=${searchValue}`;
        }
        if (genresSelected.length > 0) {
            queryString += `&genre=${genresSelected.toString()}`;
        }
        if (artistsSelected.length > 0) {
            queryString += `&artists=${artistsSelected.toString()}`;
        }
        if (selectedDateStart !== "") {
            queryString += `&start_date=${selectedDateStart}`;
        }
        if (selectedDateEnd !== "") {
            queryString += `&end_date=${selectedDateEnd}`;
        }
        await fetchReleasedMovies(queryString);
    }

    return (<div>
        <Header {...props}></Header>
        <div className="heading">Upcoming Movies</div>
        <div className="paper">
            <GridList style={{
                width: '100%',
                maxHeight: 320,
                flexWrap: 'nowrap'
            }} cols={0} cellHeight={'auto'}>
                {
                    upcomingMovies.map((tile) => (
                        <GridListTile style={{
                            width: '16.66%',
                        }} key={tile.id}>
                            <img src={tile.poster_url} style={{ width: "100%", height: "100%" }} alt={tile.title} />
                            <GridListTileBar
                                title={tile.title}
                            />
                        </GridListTile>
                    ))
                }
            </GridList>
        </div>
        <div className="bottom">
            <div className="released">
                <GridList cols={4} style={{
                    width: '100%',
                    margin: "16px"
                }} cellHeight={350}>
                    {
                        releasedMovies.map((tile) => (
                            <GridListTile key={tile.id}>
                                <Link to={`/movie/${tile.id}`}><img src={tile.poster_url} style={{ width: "100%", height: "100%" }} className="image" alt={tile.title} /></Link>
                                <GridListTileBar
                                    subtitle={<span>Release Date: {tile.release_date}</span>}
                                    title={tile.title}
                                />
                            </GridListTile>
                        ))
                    }
                </GridList>
            </div>
            <div className="filter">
                <Card style={{ margin: '16px' }}>
                    <CardContent>
                        <FormControl className={classes.formControl}>
                            <Typography className={classes.headingCard} color="textSecondary">
                                FIND MOVIES BY:
                            </Typography>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Input
                                required
                                id="search"
                                name="search"
                                placeholder="Movie Name"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="mutiple-checkbox-label">Genres</InputLabel>
                            <Select
                                multiple
                                value={genresSelected}
                                onChange={handleChange}
                                input={<Input id="mutiple-checkbox-label" />}
                                renderValue={(selected) => selected.join(', ')}
                            // MenuProps={MenuProps}
                            >
                                {genres.map((genre) => (
                                    <MenuItem key={genre.id} value={genre.genre}>
                                        <Checkbox checked={genresSelected.indexOf(genre.genre) > -1} />
                                        <ListItemText primary={genre.genre} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="mutiple-checkbox-label-artists">Artists</InputLabel>
                            <Select
                                multiple
                                value={artistsSelected}
                                onChange={handleChangeArtists}
                                input={<Input id="mutiple-checkbox-label-artists" />}
                                renderValue={(selected) => selected.join(', ')}
                            // MenuProps={MenuProps}
                            >
                                {artists.map((artist) => (
                                    <MenuItem key={artist.id} value={`${artist.first_name} ${artist.last_name}`}>
                                        <Checkbox checked={artistsSelected.indexOf(`${artist.first_name} ${artist.last_name}`) > -1} />
                                        <ListItemText primary={`${artist.first_name} ${artist.last_name}`} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="releaseDateStart"
                                label="Release Date Start"
                                type="date"
                                defaultValue=""
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => setSelectedDateStart(e.target.value)}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="releaseDateEnd"
                                label="Release Date End"
                                type="date"
                                defaultValue=""
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => setSelectedDateEnd(e.target.value)}
                            />
                        </FormControl>
                        <br /><br />
                        <FormControl className={classes.formControl}>
                            <Button onClick={applyFilters} variant="contained" color="primary">
                                APPLY
                            </Button>
                        </FormControl>
                    </CardContent>

                </Card>
            </div>
        </div>
    </div>)
};

export default withStyles(styles)(Home)