
let input = document.getElementById("input-box")
let button = document.getElementById("submit-buttom")
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

let date = new Date();
console.log(date.getTime());

let ts2 = new Date().getHours();
const [timestamp, apikey, hashValue] = [ts2, publickey, CryptoJS.MD5(ts + privateKey + publickey).toString()];


function displayWords(value) {
    input.value = value;
    removeElements();
}

function removeElements() {
    listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
    removeElements();
    if (input.value.length < 4) {
        return false;
    }

    var hora = new Date().getHours();
    var privateKey2 = "b005f4ffb8ef408051da3fd568270ba4f24c4410";
    var publicKey2 = "6ad508c89a98a4b4ad4ba0aa718ac7ca"
    var hash2 = CryptoJS.MD5(hora + privateKey2 + publicKey2).toString();


    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${hora}&apikey=${publicKey2}&hash=${hash2}&nameStartsWith=${input.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();

    jsonData.data["results"].forEach((result) => {
        let name = result.name;
        let div = document.createElement("div");
        div.style.cursor = "pointer";
        div.classList.add("autocomeplete-items");
        div.setAttribute("onclick", "displaWords('" +
            name + "')");
        let word = "<b>" + name.substr(0, input.value.length) + "</b>";
        word += name.substr(input.value.length);
        div.innerHTML = `<p class="item">${word}</p>`;
        listContainer.appendChild(div);
    });


});

function displaWords(name) {
    removeElements();
    input.value = name;
    button.click();
}


button.addEventListener("click", (getRsult = async () => {

    if (input.value.trim().length < 1) {
        alert("Entrada não pode ficar um Branco");
    }

    var hora = new Date().getHours();
    var privateKey2 = "b005f4ffb8ef408051da3fd568270ba4f24c4410";
    var publicKey2 = "6ad508c89a98a4b4ad4ba0aa718ac7ca"
    var hash2 = CryptoJS.MD5(hora + privateKey2 + publicKey2).toString();


    showContainer.innerHTML = "";
    const url2 = `https://gateway.marvel.com:443/v1/public/characters?ts=${hora}&apikey=${publicKey2}&hash=${hash2}&name=${input.value}`;

    const response = await fetch(url2);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {
        showContainer.innerHTML = `<div
            class="card-container">  
            <div class="container-character-image">
            <img src="${element.thumbnail["path"] + "." + element.
                thumbnail["extension"]
            }"/></div>
            <div class="character-name">${element.name}
            </div>
            <div class="character-description">${element.
                description}</div>
            </div>`;

    });
})
);
window.onload = () => {
     getRsult();
 };