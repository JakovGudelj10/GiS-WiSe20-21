"use strict";
var Aufgabe09;
(function (Aufgabe09) {
    document.getElementById("sendhtml")?.addEventListener("click", communicateHTML);
    document.getElementById("sendjson")?.addEventListener("click", communicateJSON);
    async function communicateHTML(_event) {
        let url = "https://testgiswise2021gudeljja.herokuapp.com/html";
        //let url: string = "http://localhost:8100";
        let formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        let response = await communicate(url);
        let text = await response.text();
        document.getElementById("response").innerHTML = text;
    }
    async function communicateJSON(_event) {
        let url = "https://testgiswise2021gudeljja.herokuapp.com/json";
        //let url: string = "http://localhost:8100";
        let formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        let response = await communicate(url);
        // tslint:disable-next-line: no-any
        let ausgabe = await response.json();
        console.log(ausgabe);
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        return response;
    }
})(Aufgabe09 || (Aufgabe09 = {}));
//# sourceMappingURL=script.js.map