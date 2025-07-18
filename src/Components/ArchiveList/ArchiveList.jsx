import "./archiveList.css"
import Result from "../Result/result.jsx";
import ArchiveResultHeader from "../ArchiveResultHeader/archiveResultHeader";
import TimeSlice from "../TimeSlice/timeSlice.jsx";
import { useState } from "react";

export default function ArchiveList({archiveItems , currPage , setCurrPage , allpages = 1}) {


    // pagination click handlers

    function nextPage() {
        setCurrPage(currPage + 1);
    }
    function prevPage() {
        setCurrPage(currPage - 1);
    }
    function findPage(event) {
        setCurrPage(+event.target.innerText);
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
    expandedItem , 
    setExpandedItem, 
    uploadMethod , 
    uploadDate , 
    selectedFile ,
    setToDelete,
}) {

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
                                    expandedItem={expandedItem}
                                    setExpandedItem={setExpandedItem}
                                    setToDelete={setToDelete}
                                    />    
            </tr>
            {isExpanded ?
            <tr style={{height: "20rem"}} className="archive-result">
                <td style={{width: "100%" , height: "100%" ,  padding: "0rem 2rem 2rem 1rem"}} colSpan={6}>
                    <Result selectedFile={selectedFile} 
                        textResult={"[با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او"}  
                        currMethod={uploadMethod}
                        isExpanded={isExpanded}
                        timeSlices={[
                                        <TimeSlice key={"00:00"} startTime={"00:00"} finishTime={"00:03"} text={"[با]"} isActive={true} />,
                                        <TimeSlice key={"00:03"} startTime={"00:03"} finishTime={"00:06"} text={"[---]"} />,
                                        <TimeSlice key={"00:06"} startTime={"00:06"} finishTime={"00:08"} text={"[---]"} />,
                                        <TimeSlice key={"00:08"} startTime={"00:08"} finishTime={"00:10"} text={"[با]"} />,
                                        <TimeSlice key={"00:14"} startTime={"00:14"} finishTime={"00:14"} text={"[بردی]"} />,
                                        <TimeSlice key={"00:19"} startTime={"00:19"} finishTime={"00:19"} text={"[که چشمک]"} />,
                                        <TimeSlice key={"00:22"} startTime={"00:22"} finishTime={"00:22"} text={"[باشه]"} />,
                                        <TimeSlice key={"00:27"} startTime={"00:27"} finishTime={"00:27"} text={"ولی ازت میخوام"} />,
                                        <TimeSlice key={"00:30"} startTime={"00:30"} finishTime={"00:30"} text={"[آرام]"} />,
                                        <TimeSlice key={"00:34"} startTime={"00:34"} finishTime={"00:34"} text={"چه جوری شد"} />
                                    ]}
                        />
                </td>
            </tr>
            :
            false
            }            
        </tbody>
    );
}