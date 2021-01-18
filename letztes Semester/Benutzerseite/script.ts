namespace Endabgabe {

    async function init(): Promise<void> {
        await getJSON("eis.json");
        buildpage();
        document.getElementById("senden")?.addEventListener("click", sendOrder);
        clearStorage();
    }
    init();

    let preis: number = 0;

    async function getJSON(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        let respJSON: string = await response.json();
        eis = JSON.parse(JSON.stringify(respJSON));
        console.log(eis);
    }


    function buildpage(): void {
        let div: HTMLElement = document.getElementById("eis") as HTMLElement;
        let kategorie0: HTMLElement = document.createElement("div");
        let kategorie1: HTMLElement = document.createElement("div");
        let kategorie2: HTMLElement = document.createElement("div");
        kategorie0.setAttribute("class", "kategorie");
        kategorie1.setAttribute("class", "kategorie");
        kategorie2.setAttribute("class", "kategorie");
        div.appendChild(kategorie0);
        div.appendChild(kategorie1);
        div.appendChild(kategorie2);

        for (let i: number = 0; i < eis.length; i++) {

            let divArtikel: HTMLElement = document.createElement("div");
            divArtikel.setAttribute("class", "artikel");
            if (eis[i]._kategorie == 0)
                kategorie0.appendChild(divArtikel);
            if (eis[i]._kategorie == 1)
                kategorie1.appendChild(divArtikel);
            if (eis[i]._kategorie == 2)
                kategorie2.appendChild(divArtikel);


            let bild: HTMLElement = document.createElement("img");
            bild.setAttribute("class", "bild");
            bild.setAttribute("src", eis[i]._bild);
            bild.setAttribute("alt", eis[i]._bildAlt);
            divArtikel.appendChild(bild);

            let name: HTMLElement = document.createElement("h2");
            name.innerHTML = eis[i]._name;
            divArtikel.appendChild(name);

            let preis: HTMLElement = document.createElement("p");
            preis.setAttribute("class", "preis");
            preis.innerHTML = eis[i]._preis + " €";
            divArtikel.appendChild(preis);


            let kaufen: HTMLButtonElement = document.createElement("button");
            kaufen.innerHTML = "Adden";
            kaufen.setAttribute("type", "button");
            kaufen.setAttribute("artikelPreis", eis[i]._preis + "");
            kaufen.setAttribute("index", i + "");
            kaufen.setAttribute("zähler", 0 + "");
            kaufen.setAttribute("kategorie", eis[i]._kategorie + "");
            kaufen.addEventListener("click", hinzufuegen);
            divArtikel.appendChild(kaufen);

        }

    }
    function hinzufuegen(_event: Event): void {

        let ziel: HTMLElement = _event.target as HTMLElement;
        let index: number = parseInt(ziel.getAttribute("index")!);
        let kategorie: string = ziel.getAttribute("kategorie")!;
        preis += parseFloat(ziel.getAttribute("artikelPreis")!);
        let preisT: HTMLElement = <HTMLElement>document.getElementById("preisT");
        preisT.innerHTML = preis + " €";

        switch (kategorie) {
            case "0": let behälterT: HTMLElement = <HTMLElement>document.getElementById("behälterT");
                      behälterT.innerHTML = eis[index]._name;
                      localStorage.setItem("behaelter", eis[index]._name);
                      break;
            case "1": let sorteT: HTMLElement = <HTMLElement>document.getElementById("sorteT");
                      sorteT.innerHTML += eis[index]._name + ", <br>";
                      if (localStorage.getItem("sorte")) {
                    let str: string = <string>localStorage.getItem("sorte");
                    str += "&sorte=" + eis[index]._name;
                    localStorage.setItem("sorte", str);
                }
                else {
                    localStorage.setItem("sorte", eis[index]._name);
                }
                      break;
            case "2": let toppingsT: HTMLElement = <HTMLElement>document.getElementById("toppingsT");
                      toppingsT.innerHTML += eis[index]._name + ", <br>";
                      if (localStorage.getItem("toppings")) {
                    let str: string = <string>localStorage.getItem("toppings");
                    str += "&toppings=" + eis[index]._name;
                    localStorage.setItem("toppings", str);
                }
                else {
                    localStorage.setItem("toppings", eis[index]._name);
                }
                      break;
        }

    }

    async function communicate(_url: RequestInfo): Promise<void> {       
        let response: Response = await fetch(_url);
        console.log(response);
    }
    async function sendOrder(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let strng: string = "";
        for (let i: number = 0; i < localStorage.length; ++i) { 
            let storageKey: string = localStorage.key(i) as string;
            strng += "&" + storageKey + "=" + localStorage.getItem(storageKey);
        }
        console.log(query + strng);
        await communicate("http://localhost:8100/senden?" + query + strng);
    }
    function clearStorage(): void {
        localStorage.clear();
    }

}


