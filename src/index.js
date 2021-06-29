import data from '../data.json';

console.log(data);

let tags = [... new Set(data.photographers.map(photographer => photographer.tags).reduce((acc, value) => acc.concat(value, [])))];

const bloc_main = document.getElementById("bloc_main");
const nav = document.getElementById("nav");
let selectedTags = [];
tags.forEach(unique => {
    let lien_tag_nav = document.createElement("a");
    let tag_nav = document.createElement("span");

    nav.append(lien_tag_nav);
    lien_tag_nav.append(tag_nav);

    lien_tag_nav.setAttribute("class", "lien_tag_photographe");
    tag_nav.setAttribute("class", "photographers_tags");
    lien_tag_nav.setAttribute("href", "#");
    tag_nav.setAttribute("aria-label", unique);
    
    tag_nav.innerHTML = "#"+ unique;
    lien_tag_nav.addEventListener("click", () => {
        let tag = lien_tag_nav.text.replace("#", "");
        if (selectedTags.includes(tag)) {
            selectedTags = selectedTags.filter(word => word != tag);
            tag_nav.setAttribute("class", "photographers_tags");
        }else {
            selectedTags.push(tag);
            tag_nav.setAttribute("class", "lien_tag_photographe_selected photographers_tags");
        }
        if(selectedTags.length) {
            createPhotographers(getPhotographersFromTags(data.photographers, selectedTags));
        }else {
            createPhotographers(data.photographers)  
        }
    })
})

createPhotographers(data.photographers)

function createPhotographers(photographers){
    console.log(photographers)
    bloc_main.innerHTML = "";
    photographers.forEach((photographer) => {
        //création de tous les élements nécessaire pour chaque photographe
        const bloc = document.createElement("div");
        const bloc_photographers = document.createElement("a");
        const image = document.createElement("img");
        const photographers = document.createElement("h2");
        const photographers_city = document.createElement("h3");
        const photographers_tagLine = document.createElement("p");
        const photographers_price = document.createElement("p");
        const bloc_photographers_tags = document.createElement("div");

        //affichage de tous les élements nécessaire pour chaque photographe
        photographers.textContent = photographer.name;
        photographers_city.textContent = photographer.city + ", " + photographer.country;
        let tagLine;
        try {
            tagLine = decodeURIComponent(escape(photographer.tagline));
        } catch {
            tagLine = decodeURIComponent(escape(photographer.tagline.replace('Ã', 'a')));
        }
        photographers_tagLine.textContent = tagLine;
        photographers_price.textContent = photographer.price + "€/jour";
        image.src =  "../img/Sample_Photos-2/Photographers_ID_Photos/"+ photographer.portrait;

        //ajout de tous les élements dans la div parent (bloc) qui elle même est ajouté à (bloc_main)
        bloc_main.append(bloc);
        bloc.append(bloc_photographers);
        bloc_photographers.append(image);
        bloc_photographers.append(photographers);
        bloc.append(photographers_city);
        bloc.append(photographers_tagLine);
        bloc.append(photographers_price);
        bloc.append(bloc_photographers_tags);

        //ajout de class à tous les éléments
        bloc.setAttribute("class", "bloc_photographer");
        bloc_photographers.setAttribute("href", "photographe.html?id=" + photographer.id);
        bloc_photographers.setAttribute("class", "lien_photographe");
        image.setAttribute("class", "img");
        photographers.setAttribute("class", "photographers");
        photographers_city.setAttribute("class", "photographers_city");
        photographers_tagLine.setAttribute("class", "photographers_tagLine");
        photographers_price.setAttribute("class", "photographers_price");
        bloc_photographers_tags.setAttribute("class", "bloc_photographers_tags");

        //ajout de aria-label à tous les éléments
        image.setAttribute("aria-label", photographer.name);
        photographers_city.setAttribute("aria-label", photographer.city);
        photographers_tagLine.setAttribute("aria-label", photographer.tagline);
        photographers_price.setAttribute("aria-label", photographer.price + "€/jour");

        //boucle sur tous les tags de chaque photographe
        photographer.tags.forEach((photographer) => {
            //création de tous les élements pour les tags de chaque photographe
            const lien_photographers_tags = document.createElement("a");
            const photographers_tags = document.createElement("span");

            //affichage de tous les tags nécessaire pour chaque photographe
            photographers_tags.textContent = "#"+photographer;

            //ajout de tous les tags dans la div parent (bloc_photographers_tags)
            bloc_photographers_tags.append(lien_photographers_tags);
            lien_photographers_tags.append(photographers_tags);

            //ajout de class à tous les éléments
            lien_photographers_tags.setAttribute("class", "lien_tag_photographe");
            photographers_tags.setAttribute("class", "photographers_tags");
            lien_photographers_tags.setAttribute("href", "#");
            photographers_tags.setAttribute("aria-label", photographer);
        })
    })
}

function getPhotographersFromTags(photographers, selectedTag) {
    //boucle json et verifier si les tags correspondes 
    return photographers.filter(photographer => {
        return photographer.tags.filter((tag) => selectedTag.includes(tag)).length;
    });
}

window.onscroll = function() {
    if (window.pageYOffset == 0) {
        document.getElementById("contenu").setAttribute("class", "contenuCache");
    } else {
        document.getElementById("contenu").setAttribute("class", "contenuDynamic");
    }
}

