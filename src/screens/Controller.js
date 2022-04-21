import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './home/Home.js';
import Details from './details/Details.js';
import BookShow from './bookshow/BookShow.js';


const Controller = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home {...props} />
                </Route>
                <Route exact path="/movie/:id">
                    <Details {...props} />
                </Route>
                <Route exact path="/bookshow/:id">
                    <BookShow {...props} />
                </Route>
                <Route exact path="/confirm/:id">
                    <BookShow {...props} />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Controller