import "./audioPlayer.css"
import { timeConvert } from "../../Utility/utils";
import { useState , useRef} from "react";

export default function AudioPlayer({name , fileUrl , currMethod}) {
    const audioRef = useRef(null);
    const [isPlaying , setIsPlaying] = useState(false);
    const [isMuted , setIsMuted] = useState(false);
    const [lastVolume , setLastVolume] = useState(0.7);
    const [timer , setTimer] = useState(0);
    const [lastFileName , setLastFileName] = useState(null);

    // setting color style based on upload method
    let colorStyle = null;
    if(currMethod === "file")  colorStyle = "#118AD3";
    else if(currMethod === "link")  colorStyle = "#FF1654";
    else if(currMethod === "record")  colorStyle = "#00BA9F";
    

    // audio element control handlers 

    function pauseAudioHandler() { // to pause/play the audio
        isPlaying ? audioRef.current.pause() :  audioRef.current.play();
        setIsPlaying(!isPlaying); 
    }

    function stopAudioHandler() { // to stop and rewind the audio
        audioRef.current.currentTime = 0;
        audioRef.current.pause();
        setIsPlaying(false);
    }

    function muteAudioHandler() { // to mute/unmute the audio
        let currVolume = audioRef.current.volume; 
        audioRef.current.volume =  isMuted ?  lastVolume : 0;
        setLastVolume(currVolume);
        setIsMuted(!isMuted);   
    }

    function timeUpdateHandler() { // to update the progress bar on time updates of the audio
        document.getElementById("progress-bar-state").style.width = `${(audioRef.current.currentTime / audioRef.current.duration) * 100}%`;
        document.getElementById("progress-bar-head").style.left = `${(audioRef.current.currentTime / audioRef.current.duration) * 100}%`; 
        setTimer(audioRef.current.currentTime);
    }   

    function progressBarHandler(event) { // to update the progress bar anf audio time based on clicks on the progress bar
        let wholeWidth = +getComputedStyle(document.getElementById("progress-bar")).width.slice(0 , -2);
        let progressPercentage = (event.nativeEvent.offsetX / wholeWidth);
        document.getElementById("progress-bar-state").style.width = `${progressPercentage * 100}%`;  
        audioRef.current.currentTime = audioRef.current.duration * progressPercentage;
        setTimer(audioRef.current.currentTime); 
    }


    function audioLevelHandler(event) { // to handle the audio level bar
        let wholeWidth = +getComputedStyle(document.getElementById("audio-level-bar")).width.slice(0, -2);
        let audioLevel = (event.nativeEvent.offsetX / wholeWidth);
        document.getElementById("audio-level-progress").style.width = `${audioLevel * 100}%`;
        audioRef.current.volume = audioLevel;
        if((isMuted && audioRef.current.volume > 0) || (!isMuted && audioRef.current.volume === 0)) setIsMuted(!isMuted);
        setLastVolume(audioRef.current.volume);   
    }

    function  loadHandler() {    // initializing the audio when meta data has loaded 
        document.getElementById("time-stamp").firstElementChild.innerHTML = timeConvert(audioRef.current.duration);
        if(name !== lastFileName) {
            stopAudioHandler()
            setLastFileName(name);
        }
        else if(isPlaying) pauseAudioHandler();
        audioRef.current.currentTime = timer;
        setTimer(timer)
    }

    return (
        <div className={"uploaded-audio-container" + (fileUrl === "#" ? " disabled" : "")} >
            <audio hidden id="uploaded-audio" src={fileUrl} ref={audioRef} onLoadedMetadata={loadHandler} onTimeUpdate={timeUpdateHandler} onEnded={() => stopAudioHandler()}></audio>
            <div className="audio-player">
                <div className="audio-level">
                    <div id="audio-level-bar" onClick={audioLevelHandler}>
                        <div style={{backgroundColor : colorStyle}} id="audio-level-progress"></div>
                    </div>
                    <button className="volume-btn" onClick={muteAudioHandler}>
                        {isMuted ?
                            <img width="20px" height="20px" src="./public/images/mute-icon.svg" alt="" />
                            :
                            <img width="20px" height="20px" src="./public/images/volume-icon.svg" alt="" />
                        }
                    </button>
                </div>

                <div id="time-stamp">
                    <span>0:00</span>
                </div>

                <div id="progress-bar" onClick={progressBarHandler} >
                    <div style={{backgroundColor : colorStyle}} id="progress-bar-state"></div>
                    <div style={{backgroundColor : colorStyle}} id="progress-bar-head"></div>
                </div>

                <div className="audio-btns">
                    <button id="pause-btn" onClick={pauseAudioHandler}>
                        {isPlaying ? 
                            <img width="15px" height="15px" src="./public/images/pause-icon.svg" alt="" />
                            :   
                            <img width="15px" height="15px" src="./public/images/play-icon.svg" alt="" />
                        }
                    </button>
                    <button id="stop-btn" onClick={stopAudioHandler}>
                        <img width="15px" height="15px" src="./public/images/stop-icon.svg" alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
}

