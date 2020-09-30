import React, { useState } from 'react'
import axios from 'axios'
import Progress from './tools/Progress';

const FileUpload = () => {

    // State... 
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState('Choose a file...');
    const [videoTitle, setVideoTitle] = useState('');
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [hasUploadedFile, setHasUploadedFile] = useState(false);

    function onChange(e){
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    function onTitleChange(e){
        setVideoTitle(e.target.value);
    }

    async function onSubmit(e){
        e.preventDefault(); 
        const formData = new FormData();
        formData.append('file', file);
        formData.append('videoTitle', videoTitle);

        try{
            // Attempt to upload the file... 
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, 
                onUploadProgress: progress => {
                    // Calculate upload percentage, and update the progress bar 
                    setUploadPercentage(parseInt(Math.round((progress.loaded * 100) / progress.total)));
                }
            });

            setUploadedFile(res.data);
            setHasUploadedFile(true);
        }
        catch(err){
            if(err.response.status === 500){
                console.log("Upload failed...");
            }
            else{
                console.log(err.response.data.msg);
            }
        }
    }

    return (
        <div className="upload">

            <h3>Upload A Video:</h3>

            <form onSubmit={onSubmit}>

                <div>
                    <input type="text" className="fileNameInput" placeholder="Video Title..." onChange={onTitleChange} />
                </div>
                
                <div>
                    <div className="custom-file">
                        <input type="file" accept="video/*" className="custom-file-input" id="fileUpload" onChange={onChange} />
                        <label className="custom-file-label" htmlFor="fileUpload">{fileName}</label>
                    </div>
                </div>

                <Progress percentage={uploadPercentage} /> 

                <input type="submit" value="Upload" />
            </form>

            {hasUploadedFile ? <div><h3>Upload Complete!</h3><a className="btn btn-outline-secondary" href="/">Back To Home...</a></div> : null }

            
        </div>
    )
}

export default FileUpload

