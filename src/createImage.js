export default function createImage(galleries, ElementFactory, photographers) {
    console.log(ElementFactory);

    // permet de retourner le resultat total de tous les likes des images du photographe
    let total = galleries.reduce((a, b) => a + (b['likes'] || 0) , 0);

    let bloc = document.getElementById("bloc_main");

    // permet de vider le bloc qui contient toutes les images avant de les ajoutés 
    bloc.innerHTML = "";
    let i = 1;

    console.log(total);
    galleries.forEach((gallerie) => {
            
        // creation de tous les elements necessaire au bloc pour les images
        const factory = ElementFactory;
        const bloc_img = document.createElement("a");
        const bloc_info = document.createElement("div");
        const title = document.createElement("p");
        const price = document.createElement("p");
        let like = document.createElement("p");
        let element;

        // cretion d'un bloc img ou video selon le format du contenu 
        if (gallerie.image) {
            element = factory.create("image");
            // si le nom de l'image contient 2 fois un .jpg alors elle en effacera 1
            if (gallerie.image && gallerie.image.includes(".jpg.jpg")) {
                gallerie.image = gallerie.image.replace('.jpg.jpg', '.jpg')
            } 

            // permet de garder juste le prenom du photo du photographe pour faire la route vers la photo dans le dossier img
            const imageDirectoryName = photographers.name.split(' ')[0];
            element.src = "../img/Sample_Photos-2/"+ imageDirectoryName+"/"+gallerie.image;
        }else if (gallerie.video) {
            element = factory.create("video");

            // permet de garder juste le prenom du photo du photographe pour faire la route vers la photo dans le dossier img
            const imageDirectoryName = photographers.name.split(' ')[0];
            element.src = "../img/Sample_Photos-2/"+ imageDirectoryName+"/"+gallerie.video+"#t=0.1";
        }
        bloc.append(bloc_img);
        bloc_img.append(element);
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
        bloc_img.setAttribute("href", "#");
        bloc_img.setAttribute("id", "bloc-img");
        bloc_info.setAttribute("class", "d-flex justify-content-between bloc_info mt-2");
        title.setAttribute("class", "title")
        element.setAttribute("class", "w-100 img-card");
        like.setAttribute("id", "like"+ i);
    
        //aria-label
        bloc_img.setAttribute("aria-label", gallerie.image)
        title.setAttribute("aria-label", gallerie.image)
        price.setAttribute("aria-label", gallerie.price+" euro");
        element.setAttribute("alt", gallerie.image);
        element.setAttribute("data-toggle", "modal");
        element.setAttribute("data-target", "#carousel");
        element.setAttribute("aria-label", "element photographe");
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
    });
}

document.getElementById('bloc-img').addEventListener("click", () => {
    const arrayCarrouselItem = document.getElementsByClassName('carousel-item');
    for (const item of arrayCarrouselItem) {
        if (item.querySelector('img').src.includes(gallerie.image)) {
            item.classList.add('active')
        } else {
            item.classList.remove("active");
        }
    }
});


// creation du carousel
export function carousel(photographers, galleries) {
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