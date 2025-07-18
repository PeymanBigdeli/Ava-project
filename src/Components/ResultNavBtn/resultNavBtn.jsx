import "./resultNavBtn.css"

// creates a navingation button for the Result componrnt 
export default function ResultNavBtn({navBtnType , text , svgPath , isActive , setResultType}) {
    return (
        <div className={"result-header-nav-btn" + (isActive ? " active-nav-btn" : "" )}
            onClick={!isActive ? () => setResultType(navBtnType) : () => {}}
            >
            <div className="result-nav-btn-flex-container">
                <img src={svgPath} alt="" />
                <span>{text}</span>
            </div>
        </div>
    );
}