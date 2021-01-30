"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endabgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Endabgabe;
(function (Endabgabe) {
    let orders;
    let products;
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    main();
    async function main() {
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(port);
        await connectToDatabase();
    }
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("Hier ist der beste Ausleihshop!!!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        console.log(_request.url);
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let url2 = new URL(_request.url, `http://${_request.headers.host}`);
            let pfad = url2.pathname;
            console.log(pfad);
            switch (pfad) {
                case "/senden":
                    send(url.query);
                    break;
                case "/get":
                    getProductinfo(_response);
                    break;
                default:
                    break;
            }
        }
        _response.end();
    }
    function send(_bestellung) {
        orders.insertOne(_bestellung);
    }
    async function getProductinfo(_response) {
        let ordersArray = await products.find().toArray();
        _response.write(JSON.stringify(ordersArray));
        console.log(ordersArray);
        _response.end();
    }
    async function connectToDatabase() {
        let url = "mongodb+srv://User:az17DLf9OfFRCOjw@gis-wise-2021-jakovgude.v5hg5.mongodb.net/AStA-Ausleihshop?retryWrites=true&w=majority";
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(url, options);
        await mongoClient.connect();
        products = mongoClient.db("AStA-Ausleihshop").collection("Products");
        console.log("Database connection", products != undefined);
    }
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
//# sourceMappingURL=server.js.map