fetch("https://api.github.com/users/thazsobral/repos")
  .then (function(response) {
    return response.json();
  })
  .then (function(data) {
    setPortifolio(data);
  })
  .catch (function(error) {
    console.error(`Error: ${error}`);
  });

function setPortifolio(repos) {
  const writeSpace = getWriteSpace("portfolio-github");
  let id = 0;
  repos.forEach((repo) => {
    // elementos que começam com - não devem ser exibidos
    if(repo.name !== "thazsobral.github.io" & repo.name[0] !== "-") {
      id ++;
      let nameProject = document.createTextNode((id) + " - " + repo.name);
      let linkProject = document.createElement("a");
      let repoTopic = document.createElement("h2");

      linkProject.setAttribute("href", repo.html_url);
      
      linkProject.appendChild(nameProject);
      repoTopic.appendChild(linkProject);
      writeSpace.appendChild(repoTopic);
    }
  })
}

function getWriteSpace(id) {
  return document.getElementById(id);
}
