import "./mainContent.css"
import Header from "../Header/header.jsx";
import UploadMenu from "../UploadMenu/uploadMenu.jsx";
import ArchiveList from "../ArchiveList/ArchiveList.jsx";
import { timeConvert  , getFileDuration , formattedDate , loadFile } from "../../Utility/utils.js";
import { ArchiveItem } from "../ArchiveList/ArchiveList.jsx";
import { useEffect, useState } from "react";
import { Routes , Route } from "react-router-dom";



export default function MainContent({routePath}) {
    const [archiveItems , setArchiveItems] = useState([]);
    const [expandedItem , setExpandedItem] = useState(0);
    const [currPage , setCurrPage] = useState(1);
    const [itemPerPage , setItemPerPage] = useState(2);
    const [lastId , setLastId] = useState(1);
    const [toDelete , setToDelete] = useState(0);

    // dynamically calculating the items each page can have to have a dynamic pagination  
    window.addEventListener("load" , () => setItemPerPage(calculateItemPerPage()));
    window.addEventListener("resize" , () => setItemPerPage(calculateItemPerPage()));




    // when an item gets expanded we update all items expandedItem prop
    useEffect(() =>{
        let newArchiveItems = archiveItems.map(item => ({...item , expandedItem: expandedItem}));
        setArchiveItems(newArchiveItems);
    } , [expandedItem]);                                                
    
    // when an item gets deleted we delete the item from the archive list
    useEffect(() => {
        let newArchiveItems = archiveItems.filter(item => item.itemNumber !== toDelete);
        setArchiveItems(newArchiveItems);
    } , [toDelete]);


    return (
        <div style={ window.location.pathname === "/archives" ? {paddingRight : "3rem"} : {}} className="main-content">
            <Header routePath={routePath} />
            <Routes>
                
                <Route path="/" 
                    element={<UploadMenu archiveItems={archiveItems} 
                                        setArchiveItems={setArchiveItems} 
                                        expandedItem={expandedItem} 
                                        setExpandedItem={setExpandedItem} 
                                        lastId={lastId} 
                                        setLastId={setLastId} 
                                        setToDelete={setToDelete} 
                                    />} 
                                />  

                <Route path="/archives" 
                    element={<ArchiveList currPage={currPage} 
                                    setCurrPage={setCurrPage}  
                                    allpages={Math.max(Math.ceil(archiveItems.length / itemPerPage) , 1)} 
                                    archiveItems={archiveItems.slice((currPage - 1) * itemPerPage ,  currPage * itemPerPage).map(item => <ArchiveItem key={item.key} 
                                                                                                                                                    itemNumber={item.itemNumber} 
                                                                                                                                                    expandedItem={item.expandedItem} 
                                                                                                                                                    setExpandedItem={item.setExpandedItem} 
                                                                                                                                                    uploadMethod={item.uploadMethod}  
                                                                                                                                                    uploadDate={item.uploadDate}  
                                                                                                                                                    selectedFile={item.selectedFile} 
                                                                                                                                                    setToDelete={setToDelete}
                                                                                                                                                    textResult={"[با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او"} 
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