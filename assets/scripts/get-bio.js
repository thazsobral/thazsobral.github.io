fetch("https://raw.githubusercontent.com/thazsobral/thazsobral/main/README.md")
    .then(function (response) {
        return response.text();
    })
    .then(function (data) {
        setBio(data);
    })
    .catch(function (error) {
        console.error(`Error: ${error}`);
    });

function setBio(bio) {
    let startSignal = "###";
    let endSignal = "👋";

    let [startPoint, endPoint] = startAndEndPoints(bio, startSignal, endSignal);
    
    let title = document.createElement("h3");
    title.innerText = bio.slice((startPoint+3), (endPoint+2));
    
    startSignal = "- ";
    endSignal = "---";
    
    [startPoint, endPoint] = startAndEndPoints(bio, startSignal, endSignal);
    
    let text = document.createElement("p");
    text.innerText = bio.slice(startPoint, endPoint);

    let writeSpace = document.getElementById("bio-resume");
    writeSpace.appendChild(title);
    writeSpace.appendChild(text);
}

function startAndEndPoints(text, startSignal, endSignal) {
    let startPoint = text.indexOf(startSignal);
    let endPoint = text.indexOf(endSignal);
    return [startPoint, endPoint];
}