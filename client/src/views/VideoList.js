import React, { Component } from 'react';

// Retreives and displays all stored videos for the home page 
export default class VideoList extends Component {

    constructor() {
        super();

        this.state = {
            uploadedVideos: []
        };

        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        try {
            // Retrieve the video list from the server and update our list in state 
            const response = await fetch('http://' + window.location.hostname + ':5000/videoList');
            const data = await response.json();

            this.setState({ uploadedVideos: [...data.videoList] });

        } 
        catch (err) {
            console.log(err);
        }
    }

    handleClick(e, id){
        e.preventDefault();

        // Redirect to the video that's been clicked on so it can be played 
        window.location.href = "/video/" + id;
    }

    render() {
        return (
            <div className="App App-header">
                <div className="container home">

                    <h2>Uploaded Videos: </h2>

                    <div className="row">
                        {this.state.uploadedVideos.map(video => 
                            <div className="col-md-4 col-sl-12 videoBox" key={video.id} onClick={(e) => this.handleClick(e, video.id)}>
                                <div className="innerVideoBox">
                                    <p>{video.title}</p>
                                    <video muted >
                                        <source src={video.path} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}