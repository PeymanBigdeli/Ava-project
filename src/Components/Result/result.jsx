import "./result.css"
import { useState } from "react";
import ResultHeader from "../ResultHeader/resultHeader.jsx";
import ResultText from "../ResultText/resultText.jsx";
import AudioPlayer from "../AudioPlayer/audioPlayer.jsx";

export default function Result({
    selectedFile , 
    setSelectedFile , 
    textResult , 
    timeSlices  ,
    currMethod ,
    setIsDisabled ,
    isExpanded,
}) {
    const [resultType , setResultType] = useState("plain"); // saving the result type (plain / time-sliced) to show
    return(
        <div className="result-container">
            <ResultHeader selectedFile={selectedFile} 
                        setSelectedFile={setSelectedFile} 
                        textResult={textResult} 
                        resultType={resultType} 
                        setResultType={setResultType} 
                        currMethod={currMethod}
                        setIsDisabled={setIsDisabled}
                        isExpanded={isExpanded}
                    />
                    
            <ResultText textResult ={textResult} resultType={resultType} timeSlices={timeSlices}  currMethod={currMethod} />
            <AudioPlayer name={selectedFile.name} fileUrl={URL.createObjectURL(selectedFile)} currMethod={currMethod}/>
        </div>
    );  
}
