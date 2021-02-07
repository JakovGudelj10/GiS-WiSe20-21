namespace Betreiberseite {

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
    }

    init();

    async function getProducts(): Promise<void> {
        let response: Response = await communicate("https://testgiswise2021.herokuapp.com/get");
        //let response: Response = await communicate("http://localhost:8100/get");
        //console.log(await response.text());
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

            let status: HTMLElement = document.createElement("p");
            status.setAttribute("class", "" + e._status);
            status.innerHTML = e._status;
            divArtikel.appendChild(status);

            console.log(e._status);
            console.log(e._fname);
            console.log(e._lname);

            if (e._status != "frei") {
                let fname: HTMLElement = document.createElement("p");
                fname.setAttribute("class", "name");
                fname.innerHTML = e._fname;
                divArtikel.appendChild(fname);

                let lname: HTMLElement = document.createElement("p");
                lname.setAttribute("class", "name");
                lname.innerHTML = e._lname;
                divArtikel.appendChild(lname);
            }

            let preis: HTMLElement = document.createElement("p");
            preis.setAttribute("class", "preis");
            preis.innerHTML = e._preis + " €";
            divArtikel.appendChild(preis);

            if (e._status != "frei") {
                let button: HTMLButtonElement = document.createElement("button");
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
    let knopf: HTMLElement = document.getElementById("testbutton");
    knopf.addEventListener("click", clearStorage);
    function clearStorage(): void {
        localStorage.clear();
    }



    async function handleStatus(_event: Event): Promise<void> {
        let ziel: HTMLButtonElement = <HTMLButtonElement>_event.target;
        let id: string = "" + ziel.getAttribute("artikelId");
        let status: string = "" + ziel.getAttribute("status");
        if (status == "reserviert") {
            await communicate("https://testgiswise2021.herokuapp.com/setlend?id=" + id);
            //await communicate("http://localhost:8100/setlend?id=" + id);
        }
        else {
            await communicate("https://testgiswise2021.herokuapp.com/setfree?id=" + id);
            //await communicate("http://localhost:8100/setfree?id=" + id);
        }
        window.location.reload();
    }

    async function communicate(_url: RequestInfo): Promise<Response> {
        let response: Response = await fetch(_url);
        return response;
    }


}