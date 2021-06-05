import data from '../data.json';
import createImage from './createImage';
// window.localStorage.clear();

// creation d'une Factory Method pour les videos ou les images

class Image {
    constructor () {
        const element = document.createElement("img");
        this.getElement = () => element
    }
}

class Video {
    constructor () {
        const element = document.createElement("video");
        this.getElement = () => element
    }
}

class ElementFactory {
    constructor () {
        this.create = (type) => {
            let elementClass;
            if (type == "image") {
                elementClass = new Image();
            } else if (type == "video") {
                elementClass = new Video();
            }
            return elementClass.getElement();
        }
    }
}

//permet de recuperer les information passé dans l'url
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

// permet de recuperer les medias qui corresponde au photographe 
let galleries = data.media.filter(media => media.photographerId == id);

// permet de retourner toutes les informations en rapport avec le photographe
let photographers = data.photographers.find(photographer => photographer.id == id);

// permet de retourner le resultat total de tous les likes des images du photographe
let total = galleries.reduce((a, b) => a + (b['likes'] || 0) , 0);

const info = document.getElementById("info")
const img = document.getElementById("img_photographer");

//info
const name = document.createElement("h2");
const city = document.createElement("h3");
const photographer_tagLine = document.createElement("p");
const bloc_photographers_tags = document.createElement("div");
const tarif_total = document.getElementById("tarif_total");
const total_like = document.getElementById("total_like");

info.append(name);
info.append(city);
info.append(photographer_tagLine);
info.append(bloc_photographers_tags);

name.innerHTML = photographers.name;
city.innerHTML = photographers.city+ ", " + photographers.country;
photographer_tagLine.innerHTML = photographers.tagline;
tarif_total.innerHTML = photographers.price+ "€ /jour";
total_like.innerHTML = total+ ' <i class="fas fa-heart"></i>';

//modal

document.querySelector(".modal-title").innerHTML = "Contactez-moi <br>" + photographers.name;

//class
name.setAttribute("class", "photographers");
city.setAttribute("class", "photographers_city");
bloc_photographers_tags.setAttribute("class", "bloc_photographers")

//aria-label
name.setAttribute("aria-label", photographers.name);
city.setAttribute("aria-label", photographers.city);
bloc_photographers_tags.setAttribute("aria-label", photographers.tagline)
total_like.setAttribute("aria-label", "like total de toutes les photos")
tarif_total.setAttribute("aria-label", "prix a la journée du photographe " + photographers.price + "€")


photographers.tags.forEach((photographer) => {
    //création de tous les élements pour les tags de chaque photographe
    const lien_photographers_tags = document.createElement("a");
    const photographers_tags = document.createElement("p");

    //affichage de tous les tags nécessaire pour chaque photographe
    photographers_tags.textContent = "#"+ photographer;

    //ajout de tous les tags dans la div parent (bloc_photographers_tags)
    bloc_photographers_tags.append(lien_photographers_tags);
    lien_photographers_tags.append(photographers_tags);

    //ajout de class à tous les éléments
    lien_photographers_tags.setAttribute("class", "lien_tag_photographe");
    photographers_tags.setAttribute("class", "photographers_tags");
    lien_photographers_tags.setAttribute("href", "#");
    photographers_tags.setAttribute("aria-label", photographer);

    //aria-label
    photographers_tags.setAttribute("aria-label", photographer);
}) 

img.src = "../img/Sample_Photos-2/Photographers_ID_Photos/"+photographers.portrait;


//dropdown

let title_button = document.getElementById("dropdownMenuButton1");
let titre = document.getElementById("titre");
let popularité = document.getElementById("popularite");
let date = document.getElementById("date");

// permet de faire un affichage en fonction du nom
titre.addEventListener("click", () => {
    title_button.innerHTML = titre.textContent;
    galleries.sort((a, b) => a.name > b.name);
    createImage(galleries, new ElementFactory(), photographers)
});

// permet de faire un affichage en fonction des likes
popularité.addEventListener("click", () => {
    title_button.innerHTML = popularité.textContent;
    galleries.sort((a, b) => b.likes - a.likes);
    createImage(galleries, new ElementFactory(), photographers)
});

// permet de faire un affichage en fonction de la date
date.addEventListener("click", () => {
    title_button.innerHTML = date.textContent;
    galleries.forEach(gallerie => {
        //transform en timestamp pour trier
        gallerie.timestamp = (new Date(gallerie.date)).getTime()
    });
    galleries.sort((a, b) => b.timestamp - a.timestamp);
    createImage(galleries, new ElementFactory(), photographers)
});

// creation du carousel
function carousel(photographers, galleries) {
    const imageDirectoryName = photographers.name.split(' ')[0];
    let carousel = `
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
            <!-- methode factory pour l'image ou la video -->
                ${galleries.map(gallerie => {
                    if (gallerie.image) {
                        return `
                            <div class="carousel-item d-flex justify-content-center">
                                <img src="../img/Sample_Photos-2/${imageDirectoryName}/${gallerie.image}" class="d-block img_carousel" alt="${gallerie.image}">
                            </div>
                        `
                    } else if (gallerie.video) {
                        return `
                            <div class="carousel-item d-flex justify-content-center">
                                <video src="../img/Sample_Photos-2/${imageDirectoryName}/${gallerie.video}" class="d-block img_carousel" alt="${gallerie.video}">
                            </div>
                        `
                    }
                }).join("")}
            </div>
            <a class="carousel-control-prev carousel-control" aria-label="carousel-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next carousel-control" aria-label="carousel-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    `;
    document.getElementById("carousel").innerHTML += carousel;
}

createImage(galleries, new ElementFactory(), photographers)
carousel(photographers, galleries, new ElementFactory())