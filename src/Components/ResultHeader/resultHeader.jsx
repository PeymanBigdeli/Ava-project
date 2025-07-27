import "./resultHeader.css"
import { useState } from "react";
import ResultNavBtn from "../ResultNavBtn/resultNavBtn.jsx";
import SvgBtn from "../SvgBtn/svgBtn.jsx";

import { useDispatch } from "react-redux";
import { setIsDisabled } from "../../redux/isDisabledSlice.js";

export default function ResultHeader({
    selectedFile , 
    setSelectedFile = () => {} , 
    textResult , 
    resultType , 
    setResultType , 
    currMethod,
    isExpanded= false,
}) {
    const [isHovered , setIsHovered] = useState([false , false]); // saving the hover state for svg btns 
    const dispath = useDispatch();

    // setting the color style based on the upload method
    let colorStyle = null;
    if(currMethod === "file")  colorStyle = "#118AD3";
    else if(currMethod === "link")  colorStyle = "#FF1654";
    else if(currMethod === "record")  colorStyle = "#00BA9F";
 
    // click handler for reseting the input
    function startOverHandler() {
        setSelectedFile(false);
        dispath(setIsDisabled(false));
    }

    return (
        <div style={!isExpanded ? {borderBottom: "0.25px solid rgba(0,0,0, 0.5)"} : {}} className="result-header">
            <div style={isExpanded ? {borderBottom: "0.25px solid rgba(0,0,0, 0.5)"} : {}} className="result-header-nav">  
                <ResultNavBtn navBtnType={"plain"} text={"متن ساده"} svgPath={`/images/text-icon.svg`} isActive={resultType === "plain"}  setResultType={setResultType} />
                <ResultNavBtn navBtnType={"time-sliced"} text={"متن زمان بندی شده"} svgPath={`/images/time-icon.svg`} isActive={resultType === "time-sliced"} setResultType={setResultType} />
            </div>

            {!isExpanded ?
                <div className="result-header-btns">
                    <div className="svg-btns-container">
                        <SvgBtn svgBtnType={"download"} svgPath={`/images/download-icon${isHovered[0] ? "-hovered" : ""}.svg`} size={"20px"}  setIsHovered={setIsHovered} isHovered={isHovered} selectedFile={selectedFile} />
                        <SvgBtn svgBtnType={"copy"}  svgPath={`/images/copy-icon${isHovered[1] ? "-hovered" : ""}.svg`} size={"20px"} setIsHovered={setIsHovered} isHovered={isHovered} textResult={textResult} />
                    </div>
                    <div className="start-over-btn-container">
                        <button
                            style={{backgroundColor: colorStyle}} 
                            id="start-over-btn" onClick={startOverHandler}>
                            <img src="/images/refresh-icon.svg" alt="" />
                            <span>شروع دوباره</span>
                        </button>
                    </div>
                </div>
            :
            false
            }





        </div>
    );
}