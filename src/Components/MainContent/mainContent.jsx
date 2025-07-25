import "./mainContent.css"
import Header from "../Header/header.jsx";
import UploadMenu from "../UploadMenu/uploadMenu.jsx";
import ArchiveList from "../ArchiveList/ArchiveList.jsx";
import TimeSlice from "../TimeSlice/timeSlice.jsx";
import { timeConvert  , getFileDuration , formattedDate , loadFile } from "../../Utility/utils.js";
import { ArchiveItem } from "../ArchiveList/ArchiveList.jsx";
import { useEffect, useState , useRef } from "react";
import { Routes , Route } from "react-router-dom";

import { useSelector , useDispatch} from "react-redux";


export default function MainContent({routePath}) {
    const [archiveItems , setArchiveItems] = useState([]);
    const [isApiResolved , setIsApiResolved] = useState(false);
    const [itemPerPage , setItemPerPage] = useState(2);
    
    const currPage = useSelector(state => state.pagination.currPage);
    const toDelete = useSelector(state => state.toDelete.value);

    // dynamically calculating the items each page can have to have a dynamic pagination  
    window.addEventListener("load" , () => setItemPerPage(calculateItemPerPage()));
    window.addEventListener("resize" , () => setItemPerPage(calculateItemPerPage()));

    const isArchiveLoaded = useRef(false);

    useEffect(() => {   
        if(isArchiveLoaded.current) return;
        isArchiveLoaded.current = true;
        async function loadAllArchives() {
            try {
                let response = await fetch("/api/requests/" , {
                    headers: {
                        Authorization: "Token a85d08400c622b50b18b61e239b9903645297196",
                    }
                });
                
                if(response.ok) {
                    let results = (await response.json()).results;   
                    let newArchives = await Promise.all(results.map(async function(result) {
                        let resultFile = new File([""] ,  result.filename , { type: "audio/webm"} );;
                        try {
                            if (result.url.startsWith("http://tmpfiles.org"))  {
                                result.url = result.url.replace("http://tmpfiles.org" , "/tmpfile" ); // tepmorary solution for CORS problem until I set a proper proxy backend  
                            }      
                            let fileRes = await fetch(result.url);

                            if(fileRes.ok){
                                let blob = await fileRes.blob();
                                resultFile = new File([blob] , result.filename , {type :blob.type} ) 
                            }
                            else throw new Error("Audio/Video file not found");
                            
                        }
                        catch (err) {
                            console.error(err);
                        }

                        
                        let newArchive = {
                            key: result.id,
                            itemNumber: result.id,
                            uploadMethod: "link",
                            uploadDate: result.processed.slice(0,10),
                            selectedFile: resultFile,
                            duration: result.duration.slice(0,6), // to do (implement this formatting better) 
                            textResult: "",
                            timeSlices: [],
                        }

                        let textResult = "";
                        for (let segment of result.segments) {
                            textResult += segment.text; 
                            newArchive.timeSlices.push({
                                startTime: segment.start.slice(2,6),
                                finishTime: segment.end.slice(2,6) ,
                                text: segment.text,
                            }); 
                        }
                        newArchive.textResult = textResult;

                        return newArchive;
                    }));
                    setArchiveItems( prev => [...prev , ...newArchives]);
                    setIsApiResolved(true);
                    
                }
                else throw new Error("Fetch resonse is not ok");
            }
            catch(err) {
                console.log(err);
            }

        }
        // setIsApiResolved(true); 
        loadAllArchives();
    } ,[]);


    // when an item gets deleted we delete the item from the archive list
    useEffect(() => {
        let newArchiveItems = archiveItems.filter(item => item.itemNumber !== toDelete);
        setArchiveItems(newArchiveItems);
    } , [toDelete]);


    return (
        <div style={ window.location.pathname === "/archives" ? {paddingRight : "3rem"} : {}} className="main-content">
            <Header routePath={routePath} isApiResolved={isApiResolved} />
            <Routes>
                <Route path="/" element={<UploadMenu archiveItems={archiveItems} setArchiveItems={setArchiveItems} />} />  
                <Route path="/archives" 
                    element={<ArchiveList 
                                    // currPage={currPage} 
                                    // setCurrPage={setCurrPage}  
                                    allpages={Math.max(Math.ceil(archiveItems.length / itemPerPage) , 1)} 
                                    archiveItems={archiveItems.slice((currPage - 1) * itemPerPage ,  currPage * itemPerPage).map(item => <ArchiveItem key={item.key} 
                                                                                                                                                    itemNumber={item.itemNumber} 
                                                                                                                                                    uploadMethod={item.uploadMethod}  
                                                                                                                                                    uploadDate={item.uploadDate}  
                                                                                                                                                    selectedFile={item.selectedFile} 
                                                                                                                                                    duration={item.duration ? item.duration : ""}
                                                                                                                                                    textResult={item.textResult ??  "[با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او"}
                                                                                                                                                    timeSlices={item.timeSlices ?  
                                                                                                                                                        item.timeSlices.map(timeSlice => <TimeSlice key={timeSlice.startTime} startTime={timeSlice.startTime} finishTime={timeSlice.finishTime} text={timeSlice.text} isActive={timeSlice.isActive ?? false} /> )
                                                                                                                                                            :
                                                                                                                                                        [
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
                                                                                                                                                            ]
                                                                                                                                                    } 
                                                                                                                                                    />)} 

                                            
                                    />} 
                                />
            </Routes>
        </div>
    );
}  



// calculating item per page based on the height available 
function calculateItemPerPage() {
    let availableHeight = calculateAvailableHeight();
    let newItemPerpage = Math.max(Math.floor(availableHeight / 64 ) - 1 , 3);
    return newItemPerpage;
}


// calculating the available height 
function calculateAvailableHeight()  {
    let mainContentPads = +(getComputedStyle(document.getElementsByClassName("main-content")[0]).paddingTop).slice(0 , -2) * 2;
    let headerHeight = +(getComputedStyle(document.getElementsByClassName("header")[0]).height).slice(0 , -2);
    let paginationHeight = 0; 
    if(document.getElementsByClassName("pagination-container")[0]) paginationHeight = +(getComputedStyle(document.getElementsByClassName("pagination-container")[0]).height).slice(0 , -2) + +(getComputedStyle(document.getElementsByClassName("pagination-container")[0]).marginTop).slice(0 , -2); 
    
    let availableHeight = window.innerHeight - (mainContentPads + headerHeight + paginationHeight);
    return availableHeight;
}