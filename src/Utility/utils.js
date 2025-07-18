export async function loadFile(filePath) {
    let response = await fetch(filePath);
    let blob = await response.blob();
    let file = new File([blob] , /\/([^\/]+)$/.exec(filePath)  , {type: blob.type });
    return file;
}

export function formattedDate() {
    const date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2 , "0");
    let day = String(date.getDate() + 1).padStart(2 , "0");
    return `${year}-${month}-${day}`;
}

export function getFileDuration(file) {
    return new Promise((resolve , reject) => {
        const audio = document.createElement("audio");
        const filePath = URL.createObjectURL(file);
        audio.src = filePath;
        
        audio.addEventListener("loadedmetadata" , () => {
            URL.revokeObjectURL(filePath);
            resolve( Math.trunc(audio.duration));
        })

        audio.addEventListener("error" , () => reject(new Error("failed to load the file")));
    });
}


export function timeConvert(secs) {
    secs = +secs;
    let hour = Math.trunc(secs / 3600);
    secs = Math.trunc(secs % 3600);
    let min = Math.trunc(secs / 60);
    secs = Math.trunc(secs % 60);

    if(hour) {
        hour = String(hour);
        min = String(min).padStart(2 , "0");
        secs = String(secs).padStart(2 , "0");
        return `${hour}:${min}:${secs}`
    }
    else {
        min = String(min);
        secs = String(secs).padStart(2 , "0");
        return `${min}:${secs}`;
    }
}
