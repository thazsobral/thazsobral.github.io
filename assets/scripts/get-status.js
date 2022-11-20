fetch("https://api.github.com/users/thazsobral")
    .then(function(response) {
        return response.json()
    })
    .then( async function(data) {
        const text = data.bio
        await setStatus(text)
    })
    .catch(function() {
        console.error("Error")
    })

function setStatus(status) {
    const bio = document.getElementById("status-text")
    bio.innerText = status
}
