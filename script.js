fetch('https://api.github.com/users/thazsobral')
  .then (function (response) {
    return response.json()
  })
  .then (function(data) {
    setImageInPage(data.avatar_url)
  })
  .catch (function () {
    console.log('Error')
  })

function setImageInPage (url) {
  const imageElement = getImageElement()
  imageElement.setAttribute('src', url)
}

function getImageElement () {
  return document.getElementById('bio-image')
}
