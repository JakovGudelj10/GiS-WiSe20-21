namespace Endabgabe {

    interface Product {
        _id: number;
        _name: string;
        _preis: number;
        _bild: string;
        _bildAlt: string;
        _beschreibung: string;
        _status: string;
        _fname: string;
        _lname: string;
    }


    async function init(): Promise<void> {
        await getProducts();
        clearStorage();
    }

    init();

    async function getProducts(): Promise<void> {
        let response: Response = await communicate("https://testgiswise2021.herokuapp.com/get");
        //let response: Response = await communicate("http://localhost:8100/get");
        let result: string = await response.text();
        let products: Product[] = (JSON.parse(result));
        products.forEach(e => {
            let container: HTMLElement = document.getElementById("produkte");
            let artikelcontainer: HTMLElement = document.createElement("div");
            artikelcontainer.setAttribute("class", "artikelcontainer");
            let divArtikel: HTMLElement = document.createElement("div");
            artikelcontainer.appendChild(divArtikel);
            divArtikel.setAttribute("class", "artikel");

            let bild: HTMLElement = document.createElement("img");
            bild.setAttribute("class", "bild");
            bild.setAttribute("src", "../images/" + e._bild);
            bild.setAttribute("alt", e._bildAlt);
            divArtikel.appendChild(bild);

            let name: HTMLElement = document.createElement("h2");
            name.innerHTML = e._name;
            divArtikel.appendChild(name);

            let beschreibung: HTMLElement = document.createElement("p");
            beschreibung.setAttribute("class", "beschreibung");
            beschreibung.innerHTML = e._beschreibung;
            divArtikel.appendChild(beschreibung);

            let preis: HTMLElement = document.createElement("p");
            preis.setAttribute("class", "preis");
            preis.innerHTML = e._preis + " €";
            divArtikel.appendChild(preis);

            let kaufen: HTMLButtonElement = document.createElement("button");
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
    
    function clearStorage(): void {
        localStorage.clear();
    }
    


    async function handleAdd(_event: Event): Promise<void> {      
        let ziel: HTMLButtonElement = <HTMLButtonElement> _event.target;
        let parent: HTMLElement = ziel.parentElement;
        let preiszaehler: HTMLElement = document.getElementById("preiszaehler");
        parent.setAttribute("class", "artikel notavailable");
        ziel.setAttribute("class", "hidden");
        let info: string = "" + ziel.getAttribute("artikelId");
        console.log(info);
        if (localStorage.length == 0) {
        localStorage.setItem("query", info);
        localStorage.setItem("preis", ziel.getAttribute("preis"));
        preiszaehler.innerHTML = ziel.getAttribute("preis") + " €";
        }
        else {
          let querystring: string = localStorage.getItem("query");
          querystring += "$$" + info;
          localStorage.setItem("query", querystring);
          let preisstring: string = localStorage.getItem("preis");
          let oldpreis: number = parseFloat(preisstring);
          let newpreis: number = oldpreis + parseFloat(ziel.getAttribute("preis"));
          preiszaehler.innerHTML = newpreis + " €";
          localStorage.setItem("preis", newpreis + "");
        }
        console.log(localStorage.getItem("query"));
        console.log(localStorage.getItem("preis"));
        
    }

    async function communicate(_url: RequestInfo): Promise<Response> {
        let response: Response = await fetch(_url);
        return response;
    }


}