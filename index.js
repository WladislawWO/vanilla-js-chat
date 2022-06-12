const express = require("express");
const portfinder = require("portfinder");

portfinder.basePort = 3000;
portfinder.highestPort = 4000;

const app = express();
app.use(express.static(__dirname));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/frontend/index.html");
});

class Server {
  constructor(app) {
    this.app = app;
  }

  listen() {
    portfinder.getPort((err, port) => {
      if (err) throw err;
      this.app.listen(port, () =>
        console.log(`app listening on port: ${port}`)
      );
    });
  }
}

const server = new Server(app);
server.listen();