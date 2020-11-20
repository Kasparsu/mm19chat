const WebSocket = require('ws');
const wss = new WebSocket.Server({port:8080});
wss.on('connection', function connection(ws){
    ws.on('message', function incoming(message){
        console.log('recieved: ' + message);
        wss.clients.forEach(function (client){
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(message);
            }
        });
    });

});