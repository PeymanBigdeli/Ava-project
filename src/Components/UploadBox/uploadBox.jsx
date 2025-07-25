import "./uploadBox.css"
import UploadInputBtn from "../UploadInputBtn/uploadInputBtn.jsx";
import Result from "../Result/result.jsx";
import TimeSlice from "../TimeSlice/timeSlice.jsx";
import { formattedDate } from "../../Utility/utils.js";
import { useState , useEffect } from "react";

import {useDispatch , useSelector } from "react-redux";
import { incrementLastId } from "../../redux/lastIdSlice.js";
import { setIsDisabled } from "../../redux/isDisabledSlice.js";

export default function UploadBox({
    currMethod , 
    archiveItems , 
    setArchiveItems , 
}) {
    const [selectedFile , setSelectedFile] = useState(false);
    const [isDragEnable , setIsDragEnable] = useState(false);
    const [textResult , setTextResult] = useState("[با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او");
    const [timeSlices , setTimeSlices] = useState([{ startTime:"00:00" , finishTime: "00:03" , text: "[با]" , isActive:true },
                                                    { startTime:"00:03" , finishTime: "00:06" , text: "[---]" },
                                                    { startTime:"00:06" , finishTime: "00:08" , text: "[---]" },
                                                    { startTime:"00:08" , finishTime: "00:14" , text: "[با]" },
                                                    { startTime:"00:14" , finishTime: "00:19" , text: "[بردی]" },
                                                    { startTime:"00:19" , finishTime: "00:22" , text: "[که چشمک]" },
                                                    { startTime:"00:22" , finishTime: "00:27" , text: "ولی ازت میخوام" },
                                                    { startTime:"00:27" , finishTime: "00:30" , text: "[آرام]" },
                                                    { startTime:"00:30" , finishTime: "00:34" , text: "چه جوری شد" },]);
    
    const lastId = useSelector(state => state.lastId.value);
    const isRecording = useSelector(state => state.isRecording.value);
    const loadingTranscribe = useSelector(state => state.loadingTranscribe.value);
    const dispatch = useDispatch();
        
    // incrementing the id after each file to have it ready for the next      
    useEffect(()=> {
        if(selectedFile) {
            dispatch(incrementLastId());
        }
    } , [selectedFile]);


    // drag and drop handlers for the file input 
    function dragOverHandler(event) {
        event.preventDefault();  
        setIsDragEnable(true);
    }
    function dragLeaveHandler(event) {
        event.preventDefault();  
        setIsDragEnable(false);
    }
    function dropHandler(event) {
        event.preventDefault();    
        event.stopPropagation();
        setIsDragEnable(false);
        let currFile = event.dataTransfer.files[0];
        if(currFile && (currFile.type.startsWith("audio/") || currFile.type.startsWith("video/")) ) {
            
            
            let newArchiveElem =  {
                key: lastId,
                itemNumber: lastId,
                uploadMethod: "file",
                uploadDate: formattedDate(),
                selectedFile: currFile,
            };
            
            let newArchives = [newArchiveElem , ...archiveItems];

            dispatch(setIsDisabled(true));
            setSelectedFile(currFile);
            setArchiveItems(newArchives);
        };
    }

    // settimg color style based on upload input 
    let styleColor = "#00BA9F";
    let uploadBoxMessage = <><p>برای شروع به صحبت، دکمه را فشار دهید</p><p>متن پیاده شده آن، در اینجا ظاهر میشود</p></>
    if(isRecording) uploadBoxMessage = <p></p>
    if(currMethod === "file") {
        styleColor = "#118AD3";
        uploadBoxMessage = <><p>برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید</p><p>متن پیاده شده آن، در اینجا ظاهر میشود</p></>
    } 
    else if(currMethod === "link") {
        styleColor = "#FF1654";
        uploadBoxMessage = <><p>نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد</p><p>و دکمه را فشار دهید</p></>
    }


    return (
        <div className={"upload-box" + ((isDragEnable && currMethod === "file") ? " upload-box-dragged" : "")} 
        style={{
            border: "1px solid " +  styleColor,
            borderTopRightRadius: (currMethod === "record") ? "0" : "25px",
        }}
        onDragOver={(currMethod === "file") ?  dragOverHandler : () => {}}
        onDragLeave={(currMethod === "file") ?  dragLeaveHandler : () => {}}
        onDrop={(currMethod === "file") ?  dropHandler : () => {}}
        >
            {!selectedFile ?            
                <div className="upload-input">  
                    <UploadInputBtn currMethod={currMethod}
                                    styleColor={styleColor}
                                    setSelectedFile={setSelectedFile}
                                    archiveItems={archiveItems}
                                    setArchiveItems={setArchiveItems}
                                    setTextResult={setTextResult}
                                    setTimeSlices={setTimeSlices}
                                    />
                    {uploadBoxMessage}
                </div>
                :
                false
            }
            {selectedFile ?            
                <div className="upload-result">
                    <Result selectedFile={selectedFile}  
                            setSelectedFile={setSelectedFile}  
                            timeSlices={timeSlices.map(timeSlice => <TimeSlice key={timeSlice.startTime} startTime={timeSlice.startTime} finishTime={timeSlice.finishTime} text={timeSlice.text} isActive={timeSlice.isActive ?? false} /> ) } 
                            textResult={textResult} 
                            currMethod={currMethod} 
                        />
                </div>
                :
                false
            }
            {loadingTranscribe ? 
                <div className="loading-transcribe">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{shapeRendering: "auto", display: "block", background: "transparent"}} width={36} height={36} xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g>
                            <g>
                            <path
                                strokeWidth={12}
                                stroke={styleColor}
                                fill="none"
                                d="M50 35A15 15 0 1 0 64.88172051971716 48.12000149653544"
                            />
                            <path fill={styleColor} d="M49 25L49 45L59 35L49 25" />
                            <animateTransform
                                keyTimes="0;1"
                                values="0 50 50;360 50 50"
                                dur="1.9607843137254901s"
                                repeatCount="indefinite"
                                type="rotate"
                                attributeName="transform"
                            />
                            </g>
                            <g />
                        </g>
                    </svg>
                </div>
            :
                false
            }
        </div>
    );
}