import "./header.css"
import SelectBtn from "../SelectBtn/selectBtn.jsx";
import { SelectOption } from "../SelectBtn/selectBtn.jsx";

export default function Header({routePath}) {
    // setting the options it's select button will have (to add more options add them here and read the SelectOption.jsx)
    const options = [ 
        <SelectOption 
            key={1} 
            text={"خروج"} 
            svgPath="./public/images/logout.svg" 
        />
    ];
    return(
        <header className="header">
            <div className="header-nav">
                <SelectBtn text={"مهمان"} svgPath="./public/images/user-icon.svg" options={options}/>
            </div>
            <div style={routePath === "/archives" ? {textAlign: "right"}: {}} className="header-content">
                {routePath === "/" ?
                <>
                    <h1>تبدیل گفتار به متن</h1>
                    <p>آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف،<br /> زبان فارسی را یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد.</p>
                </>
                :  
                <>
                    <h2>آرشیو من</h2>
                </> 
                }
            </div>
        </header>
    );
}