import "./archiveResultHeader.css"
import SvgBtn from "../SvgBtn/svgBtn.jsx";
import { getFileDuration , timeConvert } from "../../Utility/utils.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpandedItem } from "../../redux/expandedItemSlice.js";


export default function ArchiveResultHeader({
    uploadMethod ,
    uploadDate ,
    selectedFile,
    itemNumber,
    textResult,
    duration,
}) {
    const [isHovered , setIsHovered] = useState([false , false , false , false]); // to save hover states of each svg btn
    const [fileDuration , setFileDuration] = useState("00:00");
    const expandedItem = useSelector(state => state.expandedItem.value);

    const dispatch = useDispatch();

    let fileName= selectedFile.name;
    let fileType =  `.${/\/([^\/]+)$/.exec(selectedFile.type)[1]}`; // getting the file type format we need using ReGex
    
    // getting the file duration from the File object and setting it
    if(!duration) getFileDuration(selectedFile).then(res => setFileDuration(timeConvert(res))); 

    // setting the style color based on upload method
    let colorStyle = "#40C6B8";
    let uploadMethodIcon = "mic";
    if(uploadMethod === "file") {
        colorStyle = "#118AD3";
        uploadMethodIcon = "upload";
    }
    else if(uploadMethod === "link") {
        colorStyle = "#FF1654";
        uploadMethodIcon = "chain";
        fileName = <a dir="ltr" lang="en" className="filename-link" href={fileName} target={"_blank"} >{fileName}</a>
    }



    // click handler for expandings and collapsings of archive items 
    function expandHandler() {
        if(expandedItem === itemNumber) dispatch(setExpandedItem(0));
        else {
            
            dispatch(setExpandedItem(itemNumber));
        }
        
    }

    return(
        <>
            <td>
                <div style={{backgroundColor: colorStyle}} className="upload-mathod-icon" onClick={expandHandler}>
                    <img src={`/images/${uploadMethodIcon}-icon.svg`} alt="" />
                </div>
            </td>
            <td>{fileName}</td>
            <td>{uploadDate}</td>
            <td dir="ltr">{fileType}</td>
            <td>{duration ?  duration : fileDuration}</td>
            <td>
                <div className="svg-btns-container">
                    <SvgBtn svgBtnType={"download"} 
                            svgPath={`/images/download-icon${isHovered[0] ? "-hovered" : ""}.svg`}
                            size={"17px"} 
                            isHovered={isHovered} 
                            setIsHovered={setIsHovered} 
                            selectedFile={selectedFile} 
                            itemNumber={itemNumber}
                        />
                    <SvgBtn svgBtnType={"download-text"} 
                            svgPath={`/images/word-icon${isHovered[2] ? "-hovered" : ""}.svg`} 
                            size={"17px"} 
                            isHovered={isHovered} 
                            setIsHovered={setIsHovered} 
                            selectedFile={selectedFile} 
                            itemNumber={itemNumber}
                            textResult={textResult}
                        />
                    <SvgBtn svgBtnType={"copy"} 
                            svgPath={`/images/copy-icon${isHovered[1] ? "-hovered" : ""}.svg`} 
                            size={"17px"} 
                            isHovered={isHovered} 
                            setIsHovered={setIsHovered} 
                            selectedFile={selectedFile} 
                            itemNumber={itemNumber}
                            textResult={textResult}
                        />

                    <SvgBtn svgBtnType={"delete"} 
                            svgPath={`/images/delete-icon${isHovered[3] ? "-hovered" : ""}.svg`} 
                            size={"17px"} 
                            isHovered={isHovered} 
                            setIsHovered={setIsHovered} 
                            selectedFile={selectedFile} 
                            itemNumber={itemNumber}
                        />

                </div>
            </td>
        </>
    );
}