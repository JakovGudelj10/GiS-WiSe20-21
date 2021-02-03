"use strict";
var Betreiberseite;
(function (Betreiberseite) {
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
            let status = document.createElement("p");
            status.setAttribute("class", "" + e._status);
            status.innerHTML = e._status;
            divArtikel.appendChild(status);
            console.log(e._status);
            console.log(e._fname);
            console.log(e._lname);
            if (e._status != "frei") {
                let fname = document.createElement("p");
                fname.setAttribute("class", "name");
                fname.innerHTML = e._fname;
                divArtikel.appendChild(fname);
                let lname = document.createElement("p");
                lname.setAttribute("class", "name");
                lname.innerHTML = e._lname;
                divArtikel.appendChild(lname);
            }
            let preis = document.createElement("p");
            preis.setAttribute("class", "preis");
            preis.innerHTML = e._preis + " €";
            divArtikel.appendChild(preis);
            if (e._status != "frei") {
                let button = document.createElement("button");
                if (e._status == "reserviert")
                    button.innerHTML = "Produkt verleihen";
                else
                    button.innerHTML = "Produkt freigeben";
                button.setAttribute("type", "button");
                button.setAttribute("artikelId", e._id + "");
                button.setAttribute("status", e._status);
                button.addEventListener("click", handleStatus);
                divArtikel.appendChild(button);
            }
            container.appendChild(artikelcontainer);
        });
    }
    let knopf = document.getElementById("testbutton");
    knopf.addEventListener("click", clearStorage);
    function clearStorage() {
        localStorage.clear();
    }
    async function handleStatus(_event) {
        let ziel = _event.target;
        let id = "" + ziel.getAttribute("artikelId");
        let status = "" + ziel.getAttribute("status");
        if (status == "reserviert") {
            //await communicate("https://testgiswise2021.herokuapp.com/setlend?id=" + id);
            await communicate("http://localhost:8100/setlend?id=" + id);
        }
        else {
            //await communicate("https://testgiswise2021.herokuapp.com/setfree?id=" + id);
            await communicate("http://localhost:8100/setfree?id=" + id);
        }
        window.location.reload();
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        return response;
    }
})(Betreiberseite || (Betreiberseite = {}));
//# sourceMappingURL=script.js.map