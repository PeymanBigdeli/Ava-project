import "./header.css"
import SelectBtn from "../SelectBtn/selectBtn.jsx";
import { SelectOption } from "../SelectBtn/selectBtn.jsx";

export default function Header({routePath , isApiResolved}) {
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
            <div style={routePath === "/archives" ? {textAlign: "right" , display: "flex"}: {}} className="header-content">
                {routePath === "/" ?
                <>
                    <h1>تبدیل گفتار به متن</h1>
                    <p>آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف،<br /> زبان فارسی را یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد.</p>
                </>
                :  
                <>
                    <h2>آرشیو من</h2>
                    {isApiResolved ?
                        false
                        :


                    <div className="load-animation">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{shapeRendering: "auto", display: "block", background: "transparent"}} width={36} height={36} xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g>
                            <g>
                            <path
                                strokeWidth={12}
                                stroke="#00ba9f"
                                fill="none"
                                d="M50 35A15 15 0 1 0 64.88172051971716 48.12000149653544"
                            />
                            <path fill="#00ba9f" d="M49 25L49 45L59 35L49 25" />
                            <animateTransform
                                keyTimes="0;1"
                                values="0 50 50;360 50 50"
                                dur="1.9607843137254901s"
                                repeatCount="indefinite"
                                type="rotate"
                                attributeName="transform"
                            />
                            </g>
                            <g />
                        </g>
                        </svg>

                    </div>
                    }
                </> 
                }
            </div>
        </header>
    );
}