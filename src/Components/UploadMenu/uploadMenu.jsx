import "./uploadMenu.css"
import UploadMethodItem from "../UploadMethodItem/uploadMethodItem.jsx";
import UploadBox from "../UploadBox/uploadBox.jsx";
import Setting from "../Setting/setting.jsx";
import { useState } from "react";

export default function UploadMenu({
    archiveItems ,
    setArchiveItems , 
}) {
    const [uploadMethod , setUploadMethod] = useState("record"); // saving the upload method used or to be used 
    
    return(
        <div className="upload-box-container">
            <ul className="upload-method-list">
                <UploadMethodItem text="ضبط صدا" svgPath={`./public/images/mic-icon${uploadMethod !== "record" ? "-inactive" : ""}.svg`} 
                            isActive={uploadMethod === "record"} 
                            clickHandler={() => setUploadMethod("record")} 
                            currMethod={uploadMethod}
                            />
                <UploadMethodItem text="بارگذاری فایل" svgPath={`./public/images/upload-icon${uploadMethod !== "file" ? "-inactive" : ""}.svg`}
                            isActive={uploadMethod === "file"} 
                            clickHandler={() => setUploadMethod("file")} 
                            currMethod={uploadMethod}
                            />
                <UploadMethodItem text="لینک" svgPath={`./public/images/chain-icon${uploadMethod !== "link" ? "-inactive" : ""}.svg`} 
                            isActive={uploadMethod === "link"} 
                            clickHandler={() => setUploadMethod("link")} 
                            currMethod={uploadMethod} 
                            />
            </ul>

            <UploadBox currMethod={uploadMethod}
                     archiveItems={archiveItems} 
                     setArchiveItems={setArchiveItems} 
                />

            <Setting />
        </div>
    );
}