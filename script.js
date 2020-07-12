fetch('https://api.github.com/users/thazsobral/repos')
  .then (function (response) {
    return response.json()
  })
  .then (function(data) {
    setPortifolio(data)
  })
  .catch (function () {
    console.error('Error')
  })

function setPortifolio (repos) {
  const writeSpace = getWriteSpace('portfolio')
  repos.forEach((repo, id) => {
    // elementos que começam com # não devem ser exibidos

    if(repo.name !== '#') {
      var nameProject = document.createTextNode((id + 1 )+ ' - ' + repo.name)
      var linkProject = document.createElement('a')
      var repoTopic = document.createElement('h2')

      linkProject.setAttribute('href', repo.html_url)
      
      linkProject.appendChild(nameProject)
      repoTopic.appendChild(linkProject)
      writeSpace.appendChild(repoTopic)
    }
  })
}

function getWriteSpace (id) {
  return document.getElementById(id)
}
