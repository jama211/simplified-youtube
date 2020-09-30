const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');

// Init express
const server = express();

server.use(fileUpload());
server.use(cors());

// Listens for post requests and handles the uploading of a video file 
server.post('/upload', (req, res) => {

    if(req.files === null){
        return res.status(400).json({ msg: 'Upload failed!' });
    }

    // Retrieve the file object from the request 
    const newFile = req.files.file;

    // Store the new file in the uploads folder 
    newFile.mv(`${__dirname}/client/public/uploads/${newFile.name}`, err => {

        // If there was an error saving the file, log it and send status 500 (internal server error)
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }

        // Retrieve the currently stored list of videos, so we can append the new metadata to it and save 
        let currentData = JSON.parse(fs.readFileSync('data/videoList.json'));

        let newVideo = {
            id: currentData.videoList.length,
            path: `/uploads/${newFile.name}`,
            name: `${newFile.name}`,
            title: `${req.body.videoTitle}`
        }

        currentData.videoList.push(newVideo);

        fs.writeFile('data/videoList.json', JSON.stringify(currentData, null, 2), () => {
            console.log("updated json file");
        });

        // Return info of the file's name and location now that it's uploaded
        res.json({ fileName: newFile.name, filePath: `/uploads/${newFile.name}` });
    });
});

// The route 'watch' serves metadata about a specific video (with id), including name and url 
server.get('/watch/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let currentData = JSON.parse(fs.readFileSync('data/videoList.json'));
    res.json(currentData.videoList[id]);
});

// The route videoList returns a json object of the list of all video metadata we store  
server.get('/videoList', (req, res) => {
    res.json(JSON.parse(fs.readFileSync('data/videoList.json')));
});

// Start the server... 
server.listen(5000, () => console.log('Video Data Management Server Started...'));