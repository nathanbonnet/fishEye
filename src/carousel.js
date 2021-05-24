
// creation du carousel
export default function carousel(photographer, galleries, factory) {
    let carousel = `
        <div id="carouselExampleControls" class="carousel" data-ride="carousel">
            <div class="carousel-inner">
            <!-- methode factory pour l'image ou la video -->
                ${galleries.map(gallerie => {
                    if (gallerie.image) {
                        let img = factory.create("image");
                        img.src = "../img/Sample_Photos-2/" + photographer + "/" + gallerie.image;
                        img.setAttribute("class", "d-block img_carousel");
                        img.alt = gallerie.image;
                        console.log(img.outerHTML);
                        return `
                            <div class="carousel-item d-flex justify-content-center">
                                ${img.outerHTML}
                            </div>
                        `
                    } else if (gallerie.video) {
                        let video = factory.create("video");
                        video.src = "../img/Sample_Photos-2/" + photographer + "/" + gallerie.video;
                        video.setAttribute("class", "d-block img_carousel");
                        video.alt = gallerie.video;
                        console.log(video.outerHTML);
                        return `
                            <div class="carousel-item d-flex justify-content-center">
                                ${video.outerHTML}
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