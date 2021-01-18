namespace Betreiberseite {

    interface Bestellen {
        _id: string;
        fname: string;
        lname: string;
        adress: string;
        sorte: string[];
        toppings: string[];
        behaelter: string;
    }
    document.getElementById("Refresh", refresh);
    async function refresh(): Promise<void> {
        let response: Response = await communicate("http://localhost:8100/empfangen");
        let bestellungen: Bestellen[] = (JSON.parse(await response.text()));
        for (let i = 0; i < bestellungen.length; i++) {
            let div: HTMLElement = document.createElement("div");  
            
        }

    }
    async function communicate(_url: RequestInfo): Promise<Response> {
        let response: Response = await fetch(_url);
        return response;
    }
    
}
