import "./resultText.css"


// Shoes the result text based on it's type (plain / time-sliced)
export default function ResultText({textResult , resultType, timeSlices , currMethod}) {
    if (resultType === "plain") {
        return (
        <div className="result-text">
            <p>{textResult}</p>
        </div>
        );
    }
    else if(resultType === "time-sliced") {
        return(
            <div className="result-text result-time-sliced-text">
                <ul>{timeSlices}</ul>
            </div>
        );
    }
}