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
  const writeSpace = getWriteSpace("projects-list");
  let id = 0;
  repos.forEach((repo) => {
    // elementos que começam com - não devem ser exibidos
    if(repo.name !== "thazsobral.github.io" & repo.name[0] !== "-") {
      id ++;

      // cria o card para o projeto
      let card = document.createElement("li");
      card.setAttribute("class", "card");

      //cria o tópico
      let repoTopic = document.createElement("h2");
      let nameProject = document.createTextNode((id) + " - " + repo.name);

      let linkProject = document.createElement("a");
      linkProject.setAttribute("href", repo.html_url);

      linkProject.appendChild(nameProject);
      repoTopic.appendChild(linkProject);
      card.appendChild(repoTopic);

      if(repo.description !== null) {
        let description = document.createElement("p");
        description.className = "negative";
        description.innerText = repo.description;
        card.appendChild(description);
      }

      writeSpace.appendChild(card);
    }
  })
}

function getWriteSpace(id) {
  return document.getElementById(id);
}
