"use strict";
var Endabgabe;
(function (Endabgabe) {
    async function init() {
        await getProducts();
    }
    init();
    async function getProducts() {
        //let response: Response = await communicate("https://testgiswise2021.herokuapp.com/get");
        let response = await communicate("http://localhost:8100/get");
        //console.log(await response.text());
        let result = await response.text();
        let products = (JSON.parse(result));
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
            let beschreibung = document.createElement("p");
            beschreibung.setAttribute("class", "beschreibung");
            beschreibung.innerHTML = e._beschreibung;
            divArtikel.appendChild(beschreibung);
            let preis = document.createElement("p");
            preis.setAttribute("class", "preis");
            preis.innerHTML = e._preis + " €";
            divArtikel.appendChild(preis);
            let kaufen = document.createElement("button");
            kaufen.innerHTML = "Reservieren";
            kaufen.setAttribute("type", "button");
            kaufen.setAttribute("artikelId", e._id + "");
            //kaufen.setAttribute("index", i + "");
            kaufen.setAttribute("zähler", 0 + "");
            divArtikel.appendChild(kaufen);
            container.appendChild(divArtikel);
            if (e._status == "reserviert" || e._status == "ausgeliehen") {
                divArtikel.setAttribute("class", "artikel notavailable");
            }
            else {
                kaufen.addEventListener("click", handleAdd);
            }
        });
    }
    async function handleAdd(_event) {
        let ziel = _event.target;
        let info = "?id=" + ziel.getAttribute("id");
        console.log(info);
        //await communicate("https://testgiswise2021.herokuapp.com/add");
        await communicate("http://localhost:8100/add" + info);
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        return response;
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=script.js.map