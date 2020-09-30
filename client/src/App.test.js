/*
 * Developer note:  
 * These tests I realise are very basic, this is my first time using the react testing library! 
 * Oh well, onwards anyway! 
 */

import React from 'react';
import { render, fireEvent } from "@testing-library/react";

import App from './App';
import FileUpload from './views/FileUpload';
import VideoPlayer from './views/VideoPlayer';

// Basic test to make sure it renders without crashing... 
it('The app renders without crashing!', () => {

    // Render the App 
    const { getByText, queryByTestId } = render(<App />);

    // Make sure the title is rendered (a bit naff, but hey why not!) 
    getByText("Simplified Youtube!"); 

    // Check that we have any videos displaying... 
    queryByTestId('videoBox'); 
}); 

// Test the upload screen 
it('The FileUpload component renders and functions!', () => {

    // Render the FileUpload component
    const { getByText, getByLabelText, getByPlaceholderText } = render(<FileUpload />);

    // Test the video title text 
    const videoTitleInput = getByPlaceholderText("Video Title..."); 
    fireEvent.change(videoTitleInput, { target: { value: "Test Video" } });

    // Make a fake file to test the upload 
    const file = new File(['FAKEFILECONTENT'], 'chucknorris.mp4', { type: 'video/mp4' });

    // Find the file upload input and pop that file in
    const fileUpload = getByLabelText('Choose a file...');
    Object.defineProperty(fileUpload, 'files', { value: [file] });

    // Click that upload button!  
    fireEvent.click(getByText("Upload"));
}); 

// Test the Player screen 
it('The VideoPlayer component renders and functions!', () => {

    // Render the VideoPlayer component
    const { queryByTestId } = render(<VideoPlayer />);

    // Check that a video element exists! 
    queryByTestId('videoElement');  
}); 