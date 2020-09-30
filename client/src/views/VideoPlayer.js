import { dirname } from 'path';
import React, { Component } from 'react';

const path = require('path');
const urlBasename = path.basename(window.location.href);

// Play a specific video as specified 
export default class VideoPlayer extends Component {

    constructor() {
        super();

        this.state = {
            videoToWatch: {}
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch('http://' + window.location.hostname + ':5000/watch/' + urlBasename);
            const data = await response.json();

            this.setState({ videoToWatch: data });
        } 
        catch (err) {
            console.log(err);
        }
    }

    render() {
        
        let video = "";
        if(this.state.videoToWatch){
            video = 
            (
                <video controls autoPlay key={this.state.videoToWatch.id} data-testid="videoElement">
                    <source src={this.state.videoToWatch.path} type="video/mp4" />
                </video>
            );
        }
        else{
            video = "Loading...";
        }

        return (
            <div className="App App-header">
                <div className="container video">
                    <div className="row">
                        <div className="col-md-12">

                            <br />
                            
                            <h1>{this.state.videoToWatch.title}</h1>

                            <br />
                            <div className="videoPlayerBox">
                                {video}
                            </div>

                            <a className="btn btn-outline-secondary" href="/">Back To Home...</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}