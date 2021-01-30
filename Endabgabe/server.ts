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

    let server: Http.Server = Http.createServer();
    main();

    async function main(): Promise<void> {
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(port);
        await connectToDatabase();
    }
    function handleListen(): void {
        console.log("Listening");
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
    function send(_bestellung: Bestellung): void {
        orders.insertOne(_bestellung);
    }
    async function getProductinfo(_response: Http.ServerResponse): Promise<void> {

        let ordersArray: Product[] = await products.find().toArray();
        _response.write(JSON.stringify(ordersArray));
        console.log(ordersArray);

        _response.end();
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