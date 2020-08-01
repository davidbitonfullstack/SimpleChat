# A Simple Chat App With NodeJS, React, WebSockets and MySQL

Check out the repo:

https://github.com/davidbitonfullstack/SimpleChat

Run locally:
cd into server folder -> npm install && npm start.
cd into client folder -> npm install && npm run start.

Server api url: http://localhost:8095/api/messages
Client api url: http://localhost:3000
Websocket can be tested on: ws://localhost:8095/api/websocket

The chat server is hosted on:

https://my-simple-chat-david.herokuapp.com/api/messages

The chat client is hosted on: (currently there's an issue. It doesn't support websocket. Must change the server to support https and wss)

https://5f249f822fd97d019dcc7aec--my-simple-chat.netlify.app/

Simple Database script:

CREATE TABLE `simple_chat`.`messages` (
id int NOT NULL AUTO_INCREMENT,
user varchar(255),
message varchar(255),
PRIMARY KEY (id)
);
