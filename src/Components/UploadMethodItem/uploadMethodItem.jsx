import "./uploadMethodItem.css"
import { useSelector } from "react-redux";

export default function UploadMethodItem({
  text , 
  svgPath ,   
  clickHandler , 
  isActive = false  , 
  currMethod , 
}) {
  
  const isDisabled = useSelector(state => state.isDisabled.value);

    // setting the color style based on the upload method
    let styleColor = "#00BA9F";
    if(currMethod === "file") styleColor = "#118AD3";
    else if(currMethod === "link") styleColor = "#FF1654";
    
    return(     
        <li className={"upload-method-item" + (isDisabled ? " disabled" : "") }
          style={isActive ? {
            color: "#FFFFFF",
            backgroundColor: styleColor,
          } : {}} 
          onClick={clickHandler}>
                <img src={svgPath} alt="" />
                <span>{text}</span>
        </li>
    );
}