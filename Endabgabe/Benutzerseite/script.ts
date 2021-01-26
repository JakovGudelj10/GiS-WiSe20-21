namespace Endabgabe {

    async function init(): Promise<void> {
       // await getJSON("produkt.json");
        //buildpage();
        document.getElementById("senden")?.addEventListener("click", sendOrder);
        clearStorage();
    }
    init();

    let preis: number = 0;

    async function getJSON(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        let respJSON: string = await response.json();
        produkt = JSON.parse(JSON.stringify(respJSON));
        console.log(produkt);
    }


    function buildpage(): void {
        let div: HTMLElement = document.getElementById("produkt") as HTMLElement;
        let kategorie0: HTMLElement = document.createElement("div");
        let kategorie1: HTMLElement = document.createElement("div");
        let kategorie2: HTMLElement = document.createElement("div");
        kategorie0.setAttribute("class", "kategorie");
        kategorie1.setAttribute("class", "kategorie");
        kategorie2.setAttribute("class", "kategorie");
        div.appendChild(kategorie0);
        div.appendChild(kategorie1);
        div.appendChild(kategorie2);

        for (let i: number = 0; i < produkt.length; i++) {

            let divArtikel: HTMLElement = document.createElement("div");
            divArtikel.setAttribute("class", "artikel");
            if (produkt[i]._kategorie == 0)
                kategorie0.appendChild(divArtikel);
            if (produkt[i]._kategorie == 1)
                kategorie1.appendChild(divArtikel);
            if (produkt[i]._kategorie == 2)
                kategorie2.appendChild(divArtikel);


            let bild: HTMLElement = document.createElement("img");
            bild.setAttribute("class", "bild");
            bild.setAttribute("src", produkt[i]._bild);
            bild.setAttribute("alt", produkt[i]._bildAlt);
            divArtikel.appendChild(bild);

            let name: HTMLElement = document.createElement("h2");
            name.innerHTML = produkt[i]._name;
            divArtikel.appendChild(name);

            let preis: HTMLElement = document.createElement("p");
            preis.setAttribute("class", "preis");
            preis.innerHTML = produkt[i]._preis + " €";
            divArtikel.appendChild(preis);


            let reservieren: HTMLButtonElement = document.createElement("button");
            reservieren.innerHTML = "Adden";
            reservieren.setAttribute("type", "button");
            reservieren.setAttribute("artikelPreis", produkt[i]._preis + "");
            reservieren.setAttribute("index", i + "");
            reservieren.setAttribute("zähler", 0 + "");
            reservieren.setAttribute("kategorie", produkt[i]._kategorie + "");
            reservieren.addEventListener("click", hinzufuegen);
            divArtikel.appendChild(reservieren);

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
                      behälterT.innerHTML = produkt[index]._name;
                      localStorage.setItem("behaelter", produkt[index]._name);
                      break;
            case "1": let sorteT: HTMLElement = <HTMLElement>document.getElementById("sorteT");
                      sorteT.innerHTML += produkt[index]._name + ", <br>";
                      if (localStorage.getItem("sorte")) {
                    let str: string = <string>localStorage.getItem("sorte");
                    str += "&sorte=" + produkt[index]._name;
                    localStorage.setItem("sorte", str);
                }
                else {
                    localStorage.setItem("sorte", produkt[index]._name);
                }
                      break;
            case "2": let toppingsT: HTMLElement = <HTMLElement>document.getElementById("toppingsT");
                      toppingsT.innerHTML += produkt[index]._name + ", <br>";
                      if (localStorage.getItem("toppings")) {
                    let str: string = <string>localStorage.getItem("toppings");
                    str += "&toppings=" + produkt[index]._name;
                    localStorage.setItem("toppings", str);
                }
                else {
                    localStorage.setItem("toppings", produkt[index]._name);
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
        // await communicate("http://localhost:8100/senden?" + query + strng);
        await communicate("https://testgiswise2021.herokuapp.com/senden?" + query + strng);
    }
    function clearStorage(): void {
        localStorage.clear();
    }

}