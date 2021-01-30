"use strict";
var Endabgabe;
(function (Endabgabe) {
    async function init() {
        await getProducts();
    }
    init();
    async function getProducts() {
        let response = await communicate("https://testgiswise2021.herokuapp.com/get");
        // let response: Response = await communicate("http://localhost:8100/get");
        console.log(response.json());
        let products = (JSON.parse(await response.text()));
        console.log(products);
        products.forEach(e => {
            let container = document.getElementById("produkte");
            let divArtikel = document.createElement("div");
            divArtikel.setAttribute("class", "artikel");
            let bild = document.createElement("img");
            bild.setAttribute("class", "bild");
            bild.setAttribute("src", e._bild);
            bild.setAttribute("alt", e._bildAlt);
            divArtikel.appendChild(bild);
            let name = document.createElement("h2");
            name.innerHTML = e._name;
            divArtikel.appendChild(name);
            let preis = document.createElement("p");
            preis.setAttribute("class", "preis");
            preis.innerHTML = e._preis + " €";
            divArtikel.appendChild(preis);
            let kaufen = document.createElement("button");
            kaufen.innerHTML = "Adden";
            kaufen.setAttribute("type", "button");
            kaufen.setAttribute("artikelPreis", e._preis + "");
            //kaufen.setAttribute("index", i + "");
            kaufen.setAttribute("zähler", 0 + "");
            // kaufen.addEventListener("click", hinzufuegen);
            divArtikel.appendChild(kaufen);
            container.appendChild(divArtikel);
        });
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        return response;
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=script.js.map