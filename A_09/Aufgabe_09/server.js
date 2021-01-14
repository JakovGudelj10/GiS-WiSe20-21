"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A09Server = void 0;
const Http = require("http");
const Url = require("url");
var A09Server;
(function (A09Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("Hello World!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let link = new URL(_request.url, `http://${_request.headers.host}`);
            let pfad = link.pathname;
            switch (pfad) {
                case "/html":
                    _response.setHeader("pathname", pfad);
                    for (let key in url.query) {
                        _response.write("<li>" + key + ": " + url.query[key]);
                    }
                    _response.end();
                    break;
                case "/json":
                    let urlJson = JSON.stringify(url.query);
                    _response.setHeader("pathname", pfad);
                    _response.write(urlJson);
                    _response.end();
                    break;
                default:
                    _response.end();
                    break;
            }
        }
    }
})(A09Server = exports.A09Server || (exports.A09Server = {}));
//# sourceMappingURL=server.js.map