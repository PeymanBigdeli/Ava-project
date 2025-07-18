import "./navbutton.css"

// creates a navigation button 
export default function NavButton({text , svgPath , clickHandler , isActive}) {
    return(
        <button className={"nav-btn" +( isActive ? " active" : "")} onClick={clickHandler}>
            <img width="20px" height="20px" src={svgPath} alt="" />
            <span>{text}</span>
        </button>
    );
}