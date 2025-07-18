import "./svgBtn.css"
import { useState } from "react";

export default function SvgBtn({
    svgBtnType ,  
    svgPath  , 
    size , 
    setIsHovered , 
    isHovered , 
    selectedFile = null , 
    textResult = "",
    itemNumber = 0 ,
    setToDelete = () => {},
}) {

    const [popUp , setPopUp ] = useState({display: "none" , top: 0 , left : 0}); // showing or not showing the download size pop up
    const [deleteStyle , setDeleteStyle] = useState({}); // style for the delete svg btn 
    const fileSize = selectedFile?.size; // getting the file size if available 
    

    // initializing variables based on svgBtn type (download / copy / download text / delete)
    let index = null;
    let svgBtnClickHandler = () => {};   
    if(svgBtnType === "download") {
        svgBtnClickHandler = downloadHandler;
        index = 0;
    }
    else if(svgBtnType === "copy") {
        svgBtnClickHandler = copyHandler;
        index = 1;
    }
    else if(svgBtnType === "download-text") {
        svgBtnClickHandler = downloadTextHandler;
        index = 2;
    }
    else if(svgBtnType === "delete") {
        svgBtnClickHandler = deleteHandler;
        index = 3;
    };

    // hover hadlers 
    function mouseOverHandler(event) {
        let newIsHovered = isHovered.slice(0);
        newIsHovered[index] = true;
        if(svgBtnType === "delete") setDeleteStyle({
                backgroundColor: "#DC3545",
                borderRadius: "50%",               
            });
        setIsHovered(newIsHovered);
    }

    function mouseMoveHandler(event) {
        setPopUp({
            display: "flex",
            top: (event.clientY + 10)  + "px",
            left: (event.clientX + 5) + "px"
        });
    }

    function mouseLeaveHandler(event) {
        let newIsHovered = isHovered.slice(0);
        newIsHovered[index] = false;
        setIsHovered(newIsHovered);
                setPopUp({
            display: "none",
        });
        setDeleteStyle({});
    }


    // click handler for the download btn 
    function downloadHandler() {
        let fileUrl = URL.createObjectURL(selectedFile);

        let temp_a_tag = document.createElement('a');
        temp_a_tag.href = fileUrl;
        temp_a_tag.download = selectedFile.name; 

        document.body.appendChild(temp_a_tag);
        temp_a_tag.click();
        document.body.removeChild(temp_a_tag);
        URL.revokeObjectURL(fileUrl);
    }

    // click handler for the copy btn
    function copyHandler() { 
        window.navigator.clipboard.writeText(textResult); 
    }
    
    // click handler for the download text btn 
    function downloadTextHandler() {
        const blob = new Blob([textResult] , {type: "text/plain" });
        const textFileUrl = URL.createObjectURL(blob);

        let temp_a_tag = document.createElement("a");
        temp_a_tag.href = textFileUrl;
        temp_a_tag.download = `${selectedFile.name}.txt`;
        ;
        document.body.appendChild(temp_a_tag);
        temp_a_tag.click();
        document.body.removeChild(temp_a_tag);
        URL.revokeObjectURL(textFileUrl);
    }

    // click hendler for the delete btn
    function deleteHandler() {
        // console.log(itemNumber);

        setToDelete(itemNumber); 
    }


    return (
        <div className={"svg-btn" + ((svgBtnType === "delete") ? " delete-btn" : "")} 
            style={deleteStyle}
            onMouseOver={mouseOverHandler} 
            onMouseLeave={mouseLeaveHandler} 
            onMouseMove={(svgBtnType === "download") ? mouseMoveHandler : () => {}}
                onClick = {svgBtnClickHandler}
            >
            <img width={size} height={size} src={svgPath} alt="" />
            {(svgBtnType === "download") ?
                <div className="pop-up-info" style={popUp}>
                    <span>{(fileSize / (1024 ** 2)).toFixed(2)} مگابایت</span>    
                </div>
                :
                false
            }

        </div>
    );
}