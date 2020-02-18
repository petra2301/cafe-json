const productListLink = "https://spreadsheets.google.com/feeds/list/1GSbfFzHYNw3LjeI2CGoMsgVSBsyS8jCYyHG22Apg3Ug/od6/public/values?alt=json";
const main = document.querySelector("main");
const template = document.querySelector("template").content;

function loadJSON(link) {
    fetch(productListLink).then(e=>e.json()).then(data=>data.feed.entry.forEach(displayProductData));
}

function displayProductData(data) {
    const clone = template.cloneNode("true");
    clone.querySelector("h3").textContent = data.gsx$name.$t;
    main.appendChild(clone);
}

loadJSON(productListLink);