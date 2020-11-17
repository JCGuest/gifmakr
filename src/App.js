import './App.css';
import React, { useState, useEffect } from 'react';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });


function App() {

  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();

  // initialize ffmpeg and setReady
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(() => {
    load();
  }, [])

  const convertToGif = async () => {
  // write file to memory
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

  // run the FFmpeg command
  await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');

  // read the result
  const data = ffmpeg.FS('readFile', 'out.gif');

  // create a URL
  const url = URL.createObjectURL(new Blob([data.buffer]));

  }

  return ready ? (
    // display video only when defined, convert video to URL for browser
    <div className= "App">
      { video && <video
                      controls
                      width="250"
                      src={URL.createObjectURL(video)}>
                 </video>      
      
      }

      <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))}></input>
      
    </div>
  ) :
  (<p>Loading...</p>);
}

export default App;