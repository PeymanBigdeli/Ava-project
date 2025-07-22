import "./svgBtn.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToDelete } from "../../redux/toDelete"; 

export default function SvgBtn({
    svgBtnType ,  
    svgPath  , 
    size , 
    setIsHovered , 
    isHovered , 
    selectedFile = null , 
    textResult = "",
    itemNumber = 0 ,
}) {

    const [popUp , setPopUp ] = useState({display: "none" , top: 0 , left : 0}); // showing or not showing the download size pop up
    const [deleteStyle , setDeleteStyle] = useState({}); // style for the delete svg btn 
    const fileSize = selectedFile?.size; // getting the file size if available 
    
    const dispatch = useDispatch();

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
    async function deleteHandler() {
        try {
            console.log(itemNumber);
            let deleteResponse = await fetch(`/api/requests/${itemNumber}/` , {
                method: "DELETE",
                headers: {
                    Authorization: 'Token a85d08400c622b50b18b61e239b9903645297196',
                },
            });
            if(!deleteResponse.ok) throw new Error("Could not delete from the server. Maybe try after refreshing the page"); // API does not send back  the id needed at transcribe call
                                                                                                                             // Any action towards retrieving the id at this point or any point in the program causes overhead
                                                                                                                             // if the id was returned by the api which seems like a reasonable expectation all deletes would work on first try     
            
        }
        catch(err) {
            console.error(err);
        }
        finally {
            dispatch(setToDelete(itemNumber))
        }   
    }


    return (
        <div className={"svg-btn" + ((svgBtnType === "delete") ? " delete-btn" : "") + ((svgBtnType === "download" && selectedFile.size === 0) ? " disabled" : "")} 
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