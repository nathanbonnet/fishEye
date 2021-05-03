import data from '../data.json';
// window.localStorage.clear();

//permet de recuperer les information passé dans l'url
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

console.log(data)

let galleries = data.media.filter(media => media.photographerId == id);

let bloc = document.getElementById("bloc_main");

let photographers = data.photographers.find(photographer => photographer.id == id);

let like = data.media.find(like => like.likes == photographers.id);
console.log(like, photographers.id);

createImage(galleries)

function createImage(galleries) {
    bloc.innerHTML = "";
    galleries.forEach((gallerie) => {
        const bloc_img = document.createElement("div");
        const bloc_info = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("p");
        const price = document.createElement("p");
        let like = document.createElement("p");
    
        bloc.append(bloc_img);
        bloc_img.append(img);
        bloc_img.append(bloc_info);
        bloc_info.append(title);
        bloc_info.append(price);
        bloc_info.append(like);
    
        const imageDirectoryName = photographers.name.split(' ')[0];
        if (gallerie.image && gallerie.image.includes(".jpg.jpg")) {
            gallerie.image = gallerie.image.replace('.jpg.jpg', '.jpg')
        }
    
        img.src = "../img/Sample_Photos-2/"+ imageDirectoryName+"/"+gallerie.image;

        gallerie.name = gallerie.image ? gallerie.image.replace('.jpg', '') : gallerie.video.replace('.mp4', '');
        title.innerHTML = gallerie.name;
        price.innerHTML = gallerie.price+" €";
        like.innerHTML = gallerie.likes + ' <i class="fas fa-heart"></i>';
    
        //class
        bloc_img.setAttribute("class", "bloc-img mt-4");
        bloc_info.setAttribute("class", "d-flex justify-content-between bloc_info mt-2");
        title.setAttribute("class", "title")
        img.setAttribute("class", "w-100 img-card");
        like.setAttribute("id", "like");
    
        //aria-label
        bloc_img.setAttribute("aria-label", gallerie.image)
        title.setAttribute("aria-label", gallerie.image)
        price.setAttribute("aria-label", gallerie.price+" euro");
        img.setAttribute("alt", gallerie.image);
        like.setAttribute("aria-label", gallerie.likes+" like");

        document.getElementById("like").addEventListener("click", () => {
            gallerie.likes += 1;
            like.innerHTML = gallerie.likes + ' <i class="fas fa-heart"></i>';
        })
    });
}

const info = document.getElementById("info")
const img = document.getElementById("img_photographer");

//info
const name = document.createElement("h2");
const city = document.createElement("h3");
const photographer_tagLine = document.createElement("p");
const bloc_photographers_tags = document.createElement("div");
const tarif_total = document.getElementById("tarif_total");

info.append(name);
info.append(city);
info.append(photographer_tagLine);
info.append(bloc_photographers_tags);

name.innerHTML = photographers.name;
city.innerHTML = photographers.city+ ", " + photographers.country;
photographer_tagLine.innerHTML = photographers.tagline;
tarif_total.innerHTML = photographers.price+ "€ /jour";

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

titre.addEventListener("click", () => {
    title_button.innerHTML = titre.textContent;
    galleries.sort((a, b) => a.name > b.name);
    createImage(galleries)
});
popularité.addEventListener("click", () => {
    title_button.innerHTML = popularité.textContent;
    galleries.sort((a, b) => b.likes - a.likes);
    createImage(galleries)
});
date.addEventListener("click", () => {
    title_button.innerHTML = date.textContent;
    galleries.forEach(gallerie => {
        //transform en timestamp pour trier
        gallerie.timestamp = (new Date(gallerie.date)).getTime()
    });
    galleries.sort((a, b) => b.timestamp - a.timestamp);
    createImage(galleries)
});

// function test() {
//     let carousel = `
//     <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
//         <div class="carousel-inner">
//             <div class="carousel-item active">
//                 <img src="../img/Sample_Photos-2/Event_PintoWedding.jpg" class="d-block w-100" alt="...">
//             </div>
//             <div class="carousel-item">
//                 <img src="../img/Sample_Photos-2/Event_BenevidesWedding.jpg"" class="d-block w-100" alt="...">
//             </div>
//         </div>
//         <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
//             <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//             <span class="visually-hidden">Previous</span>
//         </button>
//         <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
//             <span class="carousel-control-next-icon" aria-hidden="true"></span>
//             <span class="visually-hidden">Next</span>
//         </button>
//     </div>
// `;

// document.getElementById("carousel").innerHTML += carousel;
// }


// test()

acheter()

function acheter(){
    document.getElementById("contacter").addEventListener("click", function(event){
    let error = document.getElementById("error");
        event.preventDefault();
     
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
                error.setAttribute("class", "btn btn-danger")
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
        }
        
    });
}