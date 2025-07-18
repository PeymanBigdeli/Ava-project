import "./uploadMenu.css"
import UploadMethodItem from "../UploadMethodItem/uploadMethodItem.jsx";
import UploadBox from "../UploadBox/uploadBox.jsx";
import Setting from "../Setting/setting.jsx";
import { useState } from "react";

export default function UploadMenu({
    archiveItems ,
    setArchiveItems , 
    expandedItem , 
    setExpandedItem , 
    lastId , 
    setLastId , 
}) {
    const [uploadMethod , setUploadMethod] = useState("record"); // saving the upload method used or to be used 
    const [isDisabled , setIsDisabled] = useState(false); // to chack btns to see if they are disabled and upgrading it when needed 
    

    return(
        <div className="upload-box-container">
            <ul className="upload-method-list">
                <UploadMethodItem text="ضبط صدا" svgPath={`./public/images/mic-icon${uploadMethod !== "record" ? "-inactive" : ""}.svg`} 
                            isActive={uploadMethod === "record"} 
                            clickHandler={() => setUploadMethod("record")} 
                            currMethod={uploadMethod}
                            isDisabled={isDisabled}
                            />
                <UploadMethodItem text="بارگذاری فایل" svgPath={`./public/images/upload-icon${uploadMethod !== "file" ? "-inactive" : ""}.svg`}
                            isActive={uploadMethod === "file"} 
                            clickHandler={() => setUploadMethod("file")} 
                            currMethod={uploadMethod}
                            isDisabled={isDisabled}
                            />
                <UploadMethodItem text="لینک" svgPath={`./public/images/chain-icon${uploadMethod !== "link" ? "-inactive" : ""}.svg`} 
                            isActive={uploadMethod === "link"} 
                            clickHandler={() => setUploadMethod("link")} 
                            currMethod={uploadMethod} 
                            isDisabled={isDisabled}
                            />
            </ul>

            <UploadBox currMethod={uploadMethod}
                     setIsDisabled={setIsDisabled} 
                     archiveItems={archiveItems} 
                     setArchiveItems={setArchiveItems} 
                     expandedItem={expandedItem} 
                     setExpandedItem={setExpandedItem} 
                     lastId={lastId} 
                     setLastId={setLastId}
                />

            <Setting isDisabled={isDisabled}/>
        </div>
    );
}