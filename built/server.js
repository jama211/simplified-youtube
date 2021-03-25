"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var fileUpload = require('express-fileupload');
var cors = require('cors');
var fs = require('fs');
// Init express
var server = express();
var uploadDir = __dirname + "/../client/public/uploads/";
server.use(fileUpload());
server.use(cors());
// Listens for post requests and handles the uploading of a video file 
server.post('/upload', function (req, res) {
    if (req.files === null) {
        return res.status(400).json({ msg: 'Upload failed!' });
    }
    // Retrieve the file object from the request 
    if (req.files) {
        var newFile_1 = req.files.file;
        // Store the new file in the uploads folder 
        newFile_1.mv("" + uploadDir + newFile_1.name, function (err) {
            // If there was an error saving the file, log it and send status 500 (internal server error)
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            // Retrieve the currently stored list of videos, so we can append the new metadata to it and save 
            var currentData = JSON.parse(fs.readFileSync('data/videoList.json'));
            var newVideo = {
                id: currentData.videoList.length,
                path: "/uploads/" + newFile_1.name,
                name: "" + newFile_1.name,
                title: "" + req.body.videoTitle
            };
            currentData.videoList.push(newVideo);
            fs.writeFile('data/videoList.json', JSON.stringify(currentData, null, 2), function () {
                console.log("updated json file");
            });
            // Return info of the file's name and location now that it's uploaded
            res.json({ fileName: newFile_1.name, filePath: "/uploads/" + newFile_1.name });
        });
    }
});
// The route 'watch' serves metadata about a specific video (with id), including name and url 
server.get('/watch/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var currentData = JSON.parse(fs.readFileSync('data/videoList.json'));
    res.json(currentData.videoList[id]);
});
// The route videoList returns a json object of the list of all video metadata we store  
server.get('/videoList', function (req, res) {
    res.json(JSON.parse(fs.readFileSync('data/videoList.json')));
});
// Start the server... 
server.listen(5000, function () { return console.log('Video Data Management Server Started...'); });
