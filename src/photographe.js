import data from '../data.json';

//permet de recuperer les information passé dans l'url
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log(id, data.photographers.find(photographer => photographer.id == id));

// const doc = document.getElementById("bloc_main");

// let img = document.createElement("img");
// doc.append(img);
// img.src = id.portrait;