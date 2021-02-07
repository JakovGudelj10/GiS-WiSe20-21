namespace Reservierungsseite {

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
        let preiszaehler: HTMLElement = document.getElementById("preiszaehler");
        preiszaehler.innerHTML = localStorage.getItem("preis") + " €";
        let senden: HTMLElement = document.getElementById("senden");
        senden.addEventListener("click", handleSend);
        await getProducts();
    }

    init();

    async function handleSend(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let namequery: URLSearchParams = new URLSearchParams(<any>formData);
        console.log(namequery.toString());
        let query: string = localStorage.getItem("query");
        let idArray: string[] = query.split("$$");
        idArray.forEach(e => {
            sendId(e, namequery.toString());
            
        });
        clearStorage();
        window.location.reload();              
    }

    async function sendId(id: string, query: string): Promise<void> {
        await communicate("https://testgiswise2021.herokuapp.com/add?id=" + id + "&" + query);
        //await communicate("http://localhost:8100/add?id=" + id + "&" + query);                 
    }


    async function getProducts(): Promise<void> {
        let query: string = localStorage.getItem("query");
        let response: Response = await communicate("https://testgiswise2021.herokuapp.com/getreserved?ids=" + query);
        //let response: Response = await communicate("http://localhost:8100/getreserved?ids=" + query);
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
            kaufen.setAttribute("class", "hidden");
            divArtikel.appendChild(kaufen);
            container.appendChild(artikelcontainer);

        });
    }

    function clearStorage(): void {
        localStorage.clear();
    }

    async function communicate(_url: RequestInfo): Promise<Response> {
        let response: Response = await fetch(_url);
        return response;
    }


}