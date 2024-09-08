import { useState, useRef, useEffect } from 'react';
import './App.css';
import song1 from 'C:/Users/nitik/OneDrive/Desktop/react harry/projects/ipod/src/songs/O Mahi O Mahi(PagalWorld.com.sb).mp3';
import song2 from 'C:/Users/nitik/OneDrive/Desktop/react harry/projects/ipod/src/songs/Aaj Ki Raat(PagalWorld.com.sb).mp3';
import song3 from 'C:/Users/nitik/OneDrive/Desktop/react harry/projects/ipod/src/songs/O Sajni Re(PagalWorld.com.sb).mp3';
import { FaRegPlayCircle,FaPauseCircle } from "react-icons/fa";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import image from './assets/images.jpeg'

function App() {
  const audioRef = useRef(null); 
  const [songIndex, setSongIndex] = useState(0); 
  const [songs, setSongs] = useState([song1, song2, song3]); 
  const [status, setStatus] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); 
  const [duration, setDuration] = useState(0); 

  // Update timer when audio plays
  useEffect(() => {
    if (audioRef.current) {
      const updateProgress = () => {
        setCurrentTime(audioRef.current.currentTime); // Update current time
        setDuration(audioRef.current.duration); // Update duration
      };

      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('loadedmetadata', updateProgress);

    }
  }, [songIndex, status]);

  // Play or pause the current song
  const changeStatus = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(songs[songIndex]); // Set current song
    }

    if (status) {
      audioRef.current.pause(); // Pause the audio
    } else {
      audioRef.current.play(); // Play the audio
    }

    setStatus(!status); // Toggle status
  };

  // Play the previous song
  const prevSong = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the current song before switching
    }
    let prevIndex = (songIndex - 1 + songs.length) % songs.length; // Get previous index
    audioRef.current = new Audio(songs[prevIndex]); // Load the previous song
    audioRef.current.play(); // Automatically play the previous song
    setSongIndex(prevIndex); // Update the song index
    setStatus(true); // Set to playing status
  };

  // Play the next song
  const nextSong = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the current song before switching
    }
    let nextIndex = (songIndex + 1) % songs.length; // Get next index
    audioRef.current = new Audio(songs[nextIndex]); // Load the next song
    audioRef.current.play(); // Automatically play the next song
    setSongIndex(nextIndex); // Update the song index
    setStatus(true); // Set to playing status
  };

  // Handle timer (range input) change to allow seeking within the song
  const handleTimerChange = (e) => {
    const seekTime = e.target.value; // Get the value from the range input
    audioRef.current.currentTime = seekTime; // Update the current time of the audio
    setCurrentTime(seekTime); // Update the current time state
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
    <div className="view">
      <img src={image} alt=' Song'/>
      <p>Song {songIndex+1}</p>
      <input
        type="range"
        name="player"
        value={currentTime}
        max={duration}
        onChange={handleTimerChange}
        className="timer"
      />
      <p>{formatTime(currentTime)} / {formatTime(duration)}</p>
      <button onClick={prevSong}><MdSkipPrevious /></button>
      <button onClick={changeStatus}>{status ?  <FaPauseCircle />: <FaRegPlayCircle />}</button>
      <button onClick={nextSong}><MdSkipNext /></button>
      </div>
    </>
  );
}

export default App;
