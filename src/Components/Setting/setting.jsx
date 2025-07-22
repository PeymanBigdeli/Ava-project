import "./setting.css"
import SelectBtn from "../SelectBtn/selectBtn.jsx";
import { SelectOption } from "../SelectBtn/selectBtn.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";


// Component to set the settings for user input by user itself 

export default function Setting() {
    const [isLangEn , setIsLangEn] = useState(false);
    const isDisabled = useSelector(state => state.isDisabled.value);

    return(
        <div className={"setting" + (isDisabled ? " disabled" : "")} >
            <div className="setting-field">
                <span>زبان گفتار:</span>
                <SelectBtn text={ isLangEn ? "انگلیسی" : "فارسی"}
                 options={[<SelectOption key={1}
                        text={ !isLangEn ? "انگلیسی" : "فارسی"} 
                        optionClickHandler={function(event) {
                            event.stopPropagation();
                            event.target.closest(".select-btn-container").firstElementChild.click();
                            setIsLangEn(!isLangEn);
                        }}
                    />]} 
                 />
            </div>
        </div>
    );
}