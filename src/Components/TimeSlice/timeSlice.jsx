import "./timeSlice.css"

// craeting time slices for result text 
export default function TimeSlice({startTime , finishTime , text , isActive = false}) {
    return (
        <li className="time-slice-item" style={isActive ? {color: "#118AD3"} : {}}>
           <span className="finish-time">{finishTime}</span> 
           <span className="start-time" >{startTime}</span> 
           <span className="text" >{text}</span> 
        </li>
    );
}



