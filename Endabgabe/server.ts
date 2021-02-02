import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Endabgabe {
    interface Bestellung {
        [type: string]: string | string[] | number;
    }
    interface Product {
        [type: string]: string | number;

    }
    let orders: Mongo.Collection;
    let products: Mongo.Collection;
    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    startServer(port);
    connectToDatabase();

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        console.log("Starting server");

        server.addListener("request", handleRequest);
        server.listen(_port);
        console.log("Server ist gestartet und hört auf den port: " + _port);
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("Hier ist der beste Ausleihshop!!!");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        console.log(_request.url);

        if (_request.url) {

            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let url2: URL = new URL(_request.url, `http://${_request.headers.host}`);

            let pfad: string = url2.pathname;
            console.log(pfad);
            switch (pfad) {
                case "/senden":
                    send(<Bestellung>url.query);
                    _response.end();
                    break;
                case "/get":

                    getProductinfo(_response);
                    break;
                case "/add":

                    addToReserved(url2);
                    break;

                case "/getreserved":

                    addToReserved(url2);
                    break;

                default:
                    break;
            }
        }

    }

    function send(_bestellung: Bestellung): void {
        orders.insertOne(_bestellung);
    }

    async function getreservedProducts(_response: Http.ServerResponse, _url: URL): Promise<void> {
        let ids: string = _url.searchParams.get("ids");
        let idArray: string[] = ids.split("$$");
        idArray.forEach(e => {
            

        });
        let productArray: Product[];
        productArray = await products.find().toArray();
        console.log(JSON.stringify(productArray));
        _response.write(JSON.stringify(productArray));
        _response.end();
    }

    async function getProductinfo(_response: Http.ServerResponse): Promise<void> {
        let productArray: Product[];
        productArray = await products.find().toArray();
        console.log(JSON.stringify(productArray));
        _response.write(JSON.stringify(productArray));
        _response.end();
    }

    async function addToReserved(_url: URL): Promise<void> {
        let id: string = _url.searchParams.get("id");
        let objectId: Mongo.ObjectId = new Mongo.ObjectId(id);
        console.log(objectId);
        await products.updateOne(
            { _id: objectId },
            {
                $set:
                {
                    _status: "reserviert"
                }
            }
        );
    }

    async function connectToDatabase(): Promise<void> {
        let url: string = "mongodb+srv://User:az17DLf9OfFRCOjw@gis-wise-2021-jakovgude.v5hg5.mongodb.net/AStA-Ausleihshop?retryWrites=true&w=majority";
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(url, options);
        await mongoClient.connect();
        products = mongoClient.db("AStA-Ausleihshop").collection("Products");
        console.log("Database connection", products != undefined);
    }

}