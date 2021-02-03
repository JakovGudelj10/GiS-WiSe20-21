"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endabgabe = void 0;
const Http = require("http");
const Mongo = require("mongodb");
var Endabgabe;
(function (Endabgabe) {
    let products;
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    startServer(port);
    connectToDatabase();
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Starting server");
        server.addListener("request", handleRequest);
        server.listen(_port);
        console.log("Server ist gestartet und hört auf den port: " + _port);
    }
    function handleRequest(_request, _response) {
        console.log("Hier ist der beste Ausleihshop!!!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        console.log(_request.url);
        if (_request.url) {
            let url = new URL(_request.url, `http://${_request.headers.host}`);
            let pfad = url.pathname;
            console.log(pfad);
            switch (pfad) {
                case "/get":
                    getProductinfo(_response);
                    break;
                case "/add":
                    addToReserved(url);
                    break;
                case "/getreserved":
                    getreservedProducts(_response, url);
                    break;
                case "/setlend":
                    setLend(url);
                    break;
                case "/setfree":
                    setFree(url);
                    break;
                default:
                    break;
            }
        }
    }
    async function getreservedProducts(_response, _url) {
        let ids = _url.searchParams.get("ids");
        let idArray = ids.split("$$");
        let objectArray = new Array;
        let i = 0;
        idArray.forEach(e => {
            let objectId = new Mongo.ObjectId(e);
            objectArray[i] = objectId;
            i++;
        });
        let productArray;
        productArray = await products.find({ _id: { $in: objectArray } }).toArray();
        console.log(JSON.stringify(productArray));
        _response.write(JSON.stringify(productArray));
        _response.end();
    }
    async function getProductinfo(_response) {
        let productArray;
        productArray = await products.find().toArray();
        console.log(JSON.stringify(productArray));
        _response.write(JSON.stringify(productArray));
        _response.end();
    }
    async function addToReserved(_url) {
        let id = _url.searchParams.get("id");
        let fname = _url.searchParams.get("fname");
        let lname = _url.searchParams.get("lname");
        let objectId = new Mongo.ObjectId(id);
        console.log(objectId);
        await products.updateOne({ _id: objectId }, {
            $set: {
                _status: "reserviert",
                _fname: fname,
                _lname: lname
            }
        });
    }
    async function setLend(_url) {
        let id = _url.searchParams.get("id");
        let objectId = new Mongo.ObjectId(id);
        console.log(objectId);
        await products.updateOne({ _id: objectId }, {
            $set: {
                _status: "ausgeliehen"
            }
        });
    }
    async function setFree(_url) {
        let id = _url.searchParams.get("id");
        let objectId = new Mongo.ObjectId(id);
        console.log(objectId);
        await products.updateOne({ _id: objectId }, {
            $set: {
                _status: "frei",
                _fname: "",
                _lname: ""
            }
        });
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