import "./sidebar.css"
import NavButton from "../NavButton/navbutton.jsx";
import { useState } from "react";


// Side bar component
export default function SideBar({routeNumber  , setRouteNumber}) {
    return (
            <div className="sidebar-wrapper">
                <div className="sidebar">
                    <SideBarHeader />
                    <SideBarContent routeNumber={routeNumber} setRouteNumber={setRouteNumber} />
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
function SideBarContent({routeNumber , setRouteNumber}) {
    return(
        <div className="sidebar-content">
            <NavButton text={"تبدیل گفتار"}
                     svgPath={"./public/images/speech-icon.svg"}
                     clickHandler={() => setRouteNumber(0)}
                     isActive={routeNumber === 0}
                />
            <NavButton text={"آرشیو"}  
                    svgPath={"./public/images/archive-icon.svg"}
                    clickHandler={() => setRouteNumber(1)}
                    isActive={routeNumber === 1} 
                />
        </div>
    );
}