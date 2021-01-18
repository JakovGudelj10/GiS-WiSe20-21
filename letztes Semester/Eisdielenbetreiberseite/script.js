"use strict";
var Betreiberseite;
(function (Betreiberseite) {
    document.getElementById("Refresh", refresh);
    async function refresh() {
        let response = await communicate("http://localhost:8100/empfangen");
        let bestellungen = (JSON.parse(await response.text()));
        for (let i = 0; i < bestellungen.length; i++) {
            let div = document.createElement("div");
        }
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        return response;
    }
})(Betreiberseite || (Betreiberseite = {}));
//# sourceMappingURL=script.js.map