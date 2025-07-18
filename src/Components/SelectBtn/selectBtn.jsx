import "./selectBtn.css"
import { useState } from "react";



export default function SelectBtn({text , svgPath = "" , options = false}) {
    const [showOption , setShowOption] = useState(false); // showing the options on true  , set on click

    // click handler for showing/hiding the options
    function clickHandler(event) {
        event.target.closest('button').lastElementChild.classList.toggle("rotate");
        setShowOption(!showOption);
    } 
    
    return (
        <div className="select-btn-container">
            <button className="select-btn" onClick={clickHandler}>
                {svgPath && <img width="20px" height="20px" src={svgPath} alt="" />} 
                <span>{text}</span>
                <img width="10px" height="7px"  src="./public/images/drop-icon.svg" alt="" />
            </button>
            <ul className="options-list">
                {showOption && options}
            </ul>
        </div>
    );
}


// option component for the SelectBtn parent component 

export function SelectOption({text , svgPath = "" , optionClickHandler = () => {}}) {
    return(
        <li className="select-option" onClick={optionClickHandler} >
            {svgPath && <img width="20px" height="20px" src={svgPath} alt="" />} 
            <span>{text}</span>
        </li>
    );
}
