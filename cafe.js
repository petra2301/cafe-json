const productListLink = "https://spreadsheets.google.com/feeds/list/1GSbfFzHYNw3LjeI2CGoMsgVSBsyS8jCYyHG22Apg3Ug/od6/public/values?alt=json";

const main = document.querySelector("main");
const template = document.querySelector("template").content;
const modalWrapper = document.querySelector(".modalBg");
const closeModal = document.querySelector("#closeModal");

closeModal.addEventListener("click", () => {
    modalWrapper.classList.add("hide");
});

function loadJSON(link) {
    fetch(productListLink).then(e=>e.json()).then(data=>data.feed.entry.forEach(displayProducts));
}

function displayProducts(products) {

    const clone = template.cloneNode("true");
    
    clone.querySelector(".productImg").style.background = `url(img/${products.gsx$img.$t})`;
    //clone.querySelector(".productImg").style.background = `url(img/coffee-placeholder.jpg)`;
    clone.querySelector("h3").textContent = products.gsx$name.$t;
    clone.querySelector("h4").textContent = products.gsx$price.$t + " DKK";
    clone.querySelector(".shortDesc").textContent = products.gsx$shortdesc.$t;

    clone.querySelector("button").addEventListener("click", () => {
        modalWrapper.classList.remove("hide");
        
        const modal = document.querySelector(".modal");
        
        modal.querySelector(".productImgLarge").style.background = `url(img/${products.gsx$img.$t})`;
        modal.querySelector("h3").textContent = products.gsx$name.$t;
        modal.querySelector("h4").textContent = products.gsx$price.$t + " DKK";
        modal.querySelector(".longDesc").textContent = products.gsx$longdesc.$t;

        if (products.gsx$plantbased.$t === "yes") {
            modal.querySelector(".plantBased").style.display = "block";
        }

        console.log(`${products.gsx$longdesc.$t}`);
    })
    main.appendChild(clone);
}


loadJSON(productListLink);