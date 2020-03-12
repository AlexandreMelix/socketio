const app = require('express')()
var http = require("http").createServer(app)
var io = require("socket.io")(http)


// On déclare les variables de votes
var antoineVote = 0;
var leonieVote = 0;
var sorayaVote = 0;
var maximeVote = 0;
// Variable qui compte le nombre de personnes connectés sur le site
var nombreDeConnexion = 0;


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
io.sockets.on("connection", function (socket) {
    nombreDeConnexion++;
    socket.emit('jeSuisConnecte', nombreDeConnexion)
    socket.on("vote", function () {

        if (socket == "Antoine") {
            antoineVote++; // On augmente de +1 la variable Antoine
            socket.broadcast.emit('oui', antoineVote);
            socket.emit('oui', antoineVote); // On la retrourne sur index.html pour l'affichage 
        } else if (socket == "Leonie") {
            leonieVote++; // On incrémente de +1 la variable Leonie
            socket.broadcast.emit('oui1', leonieVote);
            socket.emit('oui1', leonieVote); // On la retrourne sur index.html pour l'affichage 
        } else if (socket == "Soraya") {
            sorayaVote++; // On incrémente de +1 la variable Soraya
            socket.broadcast.emit('oui2', sorayaVote);
            socket.emit('oui2', sorayaVote); // On la retrourne sur index.html pour l'affichage 
        } else if (socket == "Maxime") {
            maximeVote++; // On incrémente de +1 la variable maxime
            socket.broadcast.emit('oui3', maximeVote);
            socket.emit('oui3', maximeVote); // On la retrourne sur index.html pour l'affichage 
        }
    })
})

io.sockets.on("Unconnection", function (socket) {
    nombreDeConnexion--;
    socket.emit('jeSuisDeconnecte', nombreDeConnexion)
})
//Port pour la connexion
http.listen(3000, function () {
    //console.log("connect")
})