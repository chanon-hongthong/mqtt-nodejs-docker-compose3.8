//web api for publish mqtt broker

const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MQTT client library
const mqtt = require('mqtt');
const { json, response } = require("express");

//Set MQTT Broker connection parameters !!!
const host = 'mqtt-broker' //name of services in docker-compose.yml //not use localhost or 127.0.0.1
const port = '1883' // see in docker-compose.yml

//MQTT connect function
const url = `mqtt://${host}:${port}`
const options={
    username:"charot",
    password:"Bls[b]1zddB!d",
};
//set topic name
const topic = 'test';

//handle connection
const client = mqtt.connect(url,options)
client.on('connect', function () {
    console.log("MQTT Connect");
    client.subscribe(topic, function (err) {
        if (err) {
            console.log(err);
        }
    });
});

// Receive Message and print on terminal
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
});

//handle errors
client.on("error",function(error){
    console.log("Can't connect" + error);
    process.exit(1)
});

app.get("/test", (req, res) => {
    let payload = {
        amount: 100,
        lastUpdated: Date.now()
    }
    const data = JSON.stringify(payload);
    test_publish(data);
    res.json(JSON.stringify(payload));
});

//function for test publish
function test_publish(data){
    client.publish(topic, data);
}

// Listen Post
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`proxy server listen ${PORT}`));
