import "./uploadInputBtn.css"
import { useState , useRef } from "react";
import { formattedDate , timeConvert } from "../../Utility/utils";
import { useSelector , useDispatch } from "react-redux";
import { setIsDisabled  } from "../../redux/isDisabledSlice";
import { setIsRecording } from "../../redux/isRecordingSlice";
import { setLoadingTranscribe } from "../../redux/loadingTranscribe";

export default  function UploadInputBtn({
        currMethod ,
        styleColor , 
        setSelectedFile , 
        archiveItems,
        setArchiveItems,
        setTextResult,
        setTimeSlices,
    }) {

    const [isPaused , setIsPaused] = useState(false);
    const [timeElapsed , setTimeElapsed] = useState(0);
    const timeIntervalRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const streamDataRef = useRef([]);

    const lastId = useSelector(state => state.lastId.value);
    const isRecording = useSelector(state => state.isRecording.value);
    const dispatch = useDispatch();

    let svgPath = "./public/images/mic-icon.svg";
    if(currMethod === "file") svgPath = "./public/images/upload-icon.svg";
    else if(currMethod === "link") svgPath = "./public/images/chain-icon.svg";

    // to set the audio/video uploaded via file 
    function fileChangeHandler(event) {
        const currFile = event.target.files[0];
        if(currFile) {
            let newArchiveElem =  {
                key: lastId,
                itemNumber: lastId,
                uploadMethod: "file",
                uploadDate: formattedDate(),
                selectedFile: currFile,
            };

            let newArchives = [newArchiveElem , ...archiveItems];

            setArchiveItems(newArchives);
            dispatch(setIsDisabled(true));
            setSelectedFile(currFile)
        };        
    }

    // getting the audio via link
    async function linkChangeHandler(linkValue) {
        dispatch(setLoadingTranscribe(true));
        try {
            let proxyLink = null;
            if(linkValue.startsWith("http://tmpfiles.org")) {                
                proxyLink = linkValue.replace("http://tmpfiles.org" , "/tmpfile");
            }
            let response = await fetch(proxyLink ? proxyLink : linkValue);
            if(!response.ok) throw new Error("FileLink response not ok" , response);

            let blob = await response.blob();
            if( !(blob.type.startsWith("audio/") || blob.type.startsWith("video/"))) throw new Error("Unsupported file type");
            
            let newFile = new File([blob] , /\/([^\/]+)$/.exec(linkValue) , {type: blob.type});


            let newArchiveElem =  {
                key: lastId,
                itemNumber: lastId,
                uploadMethod: "link",
                uploadDate: formattedDate(),
                selectedFile: newFile,
                textResult: "",
                timeSlices: [],
            };
            fetch("/api/transcribe_files/" , {
                method : "POST",
                headers: {
                    Authorization: "Token a85d08400c622b50b18b61e239b9903645297196",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"media_urls": [linkValue]}),   
            })
                .then(res => {
                    if(!res.ok) throw new Error("Res not ok")
                    else return res.json();
                })
                .then(responseJSON => responseJSON[0])
                .then(result => result.segments)
                .then(segments => {
                    let textResult = "";
                    for (let segment of segments) {
                        textResult += segment.text; 
                        newArchiveElem.timeSlices.push({
                            startTime: segment.start.slice(2,6),
                            finishTime: segment.end.slice(2,6) ,
                            text: segment.text,
                        }); 
                    }
                    return textResult;
                })
                .then(textResult => {
                    newArchiveElem.textResult = textResult
                    
                    let newArchives = [newArchiveElem , ...archiveItems];

                    setTextResult(newArchiveElem.textResult);
                    setTimeSlices(newArchiveElem.timeSlices);
                    setArchiveItems(newArchives);
                    dispatch(setIsDisabled(true));
                    setSelectedFile(newFile);
                    dispatch(setLoadingTranscribe(false));
                })
                .catch(err => {
                    dispatch(setLoadingTranscribe(false));
                    console.log(err);
                    
                });
        }
        catch(err) {
            console.error(err);
            dispatch(setLoadingTranscribe(false));
        }
         
    }

    // getting the audio/video via voice record  
    async function recordVoiceStart() {
        dispatch(setIsDisabled(true));
        const audioStream = await navigator.mediaDevices.getUserMedia({audio: true});
        mediaRecorderRef.current = new MediaRecorder(audioStream);
        
        mediaRecorderRef.current.start();
        dispatch(setIsRecording(true));
        streamDataRef.current = [];

        mediaRecorderRef.current.addEventListener("dataavailable" , event => streamDataRef.current.push(event.data));
        mediaRecorderRef.current.addEventListener("stop" , function(event) {
            const blob = new Blob(streamDataRef.current , {type: "audio/wav"});
            const newFile = new File([blob] , "recording" , {type:blob.type , lastModified: Date.now()});
            
            let newArchiveElem =  {
                key: lastId,
                itemNumber: lastId,
                uploadMethod: "record",
                uploadDate: formattedDate(),
                selectedFile: newFile,
            };

            let newArchives = [newArchiveElem , ...archiveItems];

            // fetch("/api/transcribe_files/" , {
            //     method : "POST",
            //     headers: {
            //         Authorization: "Token a85d08400c622b50b18b61e239b9903645297196",
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({"media_urls": ["http://tmpfiles.org/dl/6469400/recording4.m4a"]}),   
            // })
            //     .then(res => res.json())
            //     .then(result => console.log(result))
            //     .catch(err => console.log(err));

            setArchiveItems(newArchives);
            setSelectedFile(newFile);
        });

        timeIntervalRef.current = setInterval(function() {
            setTimeElapsed(prevTime => prevTime + 1);
        } , 1000);

    }
    
    // handler for stoping the voice record 
    function recordVoiceStop() {
        mediaRecorderRef.current.stop();
        dispatch(setIsRecording(false));
        clearInterval(timeIntervalRef.current);
    }

    // handler to pause the voice record
    function recordVoicePause() {
        if(!isPaused) {
            mediaRecorderRef.current.pause();
            setIsPaused(true);
            clearInterval(timeIntervalRef.current);
        }
        else {
            mediaRecorderRef.current.resume();
            setIsPaused(false);
            timeIntervalRef.current = setInterval(function() {
                setTimeElapsed(prevTime => prevTime + 1);
            } , 1000);
        }
    }


    // focus/blur handlers for link input 
    function focusHandler(event) {
        event.target.parentElement.style.outline = "1px solid #FF1654";  
    }

    function blurHandler(event) {
        event.target.parentElement.style.outline = "none";
    }


    // conditional rendering based on current method of uploading 

    if(currMethod === "link"){
        return(
          <div className="link-input">
            <input type="text" 
                dir="ltr"
                lang="en"
                placeholder="example.com/sample.mp3"
                onFocus={focusHandler} 
                onBlur={blurHandler} 
                onKeyUp={(event) => {
                        if(event.key !== "Enter") return;
                        linkChangeHandler(event.target.value);
                        event.target.value = "";
                    }}
                />
            <button onClick={(event) => {
                 linkChangeHandler(event.target.closest(".link-input").firstElementChild.value);
                 event.target.closest(".link-input").firstElementChild.value = "";
            }} >
                <img src={svgPath} alt="" />
            </button>
          </div>  
        );
    }

    if(currMethod === "file") {
        return (
            <button className="upload-input-btn" 
            style={{backgroundColor: styleColor}} 
            onClick={(event) => {
                    event.stopPropagation();
                    event.target.closest('button').lastElementChild.click();                
                }
            }>
                <img src={svgPath} alt="" />
                <input type="file" hidden accept="audio/*,video/*" onChange={fileChangeHandler}/>
            </button>
        );
    }

    return (
        <>
            {!isRecording ?
                <button className={"upload-input-btn"} style={{backgroundColor: styleColor}} onClick={recordVoiceStart}>
                    <img src={svgPath} alt="" />
                </button>
                :
                <div className="record-control-btns">
                    <div className="record-pause-btn-container" >
                        <button className={"record-pause-btn" + (isPaused ? " record-paused" : "")}  onClick={recordVoicePause} >
                            <img width="17px" height="17px" src="./public/images/pause-icon-light.svg" alt="" />
                        </button>
                    </div>  
                    <div className="record-stop-btn-container">
                        <span>{timeConvert(timeElapsed)}</span>
                        <button className="record-stop-btn" onClick={recordVoiceStop}>
                            <img width="15px" height="15px" src="./public/images/stop-icon-dark.svg" alt="" />
                        </button>
                    </div>
                </div>
            }
        </>
    );
}   