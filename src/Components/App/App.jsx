import "./App.css"
import SideBar from "../SideBar/sidebar.jsx";
import MainContent from "../MainContent/mainContent.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";


import { Provider } from "react-redux";
import { store } from "../../redux/store.js";

export default function App() {
    const [routePath , setRoutePath] = useState("/"); // to have diffrent content in the not fully rerendered components 
    
    window.addEventListener("load" , function() {
        if(window.location.pathname === "/") setRoutePath("/");
        else if(window.location.pathname === "/archives") setRoutePath("/archives");
    })
    
    return(
        <div className="container">
            <Provider store={store}>
                <Router>
                    <SideBar routePath={routePath} setRoutePath={setRoutePath} />
                    <MainContent routePath={routePath} />
                </Router>
            </Provider>
        </div>
    );
} 