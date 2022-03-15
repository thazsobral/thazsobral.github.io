fetch("https://api.github.com/users/thazsobral")
    .then (function (response) {
        return response.json()
    })
    .then (function(data) {
        const text = data.bio
        setBio(text)
    })
    .catch (function () {
        console.error("Error")
    })

function setBio(data) {
    const bio = document.getElementById("bio-text").innerText(data)
}
