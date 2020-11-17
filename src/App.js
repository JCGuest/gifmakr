import './App.css';
import React, { useState, useEffect } from 'react';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });


function App() {

  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(() => {
    load();
  }, [])

  return ready ? (
    <div className= "App">

      <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))}></input>
      
    </div>
  ) :
  (<p>Loading...</p>);
}

export default App;