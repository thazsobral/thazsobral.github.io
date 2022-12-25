fetch("https://api.github.com/users/thazsobral/gists")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        setTips(data);
    })
    .catch(function(error) {
        console.error(`Error: ${error}`);
    });

function setTips(tips) {
    const writeSpace = getWriteSpace("tips-list");
    let id = 0;
    tips.forEach(post => {
        id ++;

        // cria o card para o projeto
        let card = document.createElement("li");
        card.setAttribute("class", "card");
        // cria um titulo para o post
        let createdDate = convertDate(post.created_at);
        let postTitle = document.createTextNode(`${id} - ${post.description} - (${createdDate})`);
        let postTopic = document.createElement("h2");
        // cria link para post
        let postLink = document.createElement("a");
        postLink.setAttribute("href", post.html_url);
        
        postLink.appendChild(postTitle);
        postTopic.appendChild(postLink);
        card.appendChild(postTopic);
        writeSpace.appendChild(card);
    });
}

function convertDate(date) {
    let dateOnly = date.substring(0,10).split("-");
    if(dateOnly[0].length === 4) {
        return dateOnly.reverse().join("/");
    }
    return dateOnly.join("/");
}

function getWriteSpace(id) {
    return document.getElementById(id);
}