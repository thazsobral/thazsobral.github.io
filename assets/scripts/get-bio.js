fetch("https://raw.githubusercontent.com/thazsobral/thazsobral/refs/heads/main/README-PT.md")
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
    let stringPoint = "&#8203;";
    let lengthStringPoint = stringPoint.length;

    let writeSpace = document.getElementById("bio-resume");

    let positionsString = findSubstringPositions(bio, stringPoint);

    if (positionsString.length > 1) {
        let text = document.createElement("p");
        text.innerText = bio.slice(positionsString[0]+lengthStringPoint, positionsString[1]);
    
        writeSpace.appendChild(text);
    }
}

function findSubstringPositions(mainString, substring) {
  const positions = [];
  let indice = mainString.indexOf(substring);

  while (indice !== -1) {
    positions.push(indice);
    indice = mainString.indexOf(substring, indice + 1);
  }

  return positions;
}
