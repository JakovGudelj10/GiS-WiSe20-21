"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endabgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Endabgabe;
(function (Endabgabe) {
    let orders;
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    connectToDatabase();
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("DAS ALLER BESTE EIS NUR HIER!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let url2 = new URL(_request.url, `http://${_request.headers.host}`);
            let pfad = url2.pathname;
            switch (pfad) {
                case "/senden":
                    send(url.query);
                    break;
                default:
                    break;
            }
        }
    }
    function send(_bestellung) {
        orders.insert(_bestellung);
    }
    async function connectToDatabase() {
        let url = "mongodb+srv://User:12345@jaki-gis-sose-2020.v5hg5.mongodb.net/Endabgabe?retryWrites=true&w=majority";
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Endabgabe").collection("Bestellungen");
        console.log("Database connection", orders != undefined);
    }
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
//# sourceMappingURL=server.js.map