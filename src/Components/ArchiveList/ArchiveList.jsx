import "./archiveList.css"
import Result from "../Result/result.jsx";
import ArchiveResultHeader from "../ArchiveResultHeader/archiveResultHeader";
import TimeSlice from "../TimeSlice/timeSlice.jsx";
import { useState } from "react";

import {useDispatch , useSelector } from "react-redux";
import { setCurrPage } from "../../redux/currPageSlice.js";

export default function ArchiveList({archiveItems, allpages = 1}) {
    const currPage = useSelector(state => state.pagination.currPage);
    const dispatch = useDispatch();
    
    // pagination click handlers

    function nextPage() {
        dispatch(setCurrPage(currPage + 1));
        // setCurrPage(currPage + 1);
    }
    function prevPage() {
        dispatch(setCurrPage(currPage - 1));
        // setCurrPage(currPage - 1);
    }
    function findPage(event) {
        dispatch(setCurrPage(+event.target.innerText));
        // setCurrPage(+event.target.innerText);
    }

    // archive items returned as a table and each item as a tbody element
    return(
        <>
            <table className="archive-list"> 
                <thead className="archive-list-header">
                    <tr>
                        <th id="upload-method" ></th>
                        <th id="file-name">نام فایل</th>
                        <th id="upload-date">تاریخ بارگذاری</th>
                        <th id="file-type">نوع فایل</th>
                        <th id="duration">مدت زمان</th>
                        <th id="btns"></th>
                    </tr>
                </thead>
                {archiveItems}

            </table>

            <div className="pagination-container">
                <div className="pagination">
                    
                    {currPage !== 1 ?
                        <div className="page-back" onClick={prevPage} >
                            <img src="./public/images/right-arrow-icon.svg" alt="" />
                        </div>
                        :
                        false
                    }

                    <div className="pages">
                        { (currPage !== 1 && currPage !== 2 ) ? <span className="first-page" onClick={findPage} >1</span> : false }
                        {currPage > 2 && allpages > 3 ? "..." : false}
                        {currPage !== 1  ? <span className="prev-page" onClick={findPage} >{currPage - 1}</span> : false }
                        <span className="curr-page">{currPage}</span>
                        { currPage !== allpages ? <span className="next-page" onClick={findPage} >{currPage + 1}</span> : false }
                        {allpages - currPage > 1 && allpages > 3 ? "..." : false}
                        {(currPage !== allpages && currPage !== allpages - 1) ? <span className="last-page" onClick={findPage} >{allpages}</span> : false}
                    </div>

                    {currPage !== allpages ?
                        <div className="page-forward" onClick={nextPage} >
                            <img src="./public/images/left-arrow-icon.svg" alt="" />
                        </div>
                    :
                        false
                    }
                </div>
            </div>
        </>
    );
}



// Component that gets built every time a new audio/video file is added

export function ArchiveItem({ 
    itemNumber ,
    uploadMethod , 
    uploadDate , 
    selectedFile ,
    textResult,
    timeSlices,
    duration,
}) {

    const expandedItem = useSelector(state => state.expandedItem.value);

    let isExpanded = (expandedItem ? (itemNumber === expandedItem ) : false); // checking to see if the item has expanded or not
    
    // setting color based on the upload method
    let colorStyle = "#00BA9F";
    if(uploadMethod === "file") colorStyle = "#118AD3";
    else if(uploadMethod === "link") colorStyle = "#FF1654";


    return(
        <tbody style={isExpanded ? {border: `1.5px solid ${colorStyle}` } : {}} className="archive-item-container">
            <tr className="archive-item">
                <ArchiveResultHeader uploadMethod={uploadMethod} 
                                    itemNumber={itemNumber}
                                    uploadDate={uploadDate}
                                    selectedFile={selectedFile}
                                    textResult={textResult}
                                    duration={duration}
                                    />    
            </tr>
            {isExpanded ?
            <tr style={{height: "20rem"}} className="archive-result">
                <td style={{width: "100%" , height: "100%" ,  padding: "0rem 2rem 2rem 1rem"}} colSpan={6}>
                    <Result selectedFile={selectedFile} 
                        textResult={textResult}  
                        currMethod={uploadMethod}
                        isExpanded={isExpanded}
                        timeSlices={timeSlices}
                        />
                </td>
            </tr>
            :
            false
            }            
        </tbody>
    );
}