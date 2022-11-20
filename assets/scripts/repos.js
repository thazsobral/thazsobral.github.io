fetch("https://api.github.com/users/thazsobral/repos")
  .then (function (response) {
    return response.json()
  })
  .then (function(data) {
    setPortifolio(data)
  })
  .catch (function () {
    console.error("Error")
  })

function setPortifolio (repos) {
  const writeSpace = getWriteSpace("portfolio-github")
  var id = 0
  repos.forEach((repo) => {
    // elementos que começam com - não devem ser exibidos

    if(repo.name !== "ThazSobral.github.io" & repo.name[0] !== "-") {
      id ++
      var nameProject = document.createTextNode((id) + " - " + repo.name)
      var linkProject = document.createElement("a")
      var repoTopic = document.createElement("h2")

      linkProject.setAttribute("href", repo.html_url)
      
      linkProject.appendChild(nameProject)
      repoTopic.appendChild(linkProject)
      writeSpace.appendChild(repoTopic)
    }
  })
}

function getWriteSpace (id) {
  return document.getElementById(id)
}
