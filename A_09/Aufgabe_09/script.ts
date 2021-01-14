namespace Aufgabe09 {

    document.getElementById("sendhtml")?.addEventListener("click", communicateHTML);
    document.getElementById("sendjson")?.addEventListener("click", communicateJSON);

    async function communicateHTML(_event: Event): Promise<void> {
        let url: string = "https://testgiswise2021gudeljja.herokuapp.com/html";
        //let url: string = "http://localhost:8100";
        let formData: FormData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        let response: Response = await communicate(url);
        let text: string = await response.text();
        (<HTMLElement>document.getElementById("response")).innerHTML = text;
    }

    async function communicateJSON(_event: Event): Promise<void> {
        let url: string = "https://testgiswise2021gudeljja.herokuapp.com/json";
        //let url: string = "http://localhost:8100";
        let formData: FormData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        let response: Response = await communicate(url);
        // tslint:disable-next-line: no-any
        let ausgabe: any = await response.json();
        console.log(ausgabe);
    }

    async function communicate(_url: string): Promise<Response> {
        let response: Response = await fetch(_url);
        return response;
    }
}