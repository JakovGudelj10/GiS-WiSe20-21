namespace Endabgabe {

    interface Product {
        _id: number;
        _name: string;
        _preis: number;
        _bild: string;
        _bildAlt: string;
        _beschreibung: string;
        _status: string;
    }


    async function init(): Promise<void> {
        await getProducts();
    }

    init();

    async function getProducts(): Promise<void> {
        //let response: Response = await communicate("https://testgiswise2021.herokuapp.com/get");
        let response: Response = await communicate("http://localhost:8100/get");
        //console.log(await response.text());
        let result: string = await response.text();
        let products: Product[] = (JSON.parse(result));
        console.log(products);
        products.forEach(e => {
            let container: HTMLElement = document.getElementById("produkte");
            let divArtikel: HTMLElement = document.createElement("div");
            divArtikel.setAttribute("class", "artikel");

            let bild: HTMLElement = document.createElement("img");
            bild.setAttribute("class", "bild");
            bild.setAttribute("src", e._bild);
            bild.setAttribute("alt", e._bildAlt);
            divArtikel.appendChild(bild);

            let name: HTMLElement = document.createElement("h2");
            name.innerHTML = e._name;
            divArtikel.appendChild(name);

            let preis: HTMLElement = document.createElement("p");
            preis.setAttribute("class", "preis");
            preis.innerHTML = e._preis + " €";
            divArtikel.appendChild(preis);

            let kaufen: HTMLButtonElement = document.createElement("button");
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

    async function communicate(_url: RequestInfo): Promise<Response> {
        let response: Response = await fetch(_url);
        return response;
    }


}