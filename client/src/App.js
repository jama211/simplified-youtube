import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import FileUpload from './views/FileUpload';
import VideoList from './views/VideoList';
import VideoPlayer from './views/VideoPlayer';

// Get url base for nav highlighting 
const path = require('path');
const urlBasename = path.basename(window.location.href);

function App() {
    return (
        <div className="container mt-4">
            <h1 className="pageTitle">Simplified Youtube!</h1>

            {/* Navbar */}
            <nav className="navbar navbar-light bg-light">
                <form className="form-inline">
                    <a href="/" className={urlBasename !== 'upload' ? 'btn btn-outline-success' : 'btn btn-outline-secondary' } type="button">Home</a>
                    <a href="/upload" className={urlBasename === 'upload' ? 'btn btn-outline-success' : 'btn btn-outline-secondary' } type="button">Upload</a>
                </form>
            </nav>

            {/* Single page app! Therefore show only the component that matches the page route */} 
            <Router>
                <Switch>
                    <Route exact path="/" component={VideoList}></Route>
                    <Route path="/upload" component={FileUpload}></Route>
                    <Route path="/video" component={VideoPlayer}></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
