import "./App.css"
import SideBar from "../SideBar/sidebar.jsx";
import MainContent from "../MainContent/mainContent.jsx";
import { useState } from "react";


export default function App() {
    const [routeNumber , setRouteNumber] = useState(0); // simple routing between pages until react router gets implemented
    return(
        <div className="container">
            <SideBar routeNumber={routeNumber} setRouteNumber={setRouteNumber} />
            <MainContent routeNumber={routeNumber} />
        </div>
    );
} 