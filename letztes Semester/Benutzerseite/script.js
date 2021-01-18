"use strict";
var Endabgabe;
(function (Endabgabe) {
    async function init() {
        await getJSON("eis.json");
        buildpage();
        document.getElementById("senden")?.addEventListener("click", sendOrder);
        clearStorage();
    }
    init();
    let preis = 0;
    async function getJSON(_url) {
        let response = await fetch(_url);
        let respJSON = await response.json();
        Endabgabe.eis = JSON.parse(JSON.stringify(respJSON));
        console.log(Endabgabe.eis);
    }
    function buildpage() {
        let div = document.getElementById("eis");
        let kategorie0 = document.createElement("div");
        let kategorie1 = document.createElement("div");
        let kategorie2 = document.createElement("div");
        kategorie0.setAttribute("class", "kategorie");
        kategorie1.setAttribute("class", "kategorie");
        kategorie2.setAttribute("class", "kategorie");
        div.appendChild(kategorie0);
        div.appendChild(kategorie1);
        div.appendChild(kategorie2);
        for (let i = 0; i < Endabgabe.eis.length; i++) {
            let divArtikel = document.createElement("div");
            divArtikel.setAttribute("class", "artikel");
            if (Endabgabe.eis[i]._kategorie == 0)
                kategorie0.appendChild(divArtikel);
            if (Endabgabe.eis[i]._kategorie == 1)
                kategorie1.appendChild(divArtikel);
            if (Endabgabe.eis[i]._kategorie == 2)
                kategorie2.appendChild(divArtikel);
            let bild = document.createElement("img");
            bild.setAttribute("class", "bild");
            bild.setAttribute("src", Endabgabe.eis[i]._bild);
            bild.setAttribute("alt", Endabgabe.eis[i]._bildAlt);
            divArtikel.appendChild(bild);
            let name = document.createElement("h2");
            name.innerHTML = Endabgabe.eis[i]._name;
            divArtikel.appendChild(name);
            let preis = document.createElement("p");
            preis.setAttribute("class", "preis");
            preis.innerHTML = Endabgabe.eis[i]._preis + " €";
            divArtikel.appendChild(preis);
            let kaufen = document.createElement("button");
            kaufen.innerHTML = "Adden";
            kaufen.setAttribute("type", "button");
            kaufen.setAttribute("artikelPreis", Endabgabe.eis[i]._preis + "");
            kaufen.setAttribute("index", i + "");
            kaufen.setAttribute("zähler", 0 + "");
            kaufen.setAttribute("kategorie", Endabgabe.eis[i]._kategorie + "");
            kaufen.addEventListener("click", hinzufuegen);
            divArtikel.appendChild(kaufen);
        }
    }
    function hinzufuegen(_event) {
        let ziel = _event.target;
        let index = parseInt(ziel.getAttribute("index"));
        let kategorie = ziel.getAttribute("kategorie");
        preis += parseFloat(ziel.getAttribute("artikelPreis"));
        let preisT = document.getElementById("preisT");
        preisT.innerHTML = preis + " €";
        switch (kategorie) {
            case "0":
                let behälterT = document.getElementById("behälterT");
                behälterT.innerHTML = Endabgabe.eis[index]._name;
                localStorage.setItem("behaelter", Endabgabe.eis[index]._name);
                break;
            case "1":
                let sorteT = document.getElementById("sorteT");
                sorteT.innerHTML += Endabgabe.eis[index]._name + ", <br>";
                if (localStorage.getItem("sorte")) {
                    let str = localStorage.getItem("sorte");
                    str += "&sorte=" + Endabgabe.eis[index]._name;
                    localStorage.setItem("sorte", str);
                }
                else {
                    localStorage.setItem("sorte", Endabgabe.eis[index]._name);
                }
                break;
            case "2":
                let toppingsT = document.getElementById("toppingsT");
                toppingsT.innerHTML += Endabgabe.eis[index]._name + ", <br>";
                if (localStorage.getItem("toppings")) {
                    let str = localStorage.getItem("toppings");
                    str += "&toppings=" + Endabgabe.eis[index]._name;
                    localStorage.setItem("toppings", str);
                }
                else {
                    localStorage.setItem("toppings", Endabgabe.eis[index]._name);
                }
                break;
        }
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        console.log(response);
    }
    async function sendOrder() {
        let formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        let strng = "";
        for (let i = 0; i < localStorage.length; ++i) {
            let storageKey = localStorage.key(i);
            strng += "&" + storageKey + "=" + localStorage.getItem(storageKey);
        }
        console.log(query + strng);
        await communicate("http://localhost:8100/senden?" + query + strng);
    }
    function clearStorage() {
        localStorage.clear();
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=script.js.map