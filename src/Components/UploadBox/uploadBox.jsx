import "./uploadBox.css"
import UploadInputBtn from "../UploadInputBtn/uploadInputBtn.jsx";
import Result from "../Result/result.jsx";
import TimeSlice from "../TimeSlice/timeSlice.jsx";
import { formattedDate } from "../../Utility/utils.js";
import { useState , useEffect } from "react";

export default function UploadBox({
    currMethod , 
    isDisabled , 
    setIsDisabled , 
    archiveItems , 
    setArchiveItems , 
    expandedItem , 
    setExpandedItem ,
    lastId ,
    setLastId,
}) {
    const [isRecording , setIsRecording ] = useState(false);
    const [selectedFile , setSelectedFile] = useState(false);
    const [isDragEnable , setIsDragEnable] = useState(false);
    const [textResult , setTextResult] = useState("[با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او");
    const [timeSlices , setTimeSlices] = useState([
                                            <TimeSlice key={"00:00"} startTime={"00:00"} finishTime={"00:03"} text={"[با]"} isActive={true} />,
                                            <TimeSlice key={"00:03"} startTime={"00:03"} finishTime={"00:06"} text={"[---]"} />,
                                            <TimeSlice key={"00:06"} startTime={"00:06"} finishTime={"00:08"} text={"[---]"} />,
                                            <TimeSlice key={"00:08"} startTime={"00:08"} finishTime={"00:10"} text={"[با]"} />,
                                            <TimeSlice key={"00:14"} startTime={"00:14"} finishTime={"00:14"} text={"[بردی]"} />,
                                            <TimeSlice key={"00:19"} startTime={"00:19"} finishTime={"00:19"} text={"[که چشمک]"} />,
                                            <TimeSlice key={"00:22"} startTime={"00:22"} finishTime={"00:22"} text={"[باشه]"} />,
                                            <TimeSlice key={"00:27"} startTime={"00:27"} finishTime={"00:27"} text={"ولی ازت میخوام"} />,
                                            <TimeSlice key={"00:30"} startTime={"00:30"} finishTime={"00:30"} text={"[آرام]"} />,
                                            <TimeSlice key={"00:34"} startTime={"00:34"} finishTime={"00:34"} text={"چه جوری شد"} />]);
    
    // incrementing the id after each file to have it ready for the next      
    useEffect(()=> {
        if(selectedFile) {
            setLastId(lastId + 1);
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
                expandedItem: expandedItem,
                setExpandedItem: setExpandedItem,
                uploadMethod: "file",
                uploadDate: formattedDate(),
                selectedFile: currFile,
            };
            
            let newArchives = [newArchiveElem , ...archiveItems];

            setIsDisabled(true);
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
                                    setIsDragEnable={setIsDragEnable}
                                    isRecording={isRecording}
                                    setIsRecording={setIsRecording} 
                                    setIsDisabled={setIsDisabled}
                                    archiveItems={archiveItems}
                                    setArchiveItems={setArchiveItems}
                                    expandedItem={expandedItem}
                                    setExpandedItem={setExpandedItem}
                                    lastId={lastId}
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
                            timeSlices={timeSlices} 
                            textResult={textResult} 
                            currMethod={currMethod} 
                            setIsDisabled={setIsDisabled}
                        />
                </div>
                :
                false
            }
        </div>
    );
}