// busca o ano atual
const current = new Date();
let year = current.getFullYear();

// preenche no footer do html
document.getElementById("current-year").innerText = year;
