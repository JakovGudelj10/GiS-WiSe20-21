import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Endabgabe {
    interface Bestellung {
        [type: string]: string | string[] | number;
    }
    let orders: Mongo.Collection;
    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    connectToDatabase();

    function handleListen(): void {
        console.log("Listening");
    }
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("DAS ALLER BESTE EIS NUR HIER!");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {

            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let url2: URL = new URL(_request.url, `http://${_request.headers.host}`);

            let pfad: string = url2.pathname;
            switch (pfad) {
                case "/senden":
                    send(<Bestellung>url.query);
                    break;
                default:
                    break;
            }
        }

    }
    function send(_bestellung: Bestellung): void {
        orders.insert(_bestellung);
    }

    async function connectToDatabase(): Promise<void> {
        let url: string = "mongodb+srv://User:12345@jaki-gis-sose-2020.v5hg5.mongodb.net/Endabgabe?retryWrites=true&w=majority";

        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Endabgabe").collection("Bestellungen");
        console.log("Database connection", orders != undefined);
    }


}