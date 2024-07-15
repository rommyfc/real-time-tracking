const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const userLocations = new Map();

io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    socket.on("send-location", (data) => {
        console.log("Received location from", socket.id, ":", data);
        userLocations.set(socket.id, data);
        io.emit("receive-location", {id: socket.id, ...data});
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        userLocations.delete(socket.id);
        io.emit("user-disconnected", {id: socket.id});
    });

    // Send existing user locations to the new user
    userLocations.forEach((location, id) => {
        socket.emit("receive-location", {id, ...location});
    });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000);
