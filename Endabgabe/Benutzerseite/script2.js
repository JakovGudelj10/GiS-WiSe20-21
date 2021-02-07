"use strict";
var Reservierungsseite;
(function (Reservierungsseite) {
    async function init() {
        let preiszaehler = document.getElementById("preiszaehler");
        preiszaehler.innerHTML = localStorage.getItem("preis") + " €";
        let senden = document.getElementById("senden");
        senden.addEventListener("click", handleSend);
        await getProducts();
    }
    init();
    async function handleSend() {
        let formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let namequery = new URLSearchParams(formData);
        console.log(namequery.toString());
        let query = localStorage.getItem("query");
        let idArray = query.split("$$");
        idArray.forEach(e => {
            sendId(e, namequery.toString());
        });
        clearStorage();
        window.location.reload();
    }
    async function sendId(id, query) {
        await communicate("https://testgiswise2021.herokuapp.com/add?id=" + id + "&" + query);
        //await communicate("http://localhost:8100/add?id=" + id + "&" + query);                 
    }
    async function getProducts() {
        let query = localStorage.getItem("query");
        let response = await communicate("https://testgiswise2021.herokuapp.com/getreserved?ids=" + query);
        //let response: Response = await communicate("http://localhost:8100/getreserved?ids=" + query);
        let result = await response.text();
        let products = (JSON.parse(result));
        products.forEach(e => {
            let container = document.getElementById("produkte");
            let artikelcontainer = document.createElement("div");
            artikelcontainer.setAttribute("class", "artikelcontainer");
            let divArtikel = document.createElement("div");
            artikelcontainer.appendChild(divArtikel);
            divArtikel.setAttribute("class", "artikel");
            let bild = document.createElement("img");
            bild.setAttribute("class", "bild");
            bild.setAttribute("src", "../images/" + e._bild);
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
            kaufen.setAttribute("preis", e._preis + "");
            kaufen.setAttribute("zähler", 0 + "");
            kaufen.setAttribute("class", "hidden");
            divArtikel.appendChild(kaufen);
            container.appendChild(artikelcontainer);
        });
    }
    function clearStorage() {
        localStorage.clear();
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        return response;
    }
})(Reservierungsseite || (Reservierungsseite = {}));
//# sourceMappingURL=script2.js.map