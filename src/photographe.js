import data from '../data.json';
// window.localStorage.clear();

//permet de recuperer les information passé dans l'url
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

// permet de recuperer les medias qui corresponde au photographe 
let galleries = data.media.filter(media => media.photographerId == id);

// permet de retourner le resultat total de tous les likes des images du photographe
let total = galleries.reduce((a, b) => a + (b['likes'] || 0) , 0);

let bloc = document.getElementById("bloc_main");

// permet de retourner toutes les informations en rapport avec le photographe
let photographers = data.photographers.find(photographer => photographer.id == id);

createImage(galleries)

function createImage(galleries) {
    // permet de vider le bloc qui contient toutes les images avant de les ajoutés 
    bloc.innerHTML = "";
    let i = 1;

    console.log(total);
    galleries.forEach((gallerie) => {
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

        //
            
        // creation de tous les elements necessaire au bloc pour les images
        const factory = new ElementFactory();
        const bloc_img = document.createElement("div");
        const bloc_info = document.createElement("div");
        const title = document.createElement("p");
        const price = document.createElement("p");
        let like = document.createElement("p");
        let img;

        // cretion d'un bloc img ou video selon le format du contenu 
        if (gallerie.image) {
            img = factory.create("image");
            // si le nom de l'image contient 2 fois un .jpg alors elle en effacera 1
            if (gallerie.image && gallerie.image.includes(".jpg.jpg")) {
                gallerie.image = gallerie.image.replace('.jpg.jpg', '.jpg')
            } 

            // permet de garder juste le prenom du photo du photographe pour faire la route vers la photo dans le dossier img
            const imageDirectoryName = photographers.name.split(' ')[0];
            img.src = "../img/Sample_Photos-2/"+ imageDirectoryName+"/"+gallerie.image;
        }else if (gallerie.video) {
            img = factory.create("video");

            // permet de garder juste le prenom du photo du photographe pour faire la route vers la photo dans le dossier img
            const imageDirectoryName = photographers.name.split(' ')[0];
            img.src = "../img/Sample_Photos-2/"+ imageDirectoryName+"/"+gallerie.video;
        }
        bloc.append(bloc_img);
        bloc_img.append(img);
        bloc_img.append(bloc_info);
        bloc_info.append(title);
        bloc_info.append(price);
        bloc_info.append(like);

        gallerie.name = gallerie.image ? gallerie.image.replace('.jpg', '') : gallerie.video.replace('.mp4', '');
        title.innerHTML = gallerie.name;
        price.innerHTML = gallerie.price+" €";
        like.innerHTML = gallerie.likes + ' <i class="fas fa-heart"></i>';
    
        //class
        bloc_img.setAttribute("class", "bloc-img mt-4");
        bloc_info.setAttribute("class", "d-flex justify-content-between bloc_info mt-2");
        title.setAttribute("class", "title")
        img.setAttribute("class", "w-100 img-card");
        like.setAttribute("id", "like"+ i);
    
        //aria-label
        bloc_img.setAttribute("aria-label", gallerie.image)
        title.setAttribute("aria-label", gallerie.image)
        price.setAttribute("aria-label", gallerie.price+" euro");
        img.setAttribute("alt", gallerie.image);
        img.setAttribute("data-toggle", "modal");
        img.setAttribute("data-target", "#carousel");
        like.setAttribute("aria-label", gallerie.likes+" like");

        document.getElementById("like"+ i).addEventListener("click", () => {
            //toggle de like
            if (gallerie.liked) {
                gallerie.likes -= 1;
                total--
                gallerie.liked = false;
            } else {
                gallerie.likes += 1;
                total++
                gallerie.liked = true;
            }
            like.innerHTML = gallerie.likes + ' <i class="fas fa-heart"></i>';
            total_like.innerHTML = total + ' <i class="fas fa-heart"></i>';
        })
        i++

        bloc_img.addEventListener("click", () => {
            console.log(bloc_img)
            const arrayCarrouselItem = document.getElementsByClassName('carousel-item');
            for (const item of arrayCarrouselItem) {
                if (item.querySelector('img').src.includes(gallerie.image)) {
                    item.classList.add('active')
                } else {
                    item.classList.remove("active");
                }
            }
        });
    });
}

// permet de garder juste le prenom du photo du photographe pour faire la route vers la photo dans le dossier img
const imageDirectoryName = photographers.name.split(' ')[0];

carousel(imageDirectoryName, galleries)

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
    createImage(galleries)
});

// permet de faire un affichage en fonction des likes
popularité.addEventListener("click", () => {
    title_button.innerHTML = popularité.textContent;
    galleries.sort((a, b) => b.likes - a.likes);
    createImage(galleries)
});

// permet de faire un affichage en fonction de la date
date.addEventListener("click", () => {
    title_button.innerHTML = date.textContent;
    galleries.forEach(gallerie => {
        //transform en timestamp pour trier
        gallerie.timestamp = (new Date(gallerie.date)).getTime()
    });
    galleries.sort((a, b) => b.timestamp - a.timestamp);
    createImage(galleries)
});


// creation du carousel
function carousel(photographer, galleries) {
    let carousel = `
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
            <!-- methode factory pour l'image ou la video -->
                ${galleries.map(gallerie => {
                    if (gallerie.image) {
                        return `
                            <div class="carousel-item d-flex justify-content-center">
                                <img src="../img/Sample_Photos-2/${photographer}/${gallerie.image}" class="d-block img_carousel" alt="${gallerie.image}">
                            </div>
                        `
                    } else if (gallerie.video) {
                        return `
                            <div class="carousel-item d-flex justify-content-center">
                                <video src="../img/Sample_Photos-2/${photographer}/${gallerie.video}" class="d-block img_carousel" alt="${gallerie.video}">
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


// permet d'enregistrer les informations du formulaire et de gerer les erreurs
document.getElementById("envoyer").addEventListener("click", () => {
    formulaire()
})

function formulaire(){
    let error = document.getElementById("error");
    let inputName = document.getElementById("prenom");
    let inputNom = document.getElementById("nom");
    let inputEmail = document.getElementById("email");
    let inputMessage = document.getElementById("message")
    checkSubmit()

    function checkSubmit() {
        
        if(checkEmpty(inputName) && checkEmpty(inputNom) && checkEmpty(inputEmail) && checkEmail(inputEmail) && checkEmpty(inputMessage)) {
            document.getElementById("envoyer").addEventListener("click", function(event){
                let contact = {
                    firstName: inputName.value,
                    lastName: inputNom.value,
                    email: inputEmail.value,
                    message: inputMessage.value,
                }
                console.log(contact)
                localStorage.setItem("contact", JSON.stringify(contact));
            })
            return true
            }else {
                return false
            }
    }

    checkForm()

    function checkEmpty(input) {
        if(input.value === "") {
            error.textContent = `${input.name} est vide`;
            error.setAttribute("class", "btn btn-danger");
            error.setAttribute("aria-label", input.name + "est vide");
            return false
        }else {
            error.textContent = ``;
            error.setAttribute("class", "")
            return true
        }
    }

    function checkEmail(input) {
        let regex = /\S+@\S+\.\S+/;
        if(!regex.test(input.value)) {
            error.textContent = `le format de l'email n'est pas correct`;
            error.setAttribute("class", "btn btn-danger");
            error.setAttribute("aria-label", "le format de l'email n'est pas correct");
            return false
        }else {
            error.textContent = ``;
            return true
        }
    }

    function checkForm() {
        document.getElementById("prenom").addEventListener('keyup', (e) => {
            checkEmpty(e.target);
            checkSubmit()
        })
        document.getElementById("nom").addEventListener('keyup', (e) => {
            checkEmpty(e.target);
            checkSubmit()
        })
        document.getElementById("email").addEventListener('keyup', (e) => {
            checkEmpty(e.target);
            checkEmail(e.target);
            checkSubmit()
        })
        document.getElementById("message").addEventListener('keyup', (e) => {
            checkEmpty(e.target);
            checkSubmit()
        })
    };
}