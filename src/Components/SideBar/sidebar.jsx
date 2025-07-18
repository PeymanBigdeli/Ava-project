import "./sidebar.css"
import NavButton from "../NavButton/navbutton.jsx";
import { Link } from "react-router-dom";


// Side bar component
export default function SideBar({routePath  , setRoutePath}) {
    return (
            <div className="sidebar-wrapper">
                <div className="sidebar">
                    <SideBarHeader />
                    <SideBarContent routePath={routePath} setRoutePath={setRoutePath} />
                </div>
            </div>
    );
}

// Sidebar components child SideBarHeader 
function SideBarHeader() {
    return(
        <div className="sidebar-header">
            <div className="main-title">
                <img src="./public/images/main-logo.svg" alt="" />
                <p>آوا</p>
            </div>
        </div>
    );
}

// Sidebar components child SideBarContent
function SideBarContent({routePath , setRoutePath}) {
    return(
        <div className="sidebar-content">
            <Link to="/" >
                <NavButton text={"تبدیل گفتار"}
                        svgPath={"./public/images/speech-icon.svg"}
                        clickHandler={() => {setRoutePath("/")}}
                        isActive={routePath === "/"}
                    />
            </Link>
            <Link to="/archives" >
                <NavButton text={"آرشیو"}  
                        svgPath={"./public/images/archive-icon.svg"}
                        clickHandler={() => {setRoutePath("/archives")}}
                        isActive={routePath === "/archives"} 
                    />
            </Link>
        </div>
    );
}