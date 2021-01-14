import * as Http from "http";
import * as Url from "url";

export namespace A09Server {
  console.log("Starting server");
  let port: number = Number(process.env.PORT);
  if (!port)
    port = 8100;

  let server: Http.Server = Http.createServer();
  server.addListener("request", handleRequest);
  server.addListener("listening", handleListen);
  server.listen(port);

  function handleListen(): void {
    console.log("Listening");
  }

  function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    console.log("Hello World!");

    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");

    if (_request.url) {
      let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
      let link: URL = new URL(_request.url, `http://${_request.headers.host}`);
      let pfad: string = link.pathname;
      switch (pfad) {
          case "/html":
              _response.setHeader("pathname", pfad);
              for (let key in url.query) {
                  _response.write("<li>" + key + ": " + url.query[key]);  
              }
              _response.end();
              break;
          case "/json":
              let urlJson: string = JSON.stringify(url.query);
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
}