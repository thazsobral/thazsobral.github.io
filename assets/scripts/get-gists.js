fetch("https://api.github.com/users/thazsobral/gists")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        setPosts(data);
    })
    .catch(function(error) {
        console.error(`Error: ${error}`);
    });

function setPosts(posts) {
    const writeSpace = getWriteSpace("posts-github");
    let id = 0;
    posts.forEach(post => {
        id ++;

        let updatedDate = convertDate(post.updated_at);
        let postTitle = document.createTextNode(`${id} - ${post.description} - (${updatedDate})`);
        let postLink = document.createElement("a");
        let postTopic = document.createElement("h2");

        postLink.setAttribute("href", post.html_url);
        
        postLink.appendChild(postTitle);
        postTopic.appendChild(postLink);
        writeSpace.appendChild(postTopic);
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