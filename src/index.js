const { WebSocketServer } = require("ws");
const { createServer } = require("http")

// creating a http server
const server = createServer()

// creating a new instance of websocketServer with the http server
const socket = new WebSocketServer({
    server
});

// an array of messages
const messages = []

// adding a connection listener
socket.on("connection", (sock) => {
    console.log("connected");

    // sending the array of messages on connection
    sock.send(JSON.stringify(messages));

    // listening to a message froma particular client
    sock.onmessage = function(message){
        console.log("message recieved");
        
        // adding the message to messages
        messages.push(message.data)

        // notifying all the users of the new message
        socket.clients.forEach(f => {
            f.send(JSON.stringify(messages))
        })
    }

})

// listen to port 4000
server.listen(4000,() => {
    console.log("Server Started");
})

