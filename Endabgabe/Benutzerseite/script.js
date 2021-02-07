"use strict";
var Endabgabe;
(function (Endabgabe) {
    async function init() {
        await getProducts();
        clearStorage();
    }
    init();
    async function getProducts() {
        let response = await communicate("https://testgiswise2021.herokuapp.com/get");
        //let response: Response = await communicate("http://localhost:8100/get");
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
            divArtikel.appendChild(kaufen);
            container.appendChild(artikelcontainer);
            if (e._status == "reserviert" || e._status == "ausgeliehen") {
                divArtikel.setAttribute("class", "artikel notavailable");
            }
            else {
                kaufen.addEventListener("click", handleAdd);
            }
        });
    }
    function clearStorage() {
        localStorage.clear();
    }
    async function handleAdd(_event) {
        let ziel = _event.target;
        let parent = ziel.parentElement;
        let preiszaehler = document.getElementById("preiszaehler");
        parent.setAttribute("class", "artikel notavailable");
        ziel.setAttribute("class", "hidden");
        let info = "" + ziel.getAttribute("artikelId");
        console.log(info);
        if (localStorage.length == 0) {
            localStorage.setItem("query", info);
            localStorage.setItem("preis", ziel.getAttribute("preis"));
            preiszaehler.innerHTML = ziel.getAttribute("preis") + " €";
        }
        else {
            let querystring = localStorage.getItem("query");
            querystring += "$$" + info;
            localStorage.setItem("query", querystring);
            let preisstring = localStorage.getItem("preis");
            let oldpreis = parseFloat(preisstring);
            let newpreis = oldpreis + parseFloat(ziel.getAttribute("preis"));
            preiszaehler.innerHTML = newpreis + " €";
            localStorage.setItem("preis", newpreis + "");
        }
        console.log(localStorage.getItem("query"));
        console.log(localStorage.getItem("preis"));
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        return response;
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=script.js.map