//web api for publish mqtt broker

const express = require("express");
const app = express();

//MQTT client library
const mqtt = require('mqtt')

//Set MQTT Broker connection parameters !!!
const host = '127.0.0.1' //if use docker-compose.yml use name of services //else use localhost or 127.0.0.1 or server ip broker
const port = '1883' // see in docker-compose.yml

//MQTT connect function
const url = `mqtt://${host}:${port}`

//handle connection
const client = mqtt.connect(url)
client.on('connect', function () {
    // Subscribe any topic
    console.log("MQTT Connect");
    client.subscribe('test', (response) => {
        console.log(response)
    });
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
});


//handle errors
client.on("error",function(error){
    console.log("Can't connect" + error);
    process.exit(1)
});

// Listen Post
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`proxy server listen ${PORT}`));
